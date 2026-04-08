import CustomSelect from '@/components/CustomSelect'
import { DatePicker } from '@/components/DatePicker'
import TimeSelect from '@/components/TimeSelect'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import useVehicles from '@/hooks/queries/useVehicles'
import VehicleInformation from '@/components/VehicleInformation'
import useReservation from '@/hooks/useReservation'
import { jwtDecode } from 'jwt-decode'
import type { IReservation, TokenPayload } from '@/types/types'
import LoadingSpinner from '@/components/LoadingSpinner'
import classNames from 'classnames'
import { useReservationStore } from '@/store/useReservationStore'
import Cookies from 'js-cookie'

const cities = [
  { key: 'bahia-blanca', value: 'Bahía Blanca' },
  { key: 'buenos-aires', value: 'Buenos Aires' },
  { key: 'cordoba', value: 'Córdoba' },
  { key: 'rosario', value: 'Rosario' },
  { key: 'mendoza', value: 'Mendoza' },
  { key: 'neuquen', value: 'Neuquén' },
  { key: 'tucuman', value: 'San Miguel de Tucumán' }
]

const filters = [
  { key: 'passengers', value: 'Cantidad de pasajeros' },
  { key: 'manual-transmission', value: 'Caja manual' },
  { key: 'automatic-transmission', value: 'Caja automática' },
  { key: 'economic-manual', value: 'Económico (TM)' }
]

