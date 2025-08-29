import { Blockgroup } from "@prisma/client"
import { ReportType } from "../report-finder/types"

export type PlanningCanopyScenario = "new" | "existing"

export type TopStatsProps = {
  blockgroups: Blockgroup[]
  canopyAcresNeeded: number
  totalEcosystemServiceValue: number
  treesNeeded: number
  existingTrees: number
  reportType: ReportType
  newCompositeLocalityScore: number
  numberLocalitiesImpacted: number
  totalPopulation: number
  planningTab: PlanningCanopyScenario
}

export type TopStatsData = {
  title: string
  items: {
    label: string
    value: string
    hint: string
  }[]
}
