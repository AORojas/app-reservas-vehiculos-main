## Readme

En primer instancia es necesario tener instalado NVM (Node Versión Manager), el cual gestiona las diferentes versiones de Node. La versión que necesitamos para correr el proyecto será la última LTS.

Aclarado esto, debemos clonar el repositorio de github para tenerlo de forma local. Luego, abrir la carpeta del mismo y posicionarnos, ya sea en la parte de backend o frontend y ejecutar en consola `npm install`, para instalar todos los paquetes necesarios para que la aplicación funcione.

Para iniciar el servidor del proyecto y realizar modificaciones ejecutar `npm run dev`, tanto en el backend, como en el frontend. Esto abrirá un servidor local para ver en tiempo real los cambios realizados.

### Frontend

Para el frontend vamos a utilizar React con TypeScript, acompañando los estilos con Tailwindcss, y una librería de componentes para no tener que hacer todo desde cero.

La librería que vamos a utilizar es shadcdn (https://ui.shadcn.com/).

Cómo la aplicación va a tener diferentes links, vamos a necesitar utilizar react-router para gestionar las diferentes url's.

### Backend

En el lado del backend utilizaremos Node junto con TypeScript. Para el desarrollo de la API utilizaremos Express y Mongoose, que es el ODM para realizar la gestión de la base de datos MongoDB.

## Clonar el repositorio

Clonar el repositorio:

- Descargarlo presionando en la parte superior donde dice `< > Code` y `Download ZIP`.
- Si ya han configurado el SSH de de GitHub, simplemente posicionarse en una carpeta de su equipo, abrir la terminal en esa misma carpeta, y copiar y pegar el comando de SSH que aparece en `< > Code`. Eso clona el repositorio directamente.

**Aclaración**: Si o si, para poder trabajar en el repositorio, GitHub les va a pedir que configuren el SSH. En YouTube hay un montón de tutoriales, o pueden buscarlo en la misma documentación de GitHub.

### Tecnologías, extensiones, librerías

Extensiones útiles de VS-Code:

- **Thunder Client**: Esta extensión te permite hacer consultas básicas a una API. Obviamente pueden utilizar Postman o cualquier otra herramienta que sirva para esa finalidad, pero si no quieren hacerse tanto lio instalando un programa a parte, Thunder Client es básica y fácil de usar.
- **Tailwind CSS IntelliSense**: Esta extensión agrega un autocompletado a las clases de tailwind para programar más rápido y comodo. Para aquellos que vayan a utilizar tailwind, pueden consultar en la página ([link](https://tailwindcss.com/)) las diferentes clases que sustituyen las de CSS tradicional.
- **Prettier**: Este plugin te ayuda a formatear el código para que quede bien identado, con los espacios correctos, incluso acomodar las clases de tailwind para que sea más fácil su lectura.

Tecnologías utilizadas en el proyecto:

- Frontend: React, TypeScript, Tailwind, librería de componentes shadcdn.
- Backend: Node (v22.18.0), TypeScript, MongoDB (pueden instalar MongoDBCompass para tener una interfaz con la cual interactuar sobre la base de datos de MongoDB).
