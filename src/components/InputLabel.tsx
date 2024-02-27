export default function InputLabel({ label, name }: IInputLabel) {
  return (
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
  )
}

interface IInputLabel {
  label: string
  name: string
}