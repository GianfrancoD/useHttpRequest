import { useState, useEffect } from "react";
import useRequest from "./components/useRequest";

function App() {
  const { apiCall, apiResponse, userFound } = useRequest();
  const [target, setTarget] = useState({ nombre: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    apiCall("create", undefined, target, "post", "application/json");
  };

  const handleChange = (e) => {
    setTarget({ ...target, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      await apiCall(
        "registrados",
        undefined,
        undefined,
        "get",
        "application/json"
      );
    };
    fetchData();
  }, [apiCall]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label></label>
        <input
          type="text"
          value={target.nombre}
          pattern="[a-zA-Z]+"
          placeholder="nombre"
          onChange={handleChange}
          name="nombre"
          required
        />
        <button type="submit">Enviar</button>
      </form>
      {apiResponse ? (
        <p style={{ color: "green" }}>{apiResponse}</p>
      ) : userFound ? (
        <p style={{ color: "red" }}>{userFound}</p>
      ) : (
        <p></p>
      )}
    </>
  );
}

export default App;
