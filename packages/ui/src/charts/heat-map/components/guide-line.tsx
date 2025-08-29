import { twMerge } from "tailwind-merge"

export default function GuideLine({
  rowIndex,
  length,
  isHovered,
  isHovering,
}: {
  rowIndex: number
  length: number
  isHovered: boolean
  isHovering: boolean
}) {
  const ROW_HEIGHT_IN_PX = 41
  return (
    <div
      className={twMerge(
        "absolute left-[20.5%] z-0 mt-[98px] h-0.5 w-full max-w-[79%] bg-brand-gray opacity-100 transition-opacity duration-200 ease-in-out",
        rowIndex > 0 && "mt-[125px]", // These margins are to center the guideline to the first and last row
        rowIndex > length - 2 && "mt-[150px]",
        isHovering && !isHovered && "opacity-0"
      )}
      style={{ top: `calc(${rowIndex * ROW_HEIGHT_IN_PX}px)` }} // 41px is the height of the row. TODO Mode to const
    />
  )
}
