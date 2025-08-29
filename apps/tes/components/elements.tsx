import classed from "classed-components"
import clsx from "clsx"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

export const styledButton2 = ({
  variant = "primary",
  size = "sm",
}: {
  variant?: "primary" | "outline" | "orange" | "destructive-icon"
  size?: "sm" | "md" | "icon"
}) =>
  clsx([
    "inline-flex items-center gap-x-2 whitespace-nowrap",
    "rounded-full",
    "transition-all shadow-none hover:shadow-lg",
    {
      "py-2 px-6 text-md": size === "md",
      "py-1.5 px-6 text-xs": size === "sm",
    },
    {
      "uppercase bg-brand-green-dark text-white hover:bg-brand-green": variant === "primary",
      "uppercase bg-brand-orange hover:bg-brand-orange-dark text-white": variant === "orange",
      "border border-brand-green bg-white text-brand-green-dark hover:bg-brand-green hover:text-white":
        variant === "outline",
    },
  ])

export const A = classed.a(
  ({ variant = "link" }: { variant?: "link" | "link-in-list" | "button" | "quiet" }) => [
    "cursor-pointer transition-all",
    variant === "link"
      ? "text-brand-green-dark hover:underline"
      : variant === "quiet"
      ? "font-semibold text-sm text-gray-500 hover:underline"
      : variant === "link-in-list"
      ? "text-brand-green-dark hover:underline block"
      : "px-4 py-3 text-xs font-semibold text-white uppercase rounded-md bg-brand-green-dark",
  ],
)

export const H0 = classed.h1("text-3xl font-bold text-gray-700")
export const H1 = classed.h1("text-xl font-bold")
export const H2 = classed.h2("text-md font-bold")

export const Label = classed.label(
  ({ variant = "default" }: { variant: "default" | "noborder" }) => {
    return [
      "block",
      {
        "flex flex-col gap-y-1 text-gray-500": variant === "default",
        "p-2 uppercase text-xs flex flex-col gap-y-1 font-bold text-gray-500":
          variant === "noborder",
      },
    ]
  },
)
export const Input = classed.input(({ variant }: { variant: "default" | "noborder" }) => [
  "rounded-sm p-2 transition-all w-full",
  variant === "default" ? "border border-gray-300 focus:border-gray-500" : "border-none",
])

export const StyledDropdownMenuContent = classed(DropdownMenu.Content)(
  "bg-white rounded-md border border-gray-200 shadow-md rounded p-2 transition-all",
)

export const StyledDropdownMenuTrigger = classed(DropdownMenu.Trigger)(
  "px-3 py-1 lg:px-5 lg:py-2 text-xs lg:text-sm font-semibold uppercase flex items-center gap-x-1 text-brand-green-dark hover:text-brand-green-darker transition-all",
)
