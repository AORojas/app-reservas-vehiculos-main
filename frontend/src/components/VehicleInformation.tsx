// import vehicleLogo from '../assets/fiat-mobi-easy.webp'
import UserIconSvg from '@/components/svg-components/UserIconSvg'
import { CarIconSvg } from '@/components/svg-components/CarIconSvg'
import classNames from 'classnames'
import { SuitCaseSvg } from './svg-components/SuitCaseSvg'

interface VehicleInformationProps {
  title: string
  transmissionType: string
  trunkCapacity: number
  pricePerDay: number
  warrantyCost: number
  vehicleID: string
  handleSelectVehicle: (vehicleID: string) => void
  vehicleIDSelected: string | null
  imageURL: string
}

const URL_API = import.meta.env.VITE_API_URL

const VehicleInformation: React.FC<VehicleInformationProps> = ({
  title,
  transmissionType,
  trunkCapacity,
  pricePerDay,
  warrantyCost,
  vehicleID,
  handleSelectVehicle,
  vehicleIDSelected,
  imageURL
}) => {
  return (
    <div
      className={classNames(
        'flex w-full cursor-pointer items-center rounded-md border py-4 transition-all duration-300 ease-in-out hover:scale-101 hover:bg-gray-200',
        {
          'scale-101 border border-gray-300 bg-gray-200 inset-shadow-sm inset-shadow-gray-400':
            vehicleID === vehicleIDSelected,
          'shadow-md': vehicleID !== vehicleIDSelected
        }
      )}
      onClick={() => handleSelectVehicle(vehicleID)}
    >
      <div className="w-[60%]">
        <img
          src={`${URL_API}/${imageURL}`}
          alt="Logo del vehículo"
          className="w-72"
        />
      </div>
      <div className="flex w-full">
        <div className="w-1/2">
          <h4 className="text-2xl font-bold">{title}</h4>
          <div className="mt-2 flex gap-2">
            <div className="flex items-center justify-around gap-2 rounded-xs bg-gray-100 px-1">
              <div className="w-4 stroke-gray-900">
                <UserIconSvg />
              </div>
              <p className="text-base font-bold text-gray-900">5</p>
            </div>
            <div className="flex items-center justify-around gap-2 rounded-xs bg-gray-100 stroke-white px-1">
              <div className="w-4">
                <CarIconSvg />
              </div>
              <p className="text-base font-bold text-gray-900">
                {transmissionType}
              </p>
            </div>
            <div className="flex items-center justify-around gap-2 rounded-xs bg-gray-100 stroke-white px-1">
              <div className="w-4">
                <SuitCaseSvg />
              </div>
              <p className="text-base font-bold text-gray-900">
                {trunkCapacity}
              </p>
            </div>
          </div>
          <p className="mt-2 text-xl font-bold">Kilometraje Limitado</p>
          <p className="mt-2 text-xl">{`Garantia: $ ${warrantyCost}`}</p>
        </div>
        <div className="flex w-1/2 flex-col items-center justify-center">
          <p className="font-bold text-gray-900">Costo de alquiler por día</p>
          <p className="text-2xl text-gray-900">
            ARS <b className="font-bold">{`$${pricePerDay}`}</b>
          </p>
        </div>
      </div>
    </div>
  )
}

export default VehicleInformation
