import { useEffect, useState } from 'react'
import { getVehicles } from '../../api/vehicleApi'
import type { IVehicle } from '../../types/types'

interface useVehicleReturn {
  vehicles: IVehicle[] | null
  error: string | null
  loading: boolean
}

const useVehicles = (): useVehicleReturn => {
  const [vehicles, setVehicles] = useState<IVehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVehicles = async (): Promise<void> => {
      try {
        const data = await getVehicles()

        setVehicles(data)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError(String(err))
        }
      } finally {
        setLoading(false)
      }
    }

    fetchVehicles()
  }, [])

  return { vehicles, loading, error }
}

export default useVehicles
