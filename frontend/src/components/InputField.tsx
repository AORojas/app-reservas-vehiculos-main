import React from 'react'

interface InputFieldProps {
  label: string
  name: string
  type?: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false
}) => {
  return (
    <div className="relative w-full">
      <input
        name={name}
        type={type}
        placeholder=""
        value={value === 0 ? '' : value}
        onChange={onChange}
        className="peer w-full rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
        required={required}
      />
      <label className="pointer-events-none absolute -top-6 left-0 pl-2 text-base text-black/50 transition-all duration-200 peer-placeholder-shown:top-2.5 peer-focus:-top-6">
        {label}
      </label>
    </div>
  )
}

export default InputField
