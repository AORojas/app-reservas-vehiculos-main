import { Router } from 'express'
import {
  getVehicleDetails,
  getVehicles
} from '../controllers/vehicle.controllers.js'

const router = Router()

router.get('/', getVehicles)
router.get('/:id', getVehicleDetails)

export default router
