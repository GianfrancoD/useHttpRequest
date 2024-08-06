# 📝 Changelog

Todas las novedades de este proyecto se documentan en este archivo.

## [Unreleased]

---

## [1.0.4] - 2024-08-06
### ✨ Mejorado
- **Soporte para Parámetros de Consulta**: Se añadió la capacidad de pasar parámetros de consulta al realizar llamadas a la API. Esto permite filtrar y paginar resultados de manera más efectiva.
  
- **Manejo Mejorado de Errores**: Se implementó un sistema de manejo de errores más robusto, proporcionando mensajes de error más claros y específicos al usuario.

- **Optimización de Lógica de Respuesta**: Se mejoró la lógica para manejar las respuestas de la API, asegurando que los datos se procesen de manera eficiente y se manejen adecuadamente los errores.

### 🚨 Extra
- **Configuración de Variables de Entorno**: Ahora puedes crear solo la variable de entorno `.env`, ya que el hook está configurado para funcionar con Vite y React sin necesidad de ajustes adicionales.

#### Aconsejable usar
- **Integración con `useTargetHandler`**: Se recomienda utilizar `useHttpRequest` junto con `useTargetHandler` para una gestión más efectiva del estado del formulario y las solicitudes a la API. Esto permite una experiencia de usuario más fluida y una mejor organización del código 🔥.

---

## [1.0.3] - 2024-07-01
### ✨ Mejorado
- **Validación de Parámetros**: Se implementó una función de validación en el hook `useHttpRequest` para asegurar que los parámetros de entrada sean correctos antes de realizar la solicitud, mejorando la robustez del hook.

- **Optimización de Rendimiento**: Se integró `useCallback` en el hook para evitar re-renderizados innecesarios, mejorando la eficiencia general.

- **Gestión de Estados**: Se mejoró la gestión de estados de carga y error, proporcionando un feedback más claro al usuario durante las solicitudes.

### 🐛 Corregido
- **Manejo de Respuestas**: Se ajustó la lógica de manejo de respuestas de la API para ofrecer mensajes de error más claros y específicos.

---

## [1.0.2] - 2024-06-20
### 🐛 Corregido
- **Configuración de Axios**: Se realizaron ajustes menores en la configuración de Axios dentro del hook `useHttpRequest` para optimizar el rendimiento.

- **Gestión de Tipos de Contenido**: Mejora en la gestión de tipos de contenido en las solicitudes, garantizando compatibilidad con diversas APIs.

---

## [1.0.1] - 2024-06-15
### ➕ Agregado
- **Lanzamiento Inicial**: Primera versión del hook `useHttpRequest`, permitiendo realizar llamadas a APIs utilizando Axios.

- **Configuración de Encabezados**: Implementación de encabezados HTTP para solicitudes, mejorando la flexibilidad del hook.

---

## [1.0.0] - 2024-06-10
### ➕ Agregado
- **Creación Inicial**: Establecimiento de la base del proyecto con la creación del hook `useHttpRequest`.

- **Configuración del Proyecto**: Configuración del `package.json` con información básica del proyecto.

- **Definición de Palabras Clave**: Inclusión de palabras clave relevantes para facilitar la búsqueda y categorización.

- **Configuración del Repositorio**: Establecimiento inicial del repositorio en GitHub, permitiendo la colaboración y el control de versiones.

---

Este changelog proporciona una visión clara de las mejoras y correcciones realizadas en cada versión del hook `useHttpRequest`, destacando especialmente las nuevas características introducidas en la versión 1.0.4. Si necesitas más información o ajustes, ¡no dudes en preguntar!

Citations:
[1] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/14178594/95f82c1f-c869-42e6-954a-f183fe5fc3dc/paste.txt
[2] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/14178594/a2171bbd-26c4-4d71-839e-a0af4b516357/paste-2.txt
[3] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/14178594/f8b3c542-a08b-4fa5-be17-3895a2e31440/paste-3.txt
