import axios from "axios";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";

/**
 * Hook personalizado para realizar llamadas HTTP a una API utilizando Axios en aplicaciones React.
 *
 * Este hook proporciona una interfaz sencilla para hacer solicitudes HTTP a una API, manejando
 * automáticamente la configuración de Axios y proporcionando un estado para controlar el resultado
 * de las llamadas.
 *
 * Este hook también permite la inclusión de parámetros de consulta en las solicitudes.
 *
 * @param {string} endpoint - Ruta del endpoint al que se realizará la llamada (por ejemplo, '/users').
 * @param {number|string|null} id - ID opcional del recurso (por ejemplo, '/users/123'). Si no se proporciona, se ignora.
 * @param {Object|null} data - Datos opcionales a enviar en el cuerpo de la solicitud (para POST, PUT, etc.).
 * Si no se proporciona, se envía `null`.
 * @param {string} method - Método HTTP a utilizar ('get', 'post', 'put', 'delete').
 * @param {string} http - Tipo de contenido HTTP ('application/json', 'application/x-www-form-urlencoded', etc.).
 * @param {Object|null} params - Parámetros de consulta opcionales que se agregarán a la URL.
 *
 * @returns {Object} - Un objeto que contiene:
 *   - `apiCall`: Función que se utiliza para hacer llamadas a la API.
 *   - `apiResponse`: Objeto que contiene la respuesta de la última llamada a la API.
 *   - `userFound`: Booleano que indica si se encontró un usuario en la última llamada a la API.
 *   - `error`: Mensaje de error de la última llamada a la API, si hubo algún error.
 *
 * Ejemplo de uso:
 * const { apiCall, apiResponse, userFound, error } = useHttpRequest(true);
 *
 * const fetchUsers = async () => {
 *   try {
 *     await apiCall('/users', undefined, undefined, 'get', 'application/json', { page: 1, limit: 10 });
 *     if (userFound) {
 *       console.log('Usuarios encontrados:', apiResponse);
 *     } else {
 *       console.error('Error al obtener usuarios:', error);
 *     }
 *   } catch (err) {
 *     console.error('Error al hacer la llamada a la API:', err);
 *   }
 * };
 */

const getEnvVar = (varName) =>
  typeof window !== "undefined"
    ? import.meta.env[varName]
    : process.env[varName];

const apiUrl =
  getEnvVar("VITE_API_URL") ||
  getEnvVar("REACT_APP_API_URL") ||
  getEnvVar("NEXT_PUBLIC_API_URL");

const validate = (endpoint, method, http) => {
  if (!endpoint)
    throw new Error(
      "El endpoint es Requerido o no esta creado en useHttpRequest"
    );
  if (!["get", "post", "put", "delete"].includes(method))
    throw new Error(
      "Método no válido o no esta creado en useHttpRequest, debe ser 'get', 'post', 'put' o 'delete'"
    );
  if (
    ![
      "application/json",
      "application/x-www-form-urlencoded",
      "multipart/form-data",
      "text/plain",
      "application/xml",
    ].includes(http)
  )
    throw new Error("El tipo de contenido en useHttpRequest es Requerido");
};

const useHttpRequest = (enableCSRF = false) => {
  const [apiResponse, setApiResponse] = useState(null);
  const [userFound, setUserFound] = useState(false);
  const [error, setError] = useState(null);

  const getCsrfToken = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrfToken="))
      ?.split("=")[1];
  };

  const apiCall = useCallback(
    async (endpoint, id, data, method, http, params) => {
      validate(endpoint, method, http);
      console.log("Llamando a la API:", endpoint, id, data, method, http);
      let url = `${apiUrl}/${endpoint}${id ? `/${id}` : ""}`;
      if (params) {
        const queryParams = new URLSearchParams(params).toString();
        url += `?${queryParams}`;
      }

      try {
        const csrfToken = enableCSRF ? getCsrfToken() : null;
        const response = await axios[method](url, data, {
          headers: {
            "X-CSRF-Token": csrfToken,
            "content-type": http,
            mode: "no-cache",
            Accept: "application/json",
          },
        });
        console.log("Respuesta de la API:", response.data);
        setApiResponse(response.data.message || response.data);
        setUserFound(true);
      } catch (error) {
        console.error(error);
        setUserFound(true);
        setApiResponse(
          error.response?.data?.message || "Error al crear el usuario ⚠️"
        );
        setError(error.response?.data?.message);
      }
    },
    [enableCSRF]
  );

  return { apiCall, apiResponse, userFound, error };
};

useHttpRequest.propTypes = {
  method: PropTypes.oneOf(["get", "post", "put", "delete"]).isRequired,
  http: PropTypes.oneOf([
    "application/json",
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain",
    "application/xml",
  ]).isRequired,
};

useHttpRequest.propTypes = {
  apiCall: PropTypes.func.isRequired,
  userFound: PropTypes.bool,
  apiResponse: PropTypes.array,
  id: PropTypes.number,
  data: PropTypes.string,
  endpoint: PropTypes.string.isRequired,
  enableCSRF: PropTypes.bool,
};
export default useHttpRequest;
