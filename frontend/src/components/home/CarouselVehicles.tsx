import React from 'react'
import Slider from 'react-slick'
import '@/styles/slick.css'
import type { IVehicle } from '@/types/types'
// import carImage from '../assets/fiat-mobi-easy.webp'

interface CarouselVehiclesProps {
  vehicles: IVehicle[]
}

const API_URL = import.meta.env.VITE_API_URL

const CarouselVehicles: React.FC<CarouselVehiclesProps> = ({ vehicles }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  }

  return (
    <div className="w-ful relative m-auto w-3/4">
      <Slider {...settings}>
        {vehicles.map((vehicle) => {
          return (
            <div className="h-72 rounded-md bg-amber-200 p-4" key={vehicle._id}>
              <div className="flex h-full flex-col items-center">
                <h3 className="grow-[2] text-center text-2xl font-bold">
                  {vehicle.title}
                </h3>
                <div className="mt-auto">
                  <img
                    className="mx-auto w-58"
                    src={`${API_URL}/${vehicle.imageURL}`}
                    alt={vehicle.title}
                  />
                  <p className="h-16 text-center font-light">
                    {vehicle.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </Slider>
    </div>
  )
}

export default CarouselVehicles
