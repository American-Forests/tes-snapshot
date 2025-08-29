import { twMerge } from "tailwind-merge"

export default function HeaderItem({
  stop,
  isHovered,
  isHovering,
}: {
  stop: string
  isHovered: boolean
  isHovering: boolean
}) {
  return (
    <div
      className={twMerge(
        "-mb-2 flex w-14 -rotate-90 items-center justify-start place-self-center text-annotation font-bold text-[#005251] transition-all duration-150 ease-in-out sm:rotate-0 sm:justify-center sm:pl-0 sm:pt-12 md:text-caption",
        isHovered && "text-[0.8rem] font-bold md:text-[1rem]",
        isHovering && !isHovered && "opacity-20"
      )}
    >
      {stop}
    </div>
  )
}
