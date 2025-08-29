import * as React from "react"
import { Routes } from "@blitzjs/next"
import type { NeighborhoodLike } from "@prisma/client"

import { useLocalStorage } from "react-hooks"

import { Header } from "./components"
import { Summary } from "./components"
import { EquityScore } from "./components"
import { ReportMap } from "./components"
import { COUNTRY_REPORT_TYPE, REPORT_TYPE } from "./report.constants"
import HelpWidget from "app/features/help-widget/help-widget"

export type ReportProps = {
  reportData: {
    meta: {
      name: string
      country?: string
      type: REPORT_TYPE
      tree_equity_score?: number
    }
    neighborhoods: NeighborhoodLike[]
  }
}

export const Report: React.FC<ReportProps> = ({ reportData }) => {
  const [mapBounds] = useLocalStorage<boolean>("mapBounds")

  const locationCountry = reportData.meta.country
  const locationName = reportData.meta.name
  const reportType = reportData.meta.type
  const reportTitle =
    reportType === COUNTRY_REPORT_TYPE ? locationName : `${locationName}, ${locationCountry}`
  return (
    <div>
      <Header
        reportType={reportType}
        closeRoute={{
          ...Routes.Map(),
          hash: mapBounds,
        }}
        reportTitle={reportTitle}
        score={reportData.meta.tree_equity_score ?? 0}
      />
      <Summary
        reportType={reportType}
        neighborhoods={reportData.neighborhoods}
        locationName={locationName}
      />
      <EquityScore neighborhoods={reportData.neighborhoods} />
      <ReportMap reportData={reportData} title={locationName} />
      <HelpWidget className="fixed bottom-4 left-4 z-10 text-xs leading-relaxed" />
    </div>
  )
}
