import { Router } from 'express'
import {
  getVehicleDetails,
  getVehicles
} from '../controllers/vehicle.controllers'

const router = Router()

router.get('/', getVehicles)
router.get('/:id', getVehicleDetails)

export default router
