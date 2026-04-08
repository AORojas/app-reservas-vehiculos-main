import { DatePicker } from '@/components/DatePicker'
import { Button } from '@/components/ui/button'
import CustomSelect from '../CustomSelect'
import { Link } from 'react-router-dom'
import { useReservationStore } from '@/store/useReservationStore'

const cities = [
  { key: 'bahia-blanca', value: 'Bahía Blanca' },
  { key: 'buenos-aires', value: 'Buenos Aires' },
  { key: 'cordoba', value: 'Córdoba' },
  { key: 'rosario', value: 'Rosario' },
  { key: 'mendoza', value: 'Mendoza' },
  { key: 'neuquen', value: 'Neuquén' },
  { key: 'tucuman', value: 'San Miguel de Tucumán' }
]

const HomePageFormReservation: React.FC = () => {
  const {
    selectedCity,
    setSelectedCity,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    discountCode,
    setDiscountCode
  } = useReservationStore()

  const handleDiscountCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value.toUpperCase()

    // Acepta letras y números, hasta 10 caracteres
    if (!/^[A-Z0-9]{0,6}$/.test(value)) return

    setDiscountCode(value)
  }

  return (
    <div className="flex h-32 w-4/5 items-center gap-4 rounded-sm bg-stone-700/40 p-16">
      <CustomSelect
        selectedValue={selectedCity}
        setSelectedValue={setSelectedCity}
        selectItems={cities}
        cssClasses="min-w-56"
      />
      <DatePicker
        placeholder="Fecha de retiro"
        value={pickupDate}
        onDateChange={setPickupDate}
        disabled={{ before: new Date() }}
        cssClasses="text-base"
      />
      <DatePicker
        placeholder="Fecha de devolución"
        value={returnDate}
        onDateChange={setReturnDate}
        disabled={{ before: new Date() }}
        cssClasses="text-base"
      />

      <input
        type="text"
        placeholder="Código de descuento"
        className="h-9 rounded-sm bg-white pl-2 text-base"
        onChange={handleDiscountCodeChange}
        value={discountCode}
      />

      <Button className="bg-white text-base font-medium text-gray-400 shadow-md shadow-stone-600 transition-colors duration-300 ease-in-out hover:bg-stone-800 hover:text-gray-200 disabled:cursor-not-allowed disabled:bg-white disabled:text-gray-300 disabled:opacity-100 disabled:shadow-none">
        <Link
          to="/generar-reserva"
          className="block h-full w-full cursor-pointer"
        >
          Continuar
        </Link>
      </Button>
    </div>
  )
}

export default HomePageFormReservation
