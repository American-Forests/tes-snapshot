'use client'
import { IconProps } from "@radix-ui/react-icons/dist/types"
import React, {
  HTMLAttributes,
  FC,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react"

type ButtonVariants = "primary" | "secondary" | "rounded"

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  text?: string
  Icon?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
  variant?: ButtonVariants
}

const THEME = {
  primary:
    "text-white bg-brand-green hover:bg-brand-green-dark rounded-lg px-4 py-2",
  secondary:
    "text-brand-green bg-white border-brand-green border-2 hover:bg-brand-green hover:text-white rounded-lg px-4 py-2",
  rounded: "text-white bg-brand-green hover:bg-brand-green-dark rounded-full",
}

export const Button: FC<ButtonProps> = ({
  text,
  Icon,
  variant,
  className,
  ...props
}) => (
  <button
    {...props}
    className={`${
      variant ? THEME[variant] : ""
    } flex flex-row items-center align-center shadow w-fit transition duration-200 ease-in-out p-3 ${className}`}
  >
    {text && <p>{text}</p>}
    {Icon && <Icon />}
  </button>
)
