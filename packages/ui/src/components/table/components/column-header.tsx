import { TooltipProvider, Tooltip, TooltipTrigger, TooltipRoot } from "ui"

import { twMerge } from "tailwind-merge"

export function TableHeader({
  header,
  toolTipContent,
  className,
}: {
  header: string
  toolTipContent?: string
  className?: string
}) {
  return toolTipContent ? (
    <TooltipProvider>
      <TooltipRoot>
        <TooltipTrigger
          className={twMerge("z-10 cursor-default flex", className)}
        >
          <div
            className={twMerge(
              "relative overflow-visible text-annotation font-medium leading-tight w-4/5 m-auto",
              toolTipContent &&
                "cursor-pointer underline decoration-neutral-500 decoration-dotted"
            )}
          >
            <span className="w-full">{header.toUpperCase()}</span>
            <Tooltip
              side="top"
              className="w-52 bg-white text-xs"
              sideOffset={5}
              withArrow={false}
            >
              {toolTipContent}
            </Tooltip>
          </div>
        </TooltipTrigger>
      </TooltipRoot>
    </TooltipProvider>
  ) : (
    <div
      className={twMerge(
        "relative overflow-visible text-annotation w-full",
        className
      )}
    >
      <span className="w-full">{header.toUpperCase()}</span>
    </div>
  )
}
