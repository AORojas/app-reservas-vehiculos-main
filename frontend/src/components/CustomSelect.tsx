import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import CancelMarkSvg from './svg-components/CancelMarkSvg'

type SelectItems = { key: string; value: string }[]

interface CustomSelectProps {
  selectedValue: string | undefined
  setSelectedValue: (value: string) => void
  selectItems: SelectItems
  cssClasses?: string
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  selectedValue,
  setSelectedValue,
  selectItems,
  cssClasses
}) => {
  const handleClearSelect = (): void => setSelectedValue('')

  return (
    <div className={`relative ${cssClasses}`}>
      <Select value={selectedValue} onValueChange={setSelectedValue}>
        <SelectTrigger className="w-full cursor-pointer bg-white text-base text-gray-900">
          <SelectValue placeholder="Seleccione lugar de entrega" />
        </SelectTrigger>
        <SelectContent>
          {selectItems.map((item) => (
            <SelectItem
              key={item.key}
              value={item.value}
              className="cursor-pointer"
            >
              {item.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedValue !== '' && selectedValue !== undefined && (
        <button
          className="absolute top-0 right-full z-1000 mt-0.5 mr-2 w-8 cursor-pointer rounded-full border border-gray-200 bg-white stroke-stone-300 transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-180 hover:bg-stone-800 hover:stroke-white"
          onClick={handleClearSelect}
        >
          <CancelMarkSvg />
        </button>
      )}
    </div>
  )
}

export default CustomSelect
