# Versión 1.0.3: Validación de Parámetros y Optimización del Rendimiento

Validación de Parámetros en el Hook useHttpRequest ✅ Se implementó una función de validación para asegurar que los parámetros de entrada sean correctos antes de realizar la solicitud, mejorando la robustez del hook.

🚨 Extra: Ahora puedes crear solo la variable de entorno (.env) ya que esta configurado para vite y react 🚨

#### Aconsejable usar
  - el uso de useHttpRequest es aconsejable usarlo con useTargetHandler 🔥

```jsx
const fetchData = useCallback(async () => { // uso del Callback
    await apiCall(
      "registrados",
      undefined,
      undefined,
      "get",
      "application/json"
    );
  }, [apiCall]);

  useEffect(() => {
    const intervalId = setInterval(() => { // y intervalos de tiempos estimados para controlar su salida
      fetchData();
    }, 10000); // 60,000 milisegundos son 1 min
    return () => clearInterval(intervalId);
  }, [fetchData]);

  return (
    <>
      {userFound && Array.isArray(apiResponse) && apiResponse.length > 0 ? (
        apiResponse.map((user) => (
          <li key={user.id}>
            {user.id} - {user.nombre} {user.apellido}
          </li>
        ))
      ) : (
        <span>Cargando...</span>
      )}
      {!userFound && <span>Error al cargar usuarios</span>}
```

`Muy pronto con mas versiones y nuevas funcionalidades 😎`
