import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

interface TimeSelectProps {
  value: string
  onTimeChange: (timeValue: string) => void
}

const TimeSelect: React.FC<TimeSelectProps> = ({ onTimeChange, value }) => {
  // Genera horarios desde 16:00 hasta 21:30 en intervalos de 15 minutos
  const times: string[] = []

  for (let h = 16; h <= 21; h++) {
    for (const m of [0, 15, 30, 45]) {
      if (h === 21 && m > 30) break

      const hour = h.toString().padStart(2, '0')
      const minute = m.toString().padStart(2, '0')
      times.push(`${hour}:${minute}`)
    }
  }

  const handleOnValueChange = (timeValue: string): void =>
    onTimeChange(timeValue)

  return (
    <Select value={value} onValueChange={handleOnValueChange}>
      <SelectTrigger className="w-full bg-white text-base">
        <SelectValue placeholder="00:00" />
      </SelectTrigger>
      <SelectContent className="max-h-52">
        {times.map((time) => (
          <SelectItem key={time} value={time}>
            {time}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default TimeSelect
