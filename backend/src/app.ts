import express from 'express'
import cors from 'cors'
import vehicleRoutes from './routes/vehicle.routes.js'
import userRoutes from './routes/user.routes.js'
import reservationRoutes from './routes/reservation.routes.js'
import { authMiddleware } from './middlewares/authMiddleware.js'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const app = express()
const currentDirectory = path.dirname(fileURLToPath(import.meta.url))
const vehicleAssetsPath = path.join(currentDirectory, 'assets', 'vehicles')

const { FRONTEND_URL } = process.env

const corsOptions = {
  origin: [`${FRONTEND_URL}`],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}

// Middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use('/vehicles', vehicleRoutes)
app.use('/vehicles-images', express.static(vehicleAssetsPath))
app.use('/reservations', authMiddleware, reservationRoutes)
app.use('/api', userRoutes)

export { app }