const ReservationPage: React.FC = () => {
  const {
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
    setVehicleID
  } = useReservationStore()
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')

  const { vehicles } = useVehicles()
  const {
    loading: reservationIsLoading,
    error: reservationError,
    makeReservationRequest
  } = useReservation()

  useEffect(() => {
    if (showMessage) {
      const timeout = setTimeout(() => setShowMessage(false), 3000)
      return (): void => {
        clearTimeout(timeout)
        setMessage('')
      }
    }
  }, [showMessage])

  useEffect(() => {
    if (reservationError) {
      setMessage('Ocurrió un error al realizar la reserva. Intente nuevamente.')
      setShowMessage(true)
      return
    }

    if (reservationIsLoading && reservationError === null) {
      setMessage('Reserva realizada con éxito.')
      setShowMessage(true)
    }
  }, [reservationError, reservationIsLoading])

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    console.log('🚀 ~ handleSubmit ~ selectedCity: ', selectedCity)

    // Validaciones
    if (selectedCity === '') {
      setMessage('Seleccione una ciudad.')
      setShowMessage(true)
      return
    }

    if (!pickupDate) {
      setMessage('Seleccione la fecha de retiro.')
      setShowMessage(true)
      return
    }

    if (!returnDate) {
      setMessage('Seleccione la fecha de devolución.')
      setShowMessage(true)
      return
    }

    if (pickupTime === '') {
      setMessage('Seleccione la hora de retiro.')
      setShowMessage(true)
      return
    }

    if (returnTime === '') {
      setMessage('Seleccione la hora de devolución.')
      setShowMessage(true)
      return
    }

    if (vehicleID === null) {
      setMessage('Seleccione un vehículo.')
      setShowMessage(true)
      return
    }

    const pickupDateTime = new Date(pickupDate)
    const returnDateTime = new Date(returnDate)

    if (pickupDateTime > returnDateTime) {
      setMessage('La fecha de devolución no puede ser anterior a la de retiro.')
      setShowMessage(true)
      return
    }

    const token = Cookies.get('token')

    if (!token) return

    const tokenPayload: TokenPayload = jwtDecode(token)

    const reservation = {
      user_id: tokenPayload._id,
      vehicle_id: vehicleID,
      pickup_date: pickupDate,
      return_date: returnDate,
      pickup_time: pickupTime,
      return_time: returnTime,
      status: 'pendiente',
      pickup_location: selectedCity,
      discount_code: discountCode
    } as IReservation

    await makeReservationRequest(token, reservation)
  }

  const handleDiscountCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value.toUpperCase()

    // Acepta letras y números, hasta 10 caracteres
    if (!/^[A-Z0-9]{0,6}$/.test(value)) return

    setDiscountCode(value)
  }

  const handleFilterChange = (key: string): void => {
    setActiveFilters((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    )
  }

  const filteredVehicles = vehicles?.filter((v) => {
    // Si no hay filtros, mostrar todos
    if (activeFilters.length === 0) return true

    // Caja manual
    if (
      activeFilters.includes('manual-transmission') &&
      v.transmissionType.toLocaleLowerCase() !== 'manual'
    )
      return false

    // Caja automática
    if (
      activeFilters.includes('automatic-transmission') &&
      v.transmissionType.toLocaleLowerCase() !== 'automática'
    )
      return false

    // Económico (TM): precio menor a cierto valor + transmisión manual
    if (
      activeFilters.includes('economic-manual') &&
      !(v.transmissionType.toLowerCase() === 'manual' && v.pricePerDay <= 65)
    )
      return false

    // Cantidad de pasajeros: autos con más de 4 asientos
    if (activeFilters.includes('passengers') && v.seatingCapacity < 5)
      return false

    return true
  })

  return (
    <section className="my-10 flex justify-center gap-4 px-16">
      <aside className="flex w-[50%] flex-col gap-4">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="relative flex w-full flex-col items-center gap-4 rounded-md border border-gray-200 px-4 py-8 shadow-md"
        >
          <CustomSelect
            selectedValue={selectedCity}
            setSelectedValue={setSelectedCity}
            selectItems={cities}
            cssClasses="w-full"
          />
          <DatePicker
            placeholder="Fecha de retiro"
            value={pickupDate}
            onDateChange={setPickupDate}
            disabled={{ before: new Date() }}
            cssClasses="w-full text-base"
          />
          <DatePicker
            placeholder="Fecha de devolución"
            value={returnDate}
            onDateChange={setReturnDate}
            disabled={{ before: new Date() }}
            cssClasses="w-full text-base"
          />

          <div className="flex w-full gap-2">
            <div className="flex w-full flex-col">
              <p className="mb-1 ml-2 text-xs text-gray-900">Hora de retiro</p>
              <TimeSelect
                value={pickupTime}
                onTimeChange={(timeValue) => setPickupTime(timeValue)}
              />
            </div>
            <div className="flex w-full flex-col">
              <p className="mb-1 ml-2 text-xs text-gray-900">
                Hora de devolución
              </p>
              <TimeSelect
                value={returnTime}
                onTimeChange={(timeValue) => setReturnTime(timeValue)}
              />
            </div>
          </div>

          <input
            type="text"
            placeholder="Código de descuento"
            className="h-9 w-full rounded-sm border border-gray-200 bg-white pl-2 text-base placeholder:text-base"
            onChange={handleDiscountCodeChange}
            value={discountCode}
          />
          <div className="relative">
            <Button
              disabled={reservationIsLoading}
              type="submit"
              className="cursor-pointer border border-black/30 bg-white text-gray-400 shadow-md transition-colors duration-300 ease-in-out hover:bg-stone-800 hover:text-white"
            >
              Continuar
            </Button>
            <LoadingSpinner
              isLoading={reservationIsLoading}
              cssClasses="h-8 w-8 absolute top-0 mt-0.5 -right-10"
            />
          </div>
          <div
            className={classNames(
              'pointer-events-none absolute top-full mt-2 flex w-full items-center justify-center rounded-md border border-gray-200 bg-white p-4 shadow-md transition-all duration-300 ease-in-out',
              {
                'translate-y-0 opacity-100': showMessage,
                '-translate-y-full opacity-0': !showMessage
              }
            )}
          >
            <p className="text-center text-pretty">{message}</p>
          </div>
        </form>
        <div className="flex flex-col gap-4 rounded-md border border-gray-200 p-4 text-gray-900 shadow-md">
          <h4 className="w-full text-center text-xl font-bold">Categorías</h4>
          <ol className="grid grid-cols-2 gap-2">
            {filters.map((filter) => (
              <li key={filter.key} className="flex gap-2">
                <input
                  type="checkbox"
                  id={filter.key}
                  className="h-5 w-5 cursor-pointer"
                  checked={activeFilters.includes(filter.key)}
                  onChange={() => handleFilterChange(filter.key)}
                />
                <label htmlFor={filter.key}>{filter.value}</label>
              </li>
            ))}
          </ol>
          <div className="h-0.5 border-t" />
          <p>TM: Transmisión Manual</p>
        </div>
      </aside>
      <article className="flex max-h-[588px] w-full flex-col items-center gap-4 overflow-y-scroll rounded-md border border-gray-200 px-4 py-8 shadow-md">
        {filteredVehicles &&
          filteredVehicles.map((vehicle) => {
            return (
              <VehicleInformation
                key={vehicle._id}
                title={vehicle.title}
                transmissionType={vehicle.transmissionType}
                trunkCapacity={vehicle.trunkCapacity}
                pricePerDay={vehicle.pricePerDay}
                warrantyCost={vehicle.warrantyCost}
                vehicleID={vehicle._id}
                handleSelectVehicle={setVehicleID}
                vehicleIDSelected={vehicleID}
                imageURL={vehicle.imageURL}
              />
            )
          })}
      </article>
    </section>
  )
}

export default ReservationPage
