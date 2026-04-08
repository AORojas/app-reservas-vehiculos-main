import type {
  EmailType,
  IUserInput,
  PasswordType,
  UserLoginInfo
} from '@/types/types'
import { createContext, useContext } from 'react'

export interface AuthContextProps {
  user: UserLoginInfo | null
  signUp: (signiInUser: IUserInput) => Promise<void>
  signIn: (email: EmailType, password: PasswordType) => Promise<void>
  logout: () => void
  authIsLoading: boolean
  isAuthenticated: boolean
  error: string
}

export const AuthContext = createContext<AuthContextProps | null>(null)

export const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext)

  if (!context)
    throw new Error('useThemeContext must be used within an AuthProvider')

  return context
}
