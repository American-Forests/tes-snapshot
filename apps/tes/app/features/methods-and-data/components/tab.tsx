import { MouseEvent } from "react"

export const Tab = ({
    label,
    handleClick,
    isSelected,
  }: {
    label: string
    handleClick: (event: MouseEvent) => void
    isSelected: boolean
  }) => (
    <div className="relative">
      <button
        onClick={handleClick}
        className={`relative font-semibold uppercase tracking-wider h-12 md:px-4 px-2 text-black lg:text-base sm:text-sm text-xs focus:outline-none focus:ring focus:ring-brand-green ${
          isSelected ? "bg-brand-green-dark text-white focus:ring-transparent" : "bg-transparent"
        }`}
      >
        {label}
      </button>
      {isSelected && (
        <div className="absolute bg-brand-green-dark h-12 w-full bottom-triangle -bottom-[calc(3rem-1px)]" />
      )}
    </div>
  )
