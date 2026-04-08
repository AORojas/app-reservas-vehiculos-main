import type { IVehicle, VehicleDetailsResponse } from '../types/types'
import httpClient from './httpClient'

export const getVehicles = (): Promise<IVehicle[]> => httpClient('/vehicles')

export const getVehicleById = (id: string): Promise<VehicleDetailsResponse> =>
  httpClient(`/vehicles/${id}`)
