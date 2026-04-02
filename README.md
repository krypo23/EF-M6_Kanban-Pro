# KanbanPro - Gestor de Proyectos (MVP)

KanbanPro es una aplicación web Fullstack construida con Node.js, Express, Sequelize y PostgreSQL. Permite a los usuarios registrarse, iniciar sesión de forma segura usando JWT, y gestionar tableros, listas y tareas.

## 🚀 Tecnologías Utilizadas
* **Backend:** Node.js, Express
* **Base de Datos:** PostgreSQL, Sequelize ORM
* **Seguridad:** Bcryptjs (hasheo), JSON Web Tokens (JWT), Cookie-Parser
* **Frontend:** Handlebars (HBS), Bootstrap 5

## ⚙️ Instalación y Configuración

1. Clonar el repositorio.
2. Ejecutar `npm install` para instalar las dependencias.
3. Crear un archivo `.env` en la raíz con las siguientes variables:

DB_EFM7=tu_url_de_postgress
JWT_SECRETO =tu_secreto

4. Ejecutar `node seed.js` para sincronizar y poblar la base de datos de prueba.
5. Ejecutar `npm run dev` (o `node app.js`) para levantar el servidor en `http://localhost:3000`.

## 📡 Documentación de la API RESTful

La aplicación cuenta con una API protegida. Para las rutas privadas, se requiere enviar el token JWT en el header `Authorization: Bearer <token>` o a través de cookies.

### Autenticación
* **POST /api/auth/register** - Registra un nuevo usuario. (Requiere: nombre, email, password)
* **POST /api/auth/login** - Autentica al usuario y devuelve un token JWT. (Requiere: email, password)

### Tableros
* **GET /api/tableros** - Obtiene todos los tableros del usuario autenticado.
* **POST /api/tableros** - Crea un nuevo tablero.
* **PUT /api/tableros/:id** - Actualiza un tablero existente.
* **DELETE /api/tableros/:id** - Elimina un tablero.

### Listas
* **POST /api/tableros/:tableroId/listas** - Crea una nueva lista dentro de un tablero.
* **PUT /api/listas/:id** - Actualiza una lista.
* **DELETE /api/listas/:id** - Elimina una lista.

### Tarjetas
* **POST /api/listas/:listaId/tarjetas** - Crea una nueva tarjeta en una lista.
* **PUT /api/tarjetas/:id** - Actualiza una tarjeta.
* **DELETE /api/tarjetas/:id** - Elimina una tarjeta.