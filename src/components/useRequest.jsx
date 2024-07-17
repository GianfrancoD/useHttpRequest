import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const useRequest = () => {
  const [apiResponse, setApiResponse] = useState([]);
  const [userFound, setUserFound] = useState(false);

  const apiCall = async (endpoint, id, data, method, http) => {
    console.log("Llamando a la API:", endpoint, id, data, method, http);
    let url = `${VITE_API_URL}/${endpoint}`;
    if (id) {
      url += `/${id}`;
    }
    try {
      const response = await axios[method](url, data, {
        headers: {
          "content-type": http,
          mode: "no-cache",
          Accept: "application/json",
        },
      });
      console.log("Respuesta de la API:", response.data);
      setApiResponse(response.data.message);
      setApiResponse(response.data);
      setUserFound(true);
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message) {
        setUserFound(true);
        setApiResponse(error.response.data.message);
      } else {
        setUserFound(false);
        setApiResponse("Error al crear el usuario ⚠️");
      }
    }
  };

  return { apiCall, apiResponse, userFound };
};

export default useRequest;

useRequest.propTypes = {
  method: PropTypes.oneOf(["get", "post", "put", "delete"]).isRequired,
  http: PropTypes.oneOf([
    "application/json",
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain",
    "application/xml",
  ]).isRequired,
};

useRequest.propTypes = {
  apiCall: PropTypes.func.isRequired,
  userFound: PropTypes.bool,
  apiResponse: PropTypes.array,
  id: PropTypes.number,
  data: PropTypes.string,
  endpoint: PropTypes.string.isRequired,
};
