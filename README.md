![hooks-images](https://github.com/user-attachments/assets/39266a60-7e6d-4d10-a46b-3d1dc6d3a3e5)
![licence](https://img.shields.io/github/license/GianfrancoD/useRequest)
![Badge en Desarollo](https://img.shields.io/badge/Status-En%20Desarrollo-green)
[![npm downloads](https://img.shields.io/npm/dt/usehttprequest.svg)](https://www.npmjs.com/package/usehttprequest)
![commit](https://img.shields.io/github/commits-since/GianfrancoD/useRequest/1.0.3)
![npm](https://img.shields.io/npm/v/usehttprequest)
![GitHub release](https://img.shields.io/github/release/GianfrancoD/usehttprequest)

## Actualizaciones & Funcionalidades

Ver los cambios realizados en el Hook [CHANGELOG](./CHANGELOG.md)

- Conoce las mejoras y cambios en la funcionalidad del Hook [FUNCTIONALITY](FUNCTIONALITY.md)

# Hook useHttpRequest ✍🏻

### Instalacion

```
npm i usehttprequest
```

### Importacion

```
  import { useHttpRequest } from "usehttprequest";
```

### Actualización

```
npm update usehttprequest
```

### Caracteristicas

- `Sencillo y fácil de usar`: useHttpRequest es increíblemente fácil de integrar en tus proyectos de React. Simplemente importa el hook y comienza a utilizarlo en tus componentes.
- `Soporte para múltiples métodos HTTP`: useHttpRequest admite los métodos HTTP más comunes, como GET, POST, PUT y DELETE, para que puedas realizar solicitudes HTTP de manera sencilla y segura.
- `Personalizable`: useHttpRequest te permite personalizar la solicitud HTTP según tus necesidades específicas, incluyendo la configuración de headers y el tipo de contenido.
- `Gestión de errores`: useHttpRequest maneja automáticamente los errores de solicitud HTTP, lo que te permite mostrar mensajes de error personalizados al usuario.
- `Compatible con React`: useHttpRequest es compatible con todas las versiones de React, desde la 16.8 en adelante.
- `Compatibilidad con Variables de Entorno`: Obtén automáticamente la URL de la API desde variables de entorno, simplificando la configuración en diferentes entornos.
- `Parámetros de Consulta`: Ahora puedes enviar parámetros de consulta en tus llamadas a la API, facilitando la filtración y paginación de datos.
- `Implementación de Protección CSRF`: Hemos agregado soporte para la protección contra CSRF (Cross-Site Request Forgery). Ahora puedes activar la protección CSRF al utilizar el hook, asegurando que tus solicitudes HTTP sean más seguras. Simplemente pasa enableCSRF=true al usar el hook para habilitar esta funcionalidad. El hook ahora incluye automáticamente el token CSRF en las solicitudes que modifican datos (POST, PUT, DELETE), lo que ayuda a prevenir ataques maliciosos.
- `Monitoreo con Sentry`: Hemos integrado Sentry para capturar excepciones y eventos en nuestra aplicación. Esto permite monitorear errores en tiempo real y facilita la identificación y resolución de problemas en producción. Cualquier error no manejado se enviará automáticamente a Sentry, proporcionando contexto detallado para mejorar la estabilidad de la aplicación.
- `Registro con loglevel`: Hemos añadido loglevel para registrar mensajes en niveles de severidad como info, warn y error. Esta herramienta ligera mejora la depuración al permitir rastrear advertencias y errores durante la ejecución. Su configuración flexible permite filtrar mensajes según el entorno, optimizando la salida de la consola.
- `Experiencia de Usuario Optimizada`: Hemos implementado un ajuste dinámico del retraso del estado de carga (isLoading) en función de la calidad de la conexión del usuario. Esto adapta el tiempo de espera a diferentes tipos de conexión, como slow-2g, 2g, 3g y 4g, evitando cambios de estado confusos. Si no se puede determinar la conexión, se utiliza un valor predeterminado, asegurando una experiencia de usuario fluida.

Procedimientos del Hook useRequest:

`const { apiCall, apiResponse, userFound } = useHttpRequest();`

tiene 3 parametros que puedes llamar que son por defecto:

- apiCall:
  - Endpoint:
    - Es para usar los Endpoint de la base de datos y se usa `"crear"` en ves de `"/crear"`
  - Id:
    - en este caso el Id es para el uso de parametros y es para detectar el id del array o mas bien de indice de la base de datos `v1/api/${id}`
  - Data:
    - fue creado especialmente para usar lo datos que tenga los valores del formulario o algun otro que se le sea necesario, por ejemplo:
      - `const [user, setUsers] = useHttpRequest({nombre: "", apellido: ""})` y se reemplaza `data` por `user`
  - Method:
    - es especialmente para asignar metodos HTTP como:
      - `GET`,
      - `POST`,
      - `PUT`,
      - `DELETE`,
  - Http:
    - Fue creado especialmente para reducir codigo y es para usar
      - `application/json`,
      - `application/x-www-form-urlencoded`,
      - `multipart/form-data`,
      - `text/plain`,
      - `application/xml`,
- Resultado:
  - `apiCall('users', 1, target", 'post', 'application/json', { page: 1, limit: 10 });` 👇🏻
    - `apiCall(endpoint, id, data, method, http, params);` de esta manera seria el resultado

### Destacado:

- `apiCall`: Es la funcion para llamar el Hook.
- `apiResponse`: Se encarga de Enviar y Recibir solicitudes de la Base de Dato `message`.
- `userFount`: Se encarga de verificar si existe o no `Bool`.
- `useHttpRequest`: Se puede utilizar para `React` como para `Vite`.
- `useHttpRequest`: Ya tiene las dependencias `sentry/tracing`, `sentry/react`, `axios` instaladas.
- `Protección CSRF`: useHttpRequest(true) para activar las protecciones, `false` por defecto.
- `Nuevos parametros`: isLoading, SentryWarning, SentryError, SentryInfo, SentryEvent.

## Codigo de Ejemplo:

`POST` - Nuevo 🆕

```jsx
const UserList = () => {
  const { apiCall, apiResponse, userFound } = useHttpRequest(true); // al cambiarlo de false que es por defecto a true se activara automaticamente la proteccion CSRF

  const fetchUsers = async () => {
    try {
      await apiCall('/users', 1, target", 'post', 'application/json', { page: 1, limit: 10 });
      if (userFound) {
        console.log('Usuarios encontrados:', apiResponse);
      }
    } catch (error) {
      console.error('Error al hacer la llamada a la API:', error);
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

`GET`

```jsx
const Peticiones = () => {
  const { apiCall, apiResponse, userFound } = useHttpRequest({});

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
  });

  return (
    <>
      {userFound && Array.isArray(apiResponse) ? (
        apiResponse.map((user) => (
          <li key={user.id}>
            {user.nombre} {user.apellido}
          </li>
        ))
      ) : (
        <p>Loading or error...</p>
      )}
    </>
  );
};
```

### Otro ejemplo:

```jsx
const MyComponent = () => {
  const { apiCall, apiResponse, userFound } = useHttpRequest();

  const handleSubmit = async () => {
    await apiCall(
      "users",
      1,
      { name: "John Doe", email: "johndoe@example.com" },
      "post",
      "application/json"
    );
    if (userFound) {
      console.log("Usuario creado con éxito:", apiResponse);
    } else {
      console.error("Error al crear el usuario:", apiResponse);
    }
  };

  return (
    <div>
      <button onClick={handleSubmit}>Crear usuario</button>
    </div>
  );
};
```

🚨 `Nuevas versiones y Actualizaciones Proximamente` 🚨

Màs sobre la Funcionalidad del HOOK 👉🏻 [FUNCTIONALITY](FUNCTIONALITY.md) 👈🏻

No te pierdas las ultimas versiones 👉🏻 [CHANGELOG](./CHANGELOG.md) 👈🏻
