import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface ReservationState {
  selectedCity: string
  pickupDate: Date | undefined
  returnDate: Date | undefined
  pickupTime: string
  returnTime: string
  discountCode: string
  vehicleID: string

  setSelectedCity: (city: string) => void
  setPickupDate: (date: Date | undefined) => void
  setReturnDate: (date: Date | undefined) => void
  setPickupTime: (time: string) => void
  setReturnTime: (time: string) => void
  setDiscountCode: (code: string) => void
  setVehicleID: (id: string) => void
  clearReservation: () => void
}

export const useReservationStore = create<ReservationState>()(
  persist(
    (set) => ({
      selectedCity: '',
      pickupDate: undefined,
      returnDate: undefined,
      pickupTime: '',
      returnTime: '',
      discountCode: '',
      vehicleID: '',

      setSelectedCity: (selectedCity): void => {
        set({ selectedCity })
      },
      setPickupDate: (pickupDate): void => {
        set({ pickupDate })
      },
      setReturnDate: (returnDate): void => {
        set({ returnDate })
      },
      setPickupTime: (pickupTime): void => {
        set({ pickupTime })
      },
      setReturnTime: (returnTime): void => {
        set({ returnTime })
      },
      setDiscountCode: (discountCode): void => {
        set({ discountCode })
      },
      setVehicleID: (vehicleID): void => {
        set({ vehicleID })
      },

      clearReservation: (): void => {
        set({
          selectedCity: '',
          pickupDate: undefined,
          returnDate: undefined,
          pickupTime: '',
          returnTime: '',
          discountCode: '',
          vehicleID: ''
        })
      }
    }),
    {
      name: 'reservationInfo',
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage:
        () =>
        (state): void => {
          if (state?.pickupDate && typeof state.pickupDate === 'string') {
            state.pickupDate = new Date(state.pickupDate)
          }
          if (state?.returnDate && typeof state.returnDate === 'string') {
            state.returnDate = new Date(state.returnDate)
          }
        }
    }
  )
)
