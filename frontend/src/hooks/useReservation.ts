import { useState } from 'react'
import type { IReservation, ReservationResponse } from '../types/types'
import { makeReservation } from '@/api/reservationApi'

interface useReservationReturn {
  reservation: ReservationResponse | null
  error: string | null
  loading: boolean
  makeReservationRequest: (
    token: string,
    reservation: IReservation
  ) => Promise<void>
}

export const useReservation = (): useReservationReturn => {
  const [reservation, setReservation] = useState<ReservationResponse | null>(
    null
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const makeReservationRequest = async (
    token: string,
    reservation: IReservation
  ): Promise<void> => {
    setLoading(true)
    setError(null)

    try {
      const data = await makeReservation(token, reservation)
      setReservation(data)
      setLoading(false)
    } catch (err) {
      if (err instanceof Error) setError(err.message)
      else setError(String(err))
    }
  }

  return { reservation, loading, error, makeReservationRequest }
}

export default useReservation
