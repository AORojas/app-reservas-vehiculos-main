import { model, Schema } from 'mongoose'
import type { IUser } from '../../../types/types'

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  full_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  address_number: {
    type: Number,
    required: true
  },
  phone_number: {
    type: Number,
    required: true
  },
  fiscal_condition: {
    type: String,
    required: true
  },
  document_type: {
    type: String,
    required: true
  },
  document_number: {
    type: Number,
    required: true
  }
})

const UserModel = model<IUser>('User', UserSchema)

export default UserModel
