import classNames from 'classnames'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import WorldSVG from '../svg-components/WorldSVG'
import useCloseOnClickOutside from '@/hooks/useCloseOnClickOutside'
import useCloseOnScroll from '@/hooks/useCloseOnScroll'

interface HeaderMenuProps {
  burgerDivRef: React.RefObject<HTMLDivElement | null>
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isMenuOpen: boolean
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({
  burgerDivRef,
  setMenuIsOpen,
  isMenuOpen
}) => {
  const menuRef = useRef<HTMLOListElement>(null)

  useCloseOnClickOutside({
    isOpen: isMenuOpen,
    onClose: () => setMenuIsOpen(false),
    ref: burgerDivRef
  })

  useCloseOnScroll({
    isOpen: isMenuOpen,
    onClose: () => setMenuIsOpen(false)
  })

  const olHandleClick = (): void => setMenuIsOpen(false)

  return (
    <ol
      className={classNames(
        'absolute top-full right-0 z-100 h-[calc(100dvh-120px)] w-62 bg-amber-900 text-white transition-all duration-300 ease-in-out',
        {
          'invisible translate-x-full opacity-0': !isMenuOpen,
          'translate-x-0': isMenuOpen
        }
      )}
      ref={menuRef}
      onClick={olHandleClick}
    >
      <li>
        <Link
          to="/inicio"
          className="block h-full w-full cursor-pointer px-8 py-4 text-xl font-bold tracking-wide hover:bg-amber-800"
        >
          Inicio
        </Link>
      </li>
      <li>
        <Link
          to="/generar-reserva"
          className="block h-full w-full cursor-pointer px-8 py-4 text-xl font-bold tracking-wide hover:bg-amber-800"
        >
          Rentar vehículo
        </Link>
      </li>
      <li>
        <Link
          to="/flota-vehiculos"
          className="block h-full w-full cursor-pointer px-8 py-4 text-xl font-bold tracking-wide hover:bg-amber-800"
        >
          Flota de vehículos
        </Link>
      </li>
      <li className="cursor-pointer px-8 py-4 text-xl font-bold tracking-wide hover:bg-amber-800">
        Sucursales
      </li>
      {/* <li className="cursor-pointer px-8 py-4 text-xl font-bold tracking-wide hover:bg-amber-800">
        Beneficios
      </li> */}
      {/* <li className="cursor-pointer px-8 py-4 text-xl font-bold tracking-wide hover:bg-amber-800">
        Autos usados
      </li> */}
      <li className="flex cursor-pointer gap-2 px-8 py-4 text-xl font-bold tracking-wide hover:bg-amber-800">
        <div className="w-8">
          <WorldSVG />
        </div>
        <p>es/en</p>
      </li>
    </ol>
  )
}

export default HeaderMenu
