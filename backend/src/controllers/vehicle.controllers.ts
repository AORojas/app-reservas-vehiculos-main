import { type Request, type Response } from 'express'
import VehicleModel from '../models/mongodb/schemas/vehicle.model'
import type { VehicleDetails } from '../types/types'
import mongoose from 'mongoose'

export const getVehicles = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const vehicles = await VehicleModel.find()

    if (vehicles.length === 0) {
      res.status(404).json({ message: 'No vehicles found' })
      return
    }

    res.json(vehicles)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}

export const getVehicleDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params

    if (!id) {
      res.status(400).json({ message: 'ID del vehículo invalido' })
      return
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'ID de vehículo inválido' })
      return
    }

    const vehicleFounded = await VehicleModel.findById(id)

    if (!vehicleFounded) {
      res.status(404).json({ message: 'Vehículo no encontrado' })
      return
    }

    const {
      _id,
      title,
      make,
      transmissionType,
      seatingCapacity,
      trunkCapacity,
      year,
      pricePerDay,
      status,
      imageURL,
      warrantyCost,
      description
    } = vehicleFounded

    const vehicleDetails: VehicleDetails = {
      _id,
      title,
      make,
      transmissionType,
      seatingCapacity,
      trunkCapacity,
      year,
      pricePerDay,
      status,
      imageURL,
      warrantyCost,
      description
    }

    res.status(200).json({ message: 'Vehículo encontrado', vehicleDetails })
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({
        message: `Error al obtener los detalles del vehículo: ${err.message}`
      })
    } else {
      res.status(404).json({
        message: `Error desconcido al obtener los detalles del vehículo`
      })
    }
  }
}
