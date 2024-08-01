import axios from "axios";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";

const VITE_API_URL =
  import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL;

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

const useHttpRequest = () => {
  const [apiResponse, setApiResponse] = useState([]);
  const [userFound, setUserFound] = useState(false);

  const apiCall = useCallback(async (endpoint, id, data, method, http) => {
    validate(endpoint, method, http);
    console.log("Llamando a la API:", endpoint, id, data, method, http);
    let url = `${VITE_API_URL}/${endpoint}${id ? `/${id}` : ""}`;
    try {
      const response = await axios[method](url, data, {
        headers: {
          "content-type": http,
          mode: "no-cache",
          Accept: "application/json",
        },
      });
      console.log("Respuesta de la API:", response.data);
      setApiResponse(response.data);
      setUserFound(true);
    } catch (error) {
      console.error(error);
      setUserFound(true);
      setApiResponse(
        error.response?.data?.message || "Error al crear el usuario ⚠️"
      );
    }
  }, []);

  return { apiCall, apiResponse, userFound };
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
};
export default useHttpRequest;
