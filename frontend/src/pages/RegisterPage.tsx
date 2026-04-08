import { type JSX } from 'react'
import RegisterForm from '../components/user/RegisterForm'

export default function RegisterPage(): JSX.Element {
  return (
    <div className="w-fulld flex h-full items-center justify-center px-16 py-8">
      <RegisterForm />
    </div>
  )
}
