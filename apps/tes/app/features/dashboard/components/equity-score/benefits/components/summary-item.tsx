import { HelpTooltip } from "ui"

export const BenefitsSummaryItem = ({
  className,
  label,
  value,
  hint,
}: {
  className: string
  label: string
  value: string
  hint?: string
}) => {
  const titleCX = "text-gray-700 font-bold mb-2 text-center leading-none w-4/5"
  const hintCX = "text-sm font-medium leading-snug pb-4"
  const valueCX = "text-brand-green-dark text-3xl font-bold"

  const labelPrintCX = "text-sm"
  return (
    <div className={className}>
      <div className={titleCX}>
        <span className={labelPrintCX}>{label}</span>
        {hint && (
          <HelpTooltip className="ml-1">
            <span className={hintCX}>{hint}</span>
          </HelpTooltip>
        )}
      </div>
      <p className={valueCX}>{value}</p>
    </div>
  )
}
