import useVehicle from '@/hooks/queries/useVehicles'

import { type JSX } from 'react'

import CarouselVehicles from '@/components/home/CarouselVehicles'
import HomePageFormReservation from '@/components/home/HomePageFormReservation'

const HomePage = (): JSX.Element => {
  const { vehicles } = useVehicle()

  return (
    <>
      <section className="flex h-[calc(100dvh-120px)] w-full flex-col items-center justify-center bg-[url('./assets/driving-car.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="w-4/5">
          <h1 className="mb-4 text-center text-5xl font-bold tracking-wide text-white text-shadow-md">
            Alquiler de autos en Argentina con Sharps
          </h1>
        </div>
        <HomePageFormReservation />
      </section>
      <section className="relative flex flex-col items-center justify-between gap-6 pt-6 pb-16">
        {vehicles === null || vehicles.length === 0 ? (
          <div className="mt-4 flex h-52 w-1/3 items-center justify-center rounded-md bg-amber-800/80">
            <p className="text-3xl text-white">No hay vehículos disponibles</p>
          </div>
        ) : (
          <>
            <h2 className="text-5xl">Nuestra flota de alquiler de vehículos</h2>
            <CarouselVehicles vehicles={vehicles} />
          </>
        )}
        <div className="absolute bottom-0 -z-100 h-28 w-full -translate-y-38 bg-orange-200"></div>
      </section>
    </>
  )
}

export default HomePage
