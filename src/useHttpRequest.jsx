import axios from "axios";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import log from "loglevel";
import * as Sentry from "@sentry/react";

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
  const [isLoading, setIsLoading] = useState(false);

  const getCsrfToken = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrfToken="))
      ?.split("=")[1];
  };

  const apiCall = useCallback(
    async (endpoint, id, data, method, http, params) => {
      validate(endpoint, method, http);
      log.warn("Llamando a la API:", endpoint, id, data, method, http);
      let url = `${apiUrl}/${endpoint}${id ? `/${id}` : ""}`;
      if (params) {
        const queryParams = new URLSearchParams(params).toString();
        url += `?${queryParams}`;
      }

      let delay = 2000;
      try {
        setIsLoading(true);
        const csrfToken = enableCSRF ? getCsrfToken() : null;
        const response = await axios[method](url, data, {
          headers: {
            "X-CSRF-Token": csrfToken,
            "content-type": http,
            mode: "no-cache",
            Accept: "application/json",
          },
        });
        clearTimeout(delay);
        console.log("Respuesta de la API:", response.data);
        setApiResponse(response.data.message || response.data);
        setUserFound(true);
      } catch (error) {
        log.error(error);
        Sentry.captureException(error);
        setUserFound(true);
        setApiResponse(
          error.response?.data?.message || "Error al crear el usuario ⚠️"
        );
        setError(error.response?.data?.message);
      } finally {
        const connectionDelays = [
          { type: "slow-2g", delay: 4000 },
          { type: "2g", delay: 3000 },
          { type: "3g", delay: 2000 },
          { type: "4g", delay: 1000 },
          { type: "5g", delay: 500 },
        ];
        if (navigator.connection) {
          const connectionDelay = connectionDelays.find(
            (delay) => delay.type === navigator.connection.effectiveType
          );
          delay = connectionDelay ? connectionDelay.delay : 2000;
        }
        setTimeout(() => {
          setIsLoading(false);
        }, delay);
      }
    },
    [enableCSRF]
  );

  const SentryWarning = (message, context = {}) => {
    Sentry.captureMessage(message, "warning", {
      extra: context,
    });
  };

  const SentryError = (message, error, context = {}) => {
    Sentry.captureMessage(message, "error", {
      extra: {
        ...context,
        errorMessage: error?.message || "Error desconocido",
      },
    });
    Sentry.captureException(error);
  };

  const SentryInfo = (message, context = {}) => {
    Sentry.captureMessage(message, "info", {
      extra: context,
    });
  };

  const SentryEvent = (eventName, data, level = "info") => {
    Sentry.captureEvent({
      message: eventName,
      level: level,
      extra: data,
    });
    log.error("Sentry no está configurado. Mensaje de error:", eventName);
  };

  return {
    apiCall,
    apiResponse,
    userFound,
    error,
    isLoading,
    SentryWarning,
    SentryError,
    SentryInfo,
    SentryEvent,
  };
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
