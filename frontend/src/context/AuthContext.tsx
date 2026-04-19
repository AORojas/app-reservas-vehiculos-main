import {
  loginUser,
  logoutUser,
  registerUser,
  verifyTokenRequest
} from '@/api/userApi'
import { AuthContext, type AuthContextProps } from '@/hooks/useAuthContext'
import type {
  EmailType,
  IUserInput,
  PasswordType,
  UserLoginInfo
} from '@/types/types'
import { useEffect, useState, type JSX, type ReactNode } from 'react'

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<UserLoginInfo | null>(null)
  const [error, setError] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authIsLoading, setAuthIsLoading] = useState(true)

  const handleAuthSuccess = (userLoginInfo: UserLoginInfo | null): void => {
    setError('')
    setUser(userLoginInfo)
    setIsAuthenticated(true)
  }

  const resetAuthState = (): void => {
    setIsAuthenticated(false)
    setUser(null)
  }

  const signUp = async (signInUser: IUserInput): Promise<void> => {
    try {
      const res = await registerUser(signInUser)
      handleAuthSuccess(res.userLoginInfo)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Error desconocido')
      }
    }
  }

  const signIn = async (
    email: EmailType,
    password: PasswordType
  ): Promise<void> => {
    try {
      const res = await loginUser(email, password)
      handleAuthSuccess(res.userLoginInfo)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Error desconocido')
      }
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await logoutUser()
    } catch (err) {
      if (err instanceof Error) {
        console.log('Error al cerrar sesion:', err.message)
      } else {
        console.log('Error desconocido al cerrar sesion')
      }
    } finally {
      resetAuthState()
    }
  }

  useEffect(() => {
    async function checkLogin(): Promise<void> {
      try {
        const res = await verifyTokenRequest()
        const userLoginInfo = res.userLoginInfo

        if (userLoginInfo) {
          handleAuthSuccess(userLoginInfo)
        } else {
          resetAuthState()
        }
      } catch (err) {
        if (err instanceof Error) {
          console.log(
            'Ha ocurrido un error al intentar autenticar el usuario:',
            err.message
          )
        }

        resetAuthState()
      } finally {
        setAuthIsLoading(false)
      }
    }

    checkLogin()
  }, [])

  const value: AuthContextProps = {
    user,
    signUp,
    signIn,
    logout,
    authIsLoading,
    isAuthenticated,
    error
  }

  return <AuthContext value={value}>{children}</AuthContext>
}

export default AuthProvider
