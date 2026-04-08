import { useEffect, useState } from 'react'

interface ReservationStorage {
  selectedCity: string | undefined
  setSelectedCity: React.Dispatch<React.SetStateAction<string | undefined>>

  pickupDate: Date | undefined
  setPickupDate: React.Dispatch<React.SetStateAction<Date | undefined>>

  returnDate: Date | undefined
  setReturnDate: React.Dispatch<React.SetStateAction<Date | undefined>>

  pickupTime: string
  setPickupTime: React.Dispatch<React.SetStateAction<string>>

  returnTime: string
  setReturnTime: React.Dispatch<React.SetStateAction<string>>

  discountCode: string
  setDiscountCode: React.Dispatch<React.SetStateAction<string>>

  vehicleID: string
  setVehicleID: React.Dispatch<React.SetStateAction<string>>

  clearReservation: () => void
}

const STORAGE_KEY = 'reservationInfo'

export function useReservationStorage(): ReservationStorage {
  const [selectedCity, setSelectedCity] = useState<string | undefined>('')
  const [pickupDate, setPickupDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [pickupTime, setPickupTime] = useState('')
  const [returnTime, setReturnTime] = useState('')
  const [discountCode, setDiscountCode] = useState('')
  const [vehicleID, setVehicleID] = useState('')
  const [isInitialized, setIsInitialized] = useState(false)

  // Carga desde sessionStorage al iniciar
  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY)

    if (stored) {
      try {
        const data = JSON.parse(stored)

        setSelectedCity(data.selectedCity)
        setPickupDate(data.pickupDate ? new Date(data.pickupDate) : undefined)
        setReturnDate(data.returnDate ? new Date(data.returnDate) : undefined)
        setPickupTime(data.pickupTime || '')
        setReturnTime(data.returnTime || '')
        setDiscountCode(data.discountCode || '')
        setVehicleID(data.vehicleID || '')
      } catch (err) {
        console.error('Error parsing reservation storage', err)
      }
    }
    // Recién marcamos como inicializado después de intentar cargar
    setIsInitialized(true)
  }, [])

  // Guardar en sessionStorage solo después de inicializar
  useEffect(() => {
    if (!isInitialized) return

    const hasData =
      selectedCity ||
      pickupDate ||
      returnDate ||
      pickupTime ||
      returnTime ||
      discountCode ||
      vehicleID

    // No guarda si está todo vacío
    if (!hasData) return

    const data = {
      selectedCity,
      pickupDate: pickupDate ? pickupDate.toISOString() : null,
      returnDate: returnDate ? returnDate.toISOString() : null,
      pickupTime,
      returnTime,
      discountCode,
      vehicleID
    }

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [
    selectedCity,
    pickupDate,
    returnDate,
    pickupTime,
    returnTime,
    discountCode,
    vehicleID,
    isInitialized
  ])

  const clearReservation = (): void => {
    sessionStorage.removeItem(STORAGE_KEY)
    setSelectedCity(undefined)
    setPickupDate(undefined)
    setReturnDate(undefined)
    setPickupTime('')
    setReturnTime('')
    setDiscountCode('')
    setVehicleID('')
  }

  return {
    selectedCity,
    setSelectedCity,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    pickupTime,
    setPickupTime,
    returnTime,
    setReturnTime,
    discountCode,
    setDiscountCode,
    vehicleID,
    setVehicleID,
    clearReservation
  }
}
