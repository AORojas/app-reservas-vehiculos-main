import type { IReservation, ReservationResponse } from '@/types/types'
import httpClient from './httpClient'

export const makeReservation = (
  token: string,
  reservation: IReservation
): Promise<ReservationResponse> =>
  httpClient('/reservations', { method: 'POST', body: { token, reservation } })
