import { model, Schema } from 'mongoose'
import type { IReservation } from '../../../types/types'

const ReservationSchema = new Schema<IReservation>({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  vehicle_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'vehicle'
  },
  pickup_date: {
    type: Date,
    required: true
  },
  return_date: {
    type: Date,
    required: true
  },
  pickup_time: {
    type: String,
    required: true
  },
  return_time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  pickup_location: {
    type: String,
    required: true
  },
  discount_code: {
    type: String
  },
  insurance_policy_id: {
    type: Schema.Types.ObjectId
  }
})

const ReservationModel = model<IReservation>('Reservation', ReservationSchema)

export default ReservationModel
