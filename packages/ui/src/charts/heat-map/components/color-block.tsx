import { useCallback } from "react"
import { twMerge } from "tailwind-merge"

export default function ColorBlock({
  color,
  rowIndex,
  colIndex,
  isHovering,
  handleHover,
  isHovered,
}: {
  color: string
  rowIndex: number
  colIndex: number
  isHovering: boolean
  isHovered: boolean
  handleHover: (row: number | null, col: number | null) => void
}) {
  const handleMouseEnter = useCallback(() => {
    handleHover(rowIndex, colIndex)
  }, [rowIndex, colIndex, handleHover])
  const handleMouseLeave = () => handleHover(null, null)

  return (
    <div
      className={twMerge(
        "h-[38px] w-full cursor-pointer transition-opacity duration-200 ease-in-out place-self-center",
        color === "transparent" ? "pointer-events-none" : "",
        isHovered || !isHovering ? "opacity-100" : "opacity-20"
      )}
      // Using "style" because the color needs to be calculated
      // dynamically by d3 so we don't know the possible hex
      // values of the linear scale at build time.
      style={{
        backgroundColor: color,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  )
}
