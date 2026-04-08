import { loginUser, registerUser, verifyTokenRequest } from '@/api/userApi'
import { AuthContext, type AuthContextProps } from '@/hooks/useAuthContext'
import type {
  EmailType,
  IUserInput,
  PasswordType,
  UserLoginInfo
} from '@/types/types'
import { useEffect, useState, type JSX, type ReactNode } from 'react'
import Cookies from 'js-cookie'

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<UserLoginInfo | null>(null)
  const [error, setError] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authIsLoading, setAuthIsLoading] = useState(true)

  const handleAuthSuccess = (userLoginInfo: UserLoginInfo | null): void => {
    setUser(userLoginInfo)
    setIsAuthenticated(true)
  }

  const signUp = async (signInUser: IUserInput): Promise<void> => {
    try {
      const res = await registerUser(signInUser)

      handleAuthSuccess(res.userLoginInfo)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        console.log('Error desconocido')
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
      console.log(err)
    }
  }

  const resetAuthState = (): void => {
    Cookies.remove('token')
    setIsAuthenticated(false)
    setUser(null)
  }

  const logout = (): void => resetAuthState()

  useEffect(() => {
    async function checkLogin(): Promise<void> {
      const cookies = Cookies.get()

      if (cookies.token === undefined) {
        resetAuthState()
        setAuthIsLoading(false)
        return
      }

      try {
        const res = await verifyTokenRequest()

        const userLoginInfo = res.userLoginInfo

        if (userLoginInfo) handleAuthSuccess(userLoginInfo)
      } catch (err) {
        if (err instanceof Error)
          console.log(
            'Ha ocurrido un error al intentar autenticar el usuario: ',
            err.message
          )

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
