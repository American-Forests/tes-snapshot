import { twMerge } from "tailwind-merge"
import { HelpTooltip } from "ui"

export const BenefitCard = ({
  label,
  value,
  unit,
  hint,
  border,
  compare,
}: {
  label: string
  value: string
  unit: string
  hint: string
  border?: boolean
  compare?: boolean
}) => {
  const cx = "flex flex-col items-center rounded-md relative w-full h-full"
  const borderedCardCX =
    "after:absolute after:bottom-0 after:w-3/4 after:h-[1px] after:bg-gray-300"
  const contentCX =
    "flex pt-4 pb-4 flex-col justify-center items-center relative"
  const titleCX = "text-center font-bold first-letter:capitalize"
  const valueCX = "text-headline"
  const unitCX = "text-subtitle font-thin"
  const tooltipCX = "text-gray-400 hover:text-black absolute right-2 bottom-2"

  return (
    <div className={twMerge(cx, border ? borderedCardCX : "")}>
      <div className={contentCX}>
        <p
          className={twMerge(titleCX, compare ? "text-[0.9rem]" : "text-body")}
        >
          {label.toLowerCase()}
        </p>
        <p className={valueCX}>{value}</p>
        <p className={unitCX}>{unit}</p>
      </div>
      {Boolean(hint) && (
        <HelpTooltip className={tooltipCX}>
          <span>{hint}</span>
        </HelpTooltip>
      )}
    </div>
  )
}
