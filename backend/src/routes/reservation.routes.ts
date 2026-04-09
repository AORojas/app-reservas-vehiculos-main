import express from 'express'
import { setReservation } from '../controllers/reservation.controllers.js'

const router = express.Router()

router.post('/', setReservation)

export default router
