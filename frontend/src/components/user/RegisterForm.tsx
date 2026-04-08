import { useAuthContext } from '@/hooks/useAuthContext'
import type { IUserInput } from '@/types/types'
import { useEffect, useState, type JSX } from 'react'
import { useNavigate } from 'react-router-dom'
import InputField from '../InputField'

const RegisterForm = (): JSX.Element => {
  const [formData, setFormData] = useState<IUserInput>({
    email: '',
    password: '',
    full_name: '',
    last_name: '',
    country: '',
    address: '',
    address_number: 0,
    phone_number: 0,
    fiscal_condition: '',
    document_type: '',
    document_number: 0
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { signUp, user } = useAuthContext()

  useEffect(() => {
    if (user === null) return

    setMessage(`Bienvenido ${user.full_name}, registro exitoso!`)
  }, [user])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target
    // La verificación en el name lo hace para guardar el valor numérico en el caso de que el input sea de tipo number (?)
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes('number') ? Number(value) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

    setLoading(true)

    try {
      signUp(formData)

      setFormData({
        email: '',
        password: '',
        full_name: '',
        last_name: '',
        country: '',
        address: '',
        address_number: 0,
        phone_number: 0,
        fiscal_condition: '',
        document_type: '',
        document_number: 0
      })

      setTimeout(() => {
        setMessage('')
        navigate('/inicio')
      }, 2000)
    } catch (err) {
      if (err instanceof Error) {
        setMessage('Error de conexión con el servidor')
      } else {
        setMessage('Error desconocido')
      }
      setTimeout(() => setMessage(''), 5000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-2">
        <h2 className="col-span-3 mb-4 text-left text-3xl font-bold text-amber-800">
          Registro de Usuario
        </h2>
        <div className="col-span-3 grid max-w-2xl grid-cols-2 gap-x-4 gap-y-8 [&_input]:h-11 [&_select]:h-11">
          <div className="col-span-2 grid w-full grid-cols-2 gap-2">
            <InputField
              label="Nombre completo"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required={true}
            />
            <InputField
              label="Apellido"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="col-span-2 grid grid-cols-3 gap-2">
            <InputField
              label="Provincia/Ciudad"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required={true}
            />
            <InputField
              label="Calle"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required={true}
            />
            <InputField
              label="Número de calle"
              name="address_number"
              type="number"
              value={
                formData.address_number === 0 ? '' : formData.address_number
              }
              onChange={handleChange}
              required={true}
            />
          </div>
          <InputField
            label="Teléfono"
            name="phone_number"
            type="number"
            value={formData.phone_number === 0 ? '' : formData.phone_number}
            onChange={handleChange}
            required={true}
          />
          <label htmlFor="fiscal_condition" className="sr-only">
            Condición fiscal
          </label>
          <select
            id="fiscal_condition"
            name="fiscal_condition"
            value={formData.fiscal_condition}
            onChange={handleChange}
            className="rounded-lg border pl-1 text-black/50 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          >
            <option value="" disabled>
              Condición fiscal
            </option>
            <option value="Responsable inscripto">Responsable inscripto</option>
            <option value="Autónomo">Autónomo</option>
            <option value="Monotributista">Monotributista</option>
            <option value="Exento">Exento</option>
            <option value="No alcanzado">No alcanzado</option>
          </select>

          <label htmlFor="document_type" className="sr-only">
            Tipo de documento
          </label>
          <select
            id="document_type"
            name="document_type"
            value={formData.document_type}
            onChange={handleChange}
            className="rounded-lg border pl-1 text-black/50 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          >
            <option value="" disabled>
              Tipo de documento
            </option>
            <option value="DNI">DNI</option>
            <option value="LE">LE</option>
            <option value="LC">LC</option>
          </select>
          <InputField
            label="Número de Documento"
            name="document_number"
            type="number"
            value={
              formData.document_number === 0 ? '' : formData.document_number
            }
            onChange={handleChange}
            required={true}
          />
          <InputField
            label="Correo"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required={true}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required={true}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="transition-color col-start-2 col-end-2 w-full cursor-pointer rounded-lg bg-amber-800 py-3 font-bold text-white duration-300 hover:bg-amber-900 disabled:bg-amber-400"
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
        {message && (
          <p className="col-span-3 mt-2 text-center font-medium text-green-600">
            {message}
          </p>
        )}
      </form>
    </section>
  )
}

export default RegisterForm
