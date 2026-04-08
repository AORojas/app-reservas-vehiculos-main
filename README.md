# App Reservas Vehiculos

Aplicacion full stack orientada a la gestion de reservas de vehiculos. El proyecto integra una SPA desarrollada en React con una API REST en Express, autenticacion basada en JWT y persistencia de datos en MongoDB.

## Overview

La aplicacion permite explorar la flota disponible, consultar el detalle de cada vehiculo, registrarse, autenticarse y generar reservas. La solucion fue planteada con una separacion clara entre frontend y backend, consumo de API desacoplado y persistencia de estado del lado del cliente para mejorar la experiencia de uso durante el flujo de reserva.

## Stack Tecnologico

- Frontend: React 19, TypeScript, Vite, Tailwind CSS, React Router, Zustand, Radix UI
- Backend: Node.js, TypeScript, Express 5, Mongoose
- Base de datos: MongoDB
- Integraciones: JWT, cookies HTTP, Cloudinary para assets externos

## Funcionalidades Principales

- Visualizacion de flota con filtros por criterios de negocio
- Vista de detalle por vehiculo
- Registro e inicio de sesion de usuarios
- Validacion de sesion y rutas protegidas
- Edicion de perfil autenticado
- Generacion de reservas persistidas en base de datos
- Seed inicial de vehiculos para poblar el entorno de desarrollo

## Arquitectura

```text
.
|-- backend
`-- frontend
```

- `frontend`: SPA en React con enrutado del lado del cliente, manejo de estado y consumo de API
- `backend`: API REST con Express, middlewares de autenticacion, acceso a MongoDB mediante Mongoose y exposicion de assets estaticos

## Variables de Entorno

El backend utiliza la siguiente configuracion:

```env
PORT=3000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=dev_secret_change_me
MONGODB_HOST=mongodb://127.0.0.1:27017/
MONGODB_DATABASE_NAME=app_reservas_vehiculos
```

## Instalacion y Ejecucion

### Requisitos

- Node.js LTS
- npm
- MongoDB corriendo en local

### Backend

```bash
cd backend
npm install
npm run dev
```

### Seed de datos

```bash
cd backend
npm run seed-vehicles
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Scripts

### Backend

- `npm run dev`: inicia el servidor en desarrollo con recarga
- `npm run seed-vehicles`: inserta la flota inicial en MongoDB

### Frontend

- `npm run dev`: inicia el entorno de desarrollo con Vite
- `npm run build`: genera la build de produccion
- `npm run lint`: ejecuta validaciones con ESLint
- `npm run preview`: previsualiza la build generada

## Rutas Relevantes

### Frontend

- `/inicio`
- `/flota-vehiculos`
- `/vehiculo/:id`
- `/generar-reserva`
- `/register`
- `/perfil`

### Backend

- `GET /vehicles`
- `GET /vehicles/:id`
- `POST /api/register`
- `POST /api/login`
- `PUT /api/update`
- `GET /api/user/:id`
- `GET /api/verify`
- `POST /reservations`

## Aspectos Tecnicos Destacados

- Separacion clara entre capa de presentacion, capa de acceso a datos y capa de API
- Proteccion de endpoints y rutas privadas mediante JWT y middleware de autenticacion
- Persistencia de informacion de reserva en cliente para sostener el flujo de usuario
- Seed de datos para inicializacion rapida del entorno
- Servido de imagenes estaticas desde backend y soporte de assets externos para enriquecer la UI

## Estado del Proyecto

El repositorio refleja un entorno funcional de desarrollo con frontend y backend desacoplados, autenticacion operativa, persistencia en MongoDB y flujo completo de consulta y reserva de vehiculos.
