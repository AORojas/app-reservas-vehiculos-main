import { useEffect, useRef, useState } from 'react'
import useCloseOnClickOutside from '@/hooks/useCloseOnClickOutside'
import { useAuthContext } from '@/hooks/useAuthContext'
import CancelMarkSvg from '../svg-components/CancelMarkSvg'
import classNames from 'classnames'
import InputField from '../InputField'

interface LoginUserProps {
  onClose: () => void
  isLoginOpen: boolean
}

const LoginUser: React.FC<LoginUserProps> = ({ onClose, isLoginOpen }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const loginDivContainer = useRef<HTMLDivElement>(null)

  useCloseOnClickOutside({
    isOpen: isLoginOpen,
    onClose: () => {
      onClose()
      setPassword('')
      setEmail('')
    },
    ref: loginDivContainer
  })

  const { signIn, user } = useAuthContext()

  useEffect(() => {
    if (user === null) return

    setMessage(`Bienvenido ${user.full_name}`)
  }, [user])

  useEffect(() => {
    document.body.style.overflow = isLoginOpen ? 'hidden' : ''

    return (): void => {
      document.body.style.overflow = ''
    }
  }, [isLoginOpen])

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

    try {
      signIn(email, password)
      setError('')

      setTimeout(() => {
        setMessage('')
        onClose()
      }, 4000)
    } catch (err) {
      if (err instanceof Error) {
        console.log('Ha ocurrido un error al intentar loguearse: ', err.message)
      }

      setMessage('')

      setTimeout(() => {
        setError('')
      }, 3000)
    }
  }

  const handleClose = (): void => {
    setEmail('')
    setPassword('')

    onClose()
  }

  return (
    <div
      className={classNames(
        'fixed inset-0 flex items-center justify-center bg-black/50 transition-all duration-300 ease-in-out',
        {
          'opacity-100': isLoginOpen,
          'pointer-events-none opacity-0': !isLoginOpen
        }
      )}
    >
      <div
        className={classNames(
          'relative w-80 rounded-lg bg-white p-8 shadow-lg',
          {
            'scale-up-center': isLoginOpen
          }
        )}
        ref={loginDivContainer}
      >
        <button
          type="button"
          onClick={() => handleClose()}
          className="absolute top-4 right-8 h-8 w-8 cursor-pointer rounded-full bg-amber-400 stroke-white transition duration-300 ease-in-out hover:scale-110 hover:bg-amber-500"
        >
          <CancelMarkSvg />
        </button>

        <form onSubmit={handleLogin} className="flex flex-col gap-8 pt-8">
          <InputField
            label="Correo"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />
          <InputField
            label="Contraseña"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          />

          <button
            type="submit"
            className="cursor-pointer rounded bg-amber-400 py-2 font-bold text-white transition-all duration-300 ease-in-out hover:bg-amber-500"
          >
            Iniciar sesión
          </button>

          {error && <p className="text-center text-red-500">{error}</p>}
          {message && <p className="text-center text-green-500">{message}</p>}
        </form>
      </div>
    </div>
  )
}

export default LoginUser
