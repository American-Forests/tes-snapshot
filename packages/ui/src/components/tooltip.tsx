'use client'
import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react"
import type { ReactNode } from "react"
import {
  Provider,
  Root,
  Trigger,
  Arrow,
  Content,
} from "@radix-ui/react-tooltip"
import { twMerge } from "tailwind-merge"

const TooltipProvider = Provider

const TooltipRoot = Root

const TooltipTrigger = Trigger

const TooltipContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, side = "bottom", sideOffset = -10, ...props }, ref) => (
  <Content
    ref={ref}
    sideOffset={sideOffset}
    side={side}
    className={twMerge(
      "flex w-60 items-center justify-center rounded-[16px] border-none bg-brand-green-darker text-neutral-50 bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 overflow-hidden rounded-md border px-3 py-1.5 text-sm shadow-md",
      className ? className : ""
    )}
    {...props}
  />
))

TooltipContent.displayName = Content.displayName

const Tooltip = ({
  sideOffset,
  side,
  children,
  className,
  withArrow = true,
  arrowColor = "#005251",
}: {
  sideOffset?: number
  side?: "top" | "right" | "bottom" | "left" | undefined
  className?: string
  withArrow?: boolean
  arrowColor?: string
  children: ReactNode
}) => (
  <TooltipContent className={className} sideOffset={sideOffset} side={side}>
    <>
      {withArrow && <Arrow width={30} height={13} fill={arrowColor} />}
      {children}
    </>
  </TooltipContent>
)

export { Tooltip, TooltipRoot, TooltipTrigger, TooltipProvider }
