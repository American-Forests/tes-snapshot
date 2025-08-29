import { useTranslation } from "react-i18next";
import type { Dispatch, SetStateAction } from "react"
import { twMerge } from "tailwind-merge"

export const ChartLabel = ({ priority, score }: { priority: string; score: string }) => {
  const cx = "flex flex-col items-center"
  const priorityCX = "uppercase text-brand-green-dark sm:text-caption text-[10px] font-semibold"
  const scoreCX = "sm:text-caption text-[10px] -mt-1"

  return (
    <div className={cx}>
      <p className={priorityCX}>{priority}</p>
      <p className={scoreCX}>{score}</p>
    </div>
  )
}
export type ChartOption = {
  label: string
  value: string
}

export type ChartSelectorProps = {
  options: ChartOption[]
  selectedChartOption: ChartOption
  setSelectedChartOption: Dispatch<SetStateAction<ChartOption>>
  help?: string
}

export const ChartSelector: React.FC<ChartSelectorProps> = ({
  options,
  selectedChartOption,
  setSelectedChartOption,
}) => {
  const { t } = useTranslation(["facets"])
  const selectCX =
    "focus:ring-0 focus:border-brand-green-dark border-gray-400/70 text-brand-green-darker text-base font-medium py-1.5 pl-4 pr-12 rounded-md  w-auto cursor-pointer"
  const labelCX = "hidden"
  const selectPrintCX = "print:hidden"
  const labelPrintCX = "print:inline"

  const optionMap = new Map(options.map((o) => [o.value, o]))

  return (
    <>
      <select
        onChange={(e) => setSelectedChartOption(optionMap.get(e.target.value)!)}
        className={twMerge(selectCX, selectPrintCX)}
      >
        {options.map((option, i) => (
          <option
            key={i}
            value={option.value}
            selected={option.value === selectedChartOption.value}
          >
            {t(`facets:${option.value}.name`)}
          </option>
        ))}
      </select>

      <span className={twMerge(labelCX, labelPrintCX)}>{selectedChartOption.label}</span>
    </>
  )
}
