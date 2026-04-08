import { useRef, useState } from 'react'
import BurgerMenuSvg from '../svg-components/BurgerMenuSvg'
import logo from '../../assets/the-be-sharps.png'
import { Link, useNavigate } from 'react-router-dom'
import UserSvg from '../svg-components/UserSvg'
import HeaderMenu from './HeaderMenu.tsx'
import LiButton from '../LiButton'
import { useAuthContext } from '@/hooks/useAuthContext.ts'

interface HeaderProps {
  onLoginClick: () => void
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  const [isMenuOpen, setMenuIsOpen] = useState(false)
  const burgerDivRef = useRef<HTMLDivElement>(null)

  const navigate = useNavigate()

  const { user, logout, authIsLoading } = useAuthContext()

  const handleOpenCloseMenu = (): void => setMenuIsOpen(!isMenuOpen)

  const handleLogout = (): void => logout()

  const handleClickRegister = (): void => {
    navigate('/register')
  }

  const handleProfileButton = (): void => {
    navigate('/perfil')
  }

  return (
    <header className="relative flex items-center justify-between bg-amber-400 px-16 shadow-md">
      <div className="flex items-center justify-center gap-2">
        <Link to="/inicio">
          <img
            className="w-30 cursor-pointer"
            src={logo}
            alt="Los Borbotones logo"
          />
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <ol className="flex items-center gap-2">
          {!authIsLoading && (
            <>
              {user === null ? (
                <>
                  <LiButton
                    cssClasses="hover:scale-105"
                    onClick={onLoginClick}
                    content="Iniciar sesión"
                  />
                  <div className="px-2">
                    <div className="h-5 w-0.5 bg-white" />
                  </div>
                  <LiButton
                    cssClasses="hover:scale-105"
                    content="Registrarse"
                    onClick={handleClickRegister}
                  />
                </>
              ) : (
                <>
                  <LiButton
                    cssClasses="hover:scale-105 group"
                    childrend={
                      <div className="flex items-center gap-2">
                        <div className="w-8 stroke-white group-hover:stroke-amber-800">
                          <UserSvg />
                        </div>
                        <div className="text-xl font-bold text-white group-hover:text-amber-800">
                          {user.full_name}
                        </div>
                      </div>
                    }
                    onClick={handleProfileButton}
                  />
                  <div className="px-2">
                    <div className="h-5 w-0.5 bg-white" />
                  </div>
                  <LiButton
                    cssClasses="hover:scale-110"
                    onClick={handleLogout}
                    content="Cerrar sesión"
                  />
                </>
              )}
            </>
          )}
        </ol>
        <div
          className="w-10 cursor-pointer rounded-md p-0.5 text-white transition-all duration-300 hover:scale-110 hover:bg-amber-300 hover:text-amber-800"
          ref={burgerDivRef}
          onClick={handleOpenCloseMenu}
        >
          <BurgerMenuSvg />
        </div>
      </div>
      <HeaderMenu
        burgerDivRef={burgerDivRef}
        setMenuIsOpen={setMenuIsOpen}
        isMenuOpen={isMenuOpen}
      />
    </header>
  )
}

export default Header
