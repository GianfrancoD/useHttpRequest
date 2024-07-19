![hooks-images](https://github.com/user-attachments/assets/39266a60-7e6d-4d10-a46b-3d1dc6d3a3e5)
![licence](https://img.shields.io/github/license/GianfrancoD/useRequest)
![Badge en Desarollo](https://img.shields.io/badge/Status-En%20Desarrollo-green)
![commit](https://img.shields.io/github/commits-since/GianfrancoD/useRequest/v1.0.0-beta.1)

# Hook useRequest ✍🏻

Procedimientos del Hook useRequest:

`const { apiCall, apiResponse, userFound } = useRequest();`

tiene 3 parametros que puedes llamar que son por defecto:
- apiCall:
  - Endpoint:
    - Es para usar los Endpoint de la base de datos y se usa `"crear"` en ves de `"/crear"`
  - Id:
    - en este caso el Id es para el uso de parametros y es para detectar el id del array o mas bien de indice de la base de datos `v1/api/${id}`
  - Data:
    - fue creado especialmente para usar lo datos que tenga los valores del formulario o algun otro que se le sea necesario, por ejemplo:
      - `const [user, setUsers] = useState({nombre: "", apellido: ""})` y se reemplaza `data` por `user`
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
  - `apiCall("create", undefined, target, "post", "application/json");` 👇🏻
    - `apiCall(endpoint, id, data, method, http);` de esta manera seria el resultado
    
### Destacado:
- `apiCall` = es la funcion para llamar el Hook,
-  `apiResponse` = Se encarga de Enviar y Recibir solicitudes de la Base de Dato `message`,
-  `userFount` = Se encarga de verificar si existe o no `Bool`
-  `VITE_API_URL` = Si va a crear Variable de Entorno es el nombre por defecto, solo crear `.env` y poner el nombre adecuado
-  `useRequest` se puede utilizar para `React` como para `Vite`

## Codigo de Ejemplo:

`POST`
```
const Formulario = () => {
  const [target, setTarget] = useState({
    nombre: "",
    apellido: "",
  });
  const { apiCall, apiResponse, userFound } = useRequest();

  const handleSubmit = (target) => {
    apiCall("create", undefined, target, "post", "application/json");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label></label>
        <input
          type="text"
          value={target.nombre}
          pattern="[a-zA-Z]+"
          placeholder="nombre"
          onChange={setTarget}
          name="nombre"
          required
        />
        <label></label>
        <input
          type="text"
          value={target.apellido}
          pattern="[a-zA-Z]+"
          placeholder="apellido"
          onChange={setTarget}
          name="apellido"
          required
        />
        <button>Enviar</button>
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
};

```

`GET`
```
const Peticiones = () => {
  const { apiCall, apiResponse, userFound } = useRequest({});

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

```
const MyComponent = () => {
  const { apiCall, apiResponse, userFound } = useRequest();

  const handleSubmit = async () => {
    await apiCall('users', 1, { name: 'John Doe', email: 'johndoe@example.com' }, 'post', 'application/json');
    if (userFound) {
      console.log('Usuario creado con éxito:', apiResponse);
    } else {
      console.error('Error al crear el usuario:', apiResponse);
    }
  };

  return (
    <div>
      <button onClick={handleSubmit}>Crear usuario</button>
    </div>
  );
};
```
