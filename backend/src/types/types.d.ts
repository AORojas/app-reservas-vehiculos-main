// Modelos de MongoDB
export interface IVehicle extends Document {
  _id: Schema.Types.ObjectId
  title: string
  make: string
  transmissionType: 'manual' | 'automatic' | 'automática'
  seatingCapacity: number
  trunkCapacity: number
  year: number
  licencePlate: string
  pricePerDay: number
  status: string
  imageURL: string
  warrantyCost: number
  description: string
}

export interface VehicleDetails {
  _id: Schema.Types.ObjectId
  title: string
  make: string
  transmissionType: 'manual' | 'automatic' | 'automática'
  seatingCapacity: number
  trunkCapacity: number
  year: number
  pricePerDay: number
  status: string
  imageURL: string
  warrantyCost: number
  description: string
}

// User
export interface IUser extends Document {
  _id: Schema.Types.ObjectId
  email: string
  password: string
  full_name: string
  last_name: string
  country: string
  address: string
  address_number: number
  phone_number: number
  fiscal_condition: string
  document_type: string
  document_number: number
}

export interface UserProfileInfo {
  full_name: string
  last_name: string
  country: string
  address: string
  address_number: number
  phone_number: number
  fiscal_condition: string
  document_type: string
  document_number: number
}

// Reservation
export interface IReservation extends Document {
  _id: Schema.Types.ObjectId
  user_id: Schema.Types.ObjectId
  vehicle_id: Schema.Types.ObjectId
  pickup_date: Date
  return_date: Date
  pickup_time: string
  return_time: string
  status: string | undefined
  pickup_location: string
  discount_code?: string
  insurance_policy_id?: Schema.Types.ObjectId | null
}

// Login types
export interface UserLoginInfo {
  _id: Schema.Types.ObjectId
  email: EmailType
  full_name: string
}

export interface VerifyTokenResponse {
  message: string
  userLoginInfo?: UserLoginInfo
}

// Response
export interface LoginResponse {
  token: string
}

export interface ReservationResponse {
  message: string
  reservation: IReservation
}

// jwt
export interface TokenPayload {
  _id: string
  email: EmailType
  full_name: string
}

interface JwtPayloadCustom extends jwt.JwtPayload {
  userLoginInfo: TokenPayload
}
