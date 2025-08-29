import { twMerge } from "tailwind-merge"
import { useTranslation } from "react-i18next"

export default function CategoryName({
  categoryName,
  rowIndex,
  isHovered,
  isHovering,
  length,
  manuallyHyphenatedElement,
}: {
  categoryName: string
  rowIndex: number
  isHovered: boolean
  isHovering: boolean
  length: number
  manuallyHyphenatedElement?: JSX.Element
}) {
  const {t} = useTranslation(["facets"])
  return (
    <div
      className={twMerge(
        "z-10 col-start-1 col-end-3 flex h-[26px] items-center justify-end text-right self-center transition-all duration-200 ease-in-out text-annotation md:text-xs 2xl:text-sm leading-none md:leading-none 2xl:leading-none lg:pr-3",
        isHovered && "text-annotation font-bold sm:text-[1rem]",
        isHovering && !isHovered && "opacity-20",
        (rowIndex === 0 || rowIndex === length - 1) && "mb-16" // to add margin to first and previous to last row
      )}
    >
      <p
        className={twMerge(
          "font-semibold hyphens-auto text-[#5A5A5A] text-right",
          (rowIndex === 0 || rowIndex === length - 1) && "-mb-16", // center the categoryName on those rows as well
          manuallyHyphenatedElement && "hyphens-manual"
        )}
      >
        {manuallyHyphenatedElement ? manuallyHyphenatedElement : t(`facets:${categoryName}.name`)}
      </p>
    </div>
  )
}
