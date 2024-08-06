## Versión 1.0.4: Soporte para Parámetros de Consulta y Manejo Mejorado de Errores

La versión 1.0.4 de `useHttpRequest` introduce dos mejoras significativas:

1. **Soporte para Parámetros de Consulta**: 🔍
   - Ahora puedes pasar parámetros de consulta al realizar llamadas a la API utilizando el hook `useHttpRequest`.
   - Simplemente agrega un objeto `params` como el último argumento de `apiCall`.
   - Los parámetros de consulta se agregarán automáticamente a la URL de la API.

2. **Manejo Mejorado de Errores**: 🚨
   - El hook ahora proporciona un manejo de errores más robusto y detallado.
   - Si ocurre un error durante una llamada a la API, se almacenará un mensaje de error descriptivo en el estado `error`.
   - Puedes acceder al mensaje de error a través de `error` en el objeto devuelto por `useHttpRequest`.

### Ejemplo de Uso con Parámetros de Consulta

Aquí tienes un ejemplo de cómo utilizar el hook `useHttpRequest` con parámetros de consulta en un componente de React:

```javascript
import React, { useEffect } from "react";
import useHttpRequest from "./path/to/useHttpRequest";

const UserList = () => {
  const { apiCall, apiResponse, userFound, error } = useHttpRequest();

  const fetchUsers = async () => {
    try {
      await apiCall('/users', undefined, undefined, 'get', 'application/json', { page: 1, limit: 10 });
      if (userFound) {
        console.log('Usuarios encontrados:', apiResponse);
      } else {
        console.error('Error al obtener usuarios:', error);
      }
    } catch (err) {
      console.error('Error al hacer la llamada a la API:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      {userFound && apiResponse && Array.isArray(apiResponse) ? (
        <ul>
          {apiResponse.map(user => (
            <li key={user.id}>{user.nombre} {user.apellido}</li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron usuarios.</p>
      )}
    </div>
  );
};

export default UserList;
```

En este ejemplo, se pasan los parámetros de consulta `{ page: 1, limit: 10 }` al llamar a `apiCall`. Estos parámetros se agregarán automáticamente a la URL de la API.

### Manejo de Errores

Si ocurre un error durante la llamada a la API, puedes acceder al mensaje de error a través de la variable `error`:

```javascript
if (userFound) {
  console.log('Usuarios encontrados:', apiResponse);
} else {
  console.error('Error al obtener usuarios:', error);
}
```

En caso de que se produzca un error, el mensaje de error se almacenará en `error` y podrás mostrarlo o manejarlo según tus necesidades.

### Resumen de Características

- **Soporte para Parámetros de Consulta**: Agrega parámetros de consulta al llamar a `apiCall` para filtrar, paginar o modificar los datos devueltos por la API.
- **Manejo Mejorado de Errores**: Accede al mensaje de error a través de `error` en caso de que ocurra un error durante una llamada a la API.
- **Compatibilidad con Versiones Anteriores**: La versión 1.0.4 mantiene la compatibilidad con versiones anteriores, lo que significa que puedes actualizar fácilmente sin tener que reescribir todo tu código.

¡Descarga la versión 1.0.4 de `useHttpRequest` y disfruta de estas nuevas funcionalidades en tus proyectos de React!



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
