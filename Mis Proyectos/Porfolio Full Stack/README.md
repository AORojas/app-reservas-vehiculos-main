# Portfolio Full Stack

Base inicial para un portfolio dinamico con:

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Base de datos: MongoDB

## Estructura

```text
client/   -> app React
server/   -> API Express
```

## Primeros pasos

1. Instalar dependencias:

```bash
npm install
```

2. Configurar variables del backend:

```bash
cp server/.env.example server/.env
```

3. Levantar el backend:

```bash
npm run dev:server
```

4. En otra terminal, levantar el frontend:

```bash
npm run dev:client
```

## Endpoints

- `GET /api/health`
- `GET /api/portfolio`

## Siguiente paso sugerido

Conectar MongoDB para persistir experiencia, proyectos, skills y datos de contacto desde colecciones reales.

