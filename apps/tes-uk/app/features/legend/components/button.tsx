import type { ForwardRefExoticComponent, RefAttributes } from "react"
import type { IconProps } from "@radix-ui/react-icons/dist/types"
import { twMerge } from "tailwind-merge"

export const Button = ({
  onClick,
  label,
  Icon,
  SecondaryIcon,
  className,
  active,
}: {
  label: string
  active?: boolean
  onClick: () => void
  className?: string
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
  SecondaryIcon?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>> | undefined
}) => {
  const buttonCX =
    "py-1.5 px-6 text-xs justify-between inline-flex space-between items-center gap-x-2 whitespace-nowrap rounded-full transition-all shadow-none hover:shadow-lg border border-brand-green bg-white text-brand-green-dark hover:bg-brand-green hover:text-white"
  const activeButtonCx = active ? "bg-brand-green-dark text-white" : ""
  return (
    <button className={twMerge(buttonCX, activeButtonCx, className)} onClick={onClick}>
      <Icon />
      <span className="capitalize">{label}</span>
      {SecondaryIcon && <SecondaryIcon />}
    </button>
  )
}
