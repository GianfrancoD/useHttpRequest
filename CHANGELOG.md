# 📝 Changelog

Todas las novedades de este proyecto se documentan en este archivo.

## [Unreleased]

---

## [1.0.3] - 2024-07-01
### ✨ Mejorado
- **Validación de Parámetros**: Se implementó una función de validación en el hook `useHttpRequest` para asegurar que los parámetros de entrada sean correctos antes de realizar la solicitud.
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
