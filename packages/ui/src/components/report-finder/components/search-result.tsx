import { Combobox } from "@headlessui/react"

export function SearchResult({
  value,
  key,
  children,
}: {
  value: string
  key: number
  children: React.ReactNode
}) {
  return (
    <Combobox.Option value={value} key={key} className="p-2 w-[300px]">
      {children}
    </Combobox.Option>
  )
}
