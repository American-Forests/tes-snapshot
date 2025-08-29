import { Suspense } from "react"
import { SymbolIcon } from "@radix-ui/react-icons"
import type { Blockgroup } from "db"

import { TOOLTIP_CONTENT } from "app/features/dashboard/dashboard.constants"
import type { ReportType } from "app/features/report-finder/types"
import { BenefitsSection } from "./components"

export const Benefits = ({
  targetScore,
  blockgroups,
  className,
  colClassName,
  reportType,
  title,
}: {
  targetScore: number
  blockgroups: Blockgroup[]
  className?: string
  colClassName?: string
  reportType: ReportType
  title: string
}) => {
  const loadingCx = "p-2 flex items-center justify-center gap-x-2 py-4 text-gray-500"
  const tooltipContent = TOOLTIP_CONTENT

  return (
    <Suspense
      fallback={
        <div className={loadingCx}>
          <SymbolIcon />
          Loading…
        </div>
      }
    >
      <BenefitsSection
        className={className}
        colClassName={colClassName}
        targetScore={targetScore}
        blockgroups={blockgroups}
        benefitTooltipContent={tooltipContent}
        reportType={reportType}
        title={title}
      />
    </Suspense>
  )
}
