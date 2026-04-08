import * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

type SelectOption = {
  value: string
  label: React.ReactNode
  className?: string
}

type SelectContextValue = {
  value?: string
  onValueChange?: (value: string) => void
  options: SelectOption[]
  setOptions: React.Dispatch<React.SetStateAction<SelectOption[]>>
}

const SelectContext = React.createContext<SelectContextValue | null>(null)

function useSelectContext(componentName: string): SelectContextValue {
  const context = React.useContext(SelectContext)

  if (!context) {
    throw new Error(`${componentName} must be used within Select`)
  }

  return context
}

function Select({
  value,
  onValueChange,
  children
}: {
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}) {
  const [options, setOptions] = React.useState<SelectOption[]>([])

  return (
    <SelectContext.Provider value={{ value, onValueChange, options, setOptions }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  )
}

function SelectGroup({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

function SelectValue({ placeholder }: { placeholder?: string }) {
  return <span data-placeholder={placeholder ?? ''} />
}

function SelectTrigger({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const { value, onValueChange, options } = useSelectContext('SelectTrigger')

  const placeholder = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === SelectValue
  ) as React.ReactElement<{ placeholder?: string }> | undefined

  const resolvedValue = value ?? ''

  return (
    <div className="relative">
      <select
        className={cn(
          'border-input focus-visible:border-ring focus-visible:ring-ring/50 flex h-9 w-fit appearance-none items-center justify-between rounded-md border bg-transparent px-3 py-2 pr-10 text-sm whitespace-nowrap shadow-xs outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        value={resolvedValue}
        onChange={(event) => onValueChange?.(event.target.value)}
        {...props}
      >
        {placeholder?.props.placeholder ? (
          <option value="" disabled>
            {placeholder.props.placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 opacity-50" />
    </div>
  )
}

function SelectContent({
  children
}: {
  children?: React.ReactNode
  className?: string
}) {
  const { setOptions } = useSelectContext('SelectContent')

  React.useEffect(() => {
    const nextOptions = React.Children.toArray(children).flatMap((child) => {
      if (!React.isValidElement(child)) return []

      const props = child.props as { value?: string; children?: React.ReactNode; className?: string }

      if (!props.value) return []

      return [
        {
          value: props.value,
          label: props.children,
          className: props.className
        }
      ]
    })

    setOptions(nextOptions)

    return () => setOptions([])
  }, [children, setOptions])

  return null
}

function SelectLabel({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

function SelectItem({
  value,
  children
}: {
  value: string
  children: React.ReactNode
  className?: string
}) {
  return <span data-value={value}>{children}</span>
}

function SelectSeparator() {
  return null
}

function SelectScrollUpButton() {
  return null
}

function SelectScrollDownButton() {
  return null
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue
}
