import {
  closeDatabaseConnection,
  openDatabaseConnection
} from '../../models/mongodb/database'
import VehicleModel from '../../models/mongodb/schemas/vehicle.model'
import vehiclesJSON from '../data/vehicles.json'

openDatabaseConnection()
  .then(() => {
    setVehicles()
  })
  .catch((err) => {
    console.error('Error conectando a MongoDB: ', err)
  })

const setVehicles = async (): Promise<void> => {
  try {
    for (const vehicle of vehiclesJSON) {
      const newVehicle = new VehicleModel({
        title: vehicle.title,
        make: vehicle.make,
        seatingCapacity: vehicle.seatingCapacity,
        transmissionType: vehicle.transmissionType,
        trunkCapacity: vehicle.trunkCapacity,
        year: vehicle.year,
        licencePlate: vehicle.licencePlate,
        pricePerDay: vehicle.pricePerDay,
        status: vehicle.status,
        imageURL: vehicle.imageURL,
        warrantyCost: vehicle.warrantyCost,
        description: vehicle.description
      })

      await newVehicle.save()
    }

    console.log('Vehicles loaded correctly')

    await closeDatabaseConnection()
  } catch (err) {
    console.log('Error adding vehicles: ', err)
  }
}
