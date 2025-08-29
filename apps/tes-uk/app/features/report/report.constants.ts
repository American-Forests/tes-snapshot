import type { NeighborhoodLike, iTree } from "@prisma/client"
import { RouteUrlObject } from "blitz"
import { group, groupByQuantiles } from "utils"

export const CONSTITUENCY_REPORT_TYPE = "CONSTITUENCY"
export const COUNTRY_REPORT_TYPE = "COUNTRY"
export const LOCALITY_REPORT_TYPE = "LOCALITY"

export type REPORT_TYPE = "CONSTITUENCY" | "COUNTRY" | "LOCALITY"
export const REPORT_TYPES: Record<REPORT_TYPE, REPORT_TYPE> = {
  [CONSTITUENCY_REPORT_TYPE]: CONSTITUENCY_REPORT_TYPE,
  [COUNTRY_REPORT_TYPE]: COUNTRY_REPORT_TYPE,
  [LOCALITY_REPORT_TYPE]: LOCALITY_REPORT_TYPE,
}

export type MapClickReportOption = {
  name: string
  type: string
  typeName: REPORT_TYPE
  href: RouteUrlObject
}

export const REPORT_TYPE_TITLES = {
  CONSTITUENCY: "Constituency",
  LOCALITY: "Local Authority",
  COUNTRY: "Country",
}

export const REPORT_TYPE_SCORES = {
  CONSTITUENCY: "DONT SHOW",
  COUNTRY: "DONT SHOW",
  LOCALITY: "Local Authority",
}

export const PRINT_BLOCK = "print:w-full print:py-4 print:px-10"
export const ECOSYSTEM_BENEFITS_LIST: (keyof iTree)[] = [
  "total_ecosystem_service_value",
  "carbon",
  "no2",
  "so2",
  "pm25",
  "runoff_avoided",
]
export type TESChartRange = { label: { priority: string }, fill: string }

const TES_THRESHOLDS = [0, 70, 80, 90, 100, 101]
const TES_CHART_RANGES: TESChartRange[] = [
  {
    label: {
      priority: "highest",
    },
    fill: "#F99D3E",
  },
  {
    label: {
      priority: "high",
    },
    fill: "#9FB576",
  },
  {
    label: {
      priority: "moderate",
    },
    fill: "#88BB84",
  },
  {
    label: {
      priority: "low",
    },
    fill: "#7ABE8D",
  },
  {
    label: {
      priority: "none",
    },
    fill: "#6CC296",
  },
]

export const TES_CHART = {
  thresholds: TES_THRESHOLDS,
  ranges: TES_CHART_RANGES,
}

// TREE CANOPY CHART DATA
// ---

export type TreeCanopyChartTemplate = {
  label: string
  attr: keyof NeighborhoodLike
  help: (type: string) => string
  bars: {
    fill: string
    thresholds: number[]
    groupFunc: <T>(
      thresholds: Array<number>,
      items: Array<T>,
      getter: (o: T) => number
    ) => Array<Array<T>>
    labels: string[]
    edgeLabels?: string[]
  }
}

export const SUMMARY_TOOLTIPS = {
  income_rank: (locationName: string) =>
    `From each country's Indices of Multiple Deprivation (IMD), each neighbourhood in ${locationName} is assigned a rank reflecting its relative deprivation in its country based on several indicators of income, measured as a rank with 1 being the most deprived and larger numbers being the least deprived. The mean and range of all neighbourhood ranks provide a snapshot of how ${locationName} fares, as a whole, relative to the country. England ranks 32,844 LSOAs, Wales 1,909 LSOAs, Scotland 6,976 Data Zones, and Northern Ireland 890 SOAs.`,
  employment_rank: (locationName: string) =>
    `From each country's Indices of Multiple Deprivation (IMD), each neighbourhood in ${locationName} is assigned a rank reflecting its relative deprivation in its country based on several indicators of employment, measured as a rank with 1 being the most deprived and larger numbers being the least deprived. The mean and range of all neighbourhood ranks provide a snapshot of how ${locationName} fares, as a whole, relative to the country.`,
  health_rank: (locationName: string) =>
    `From each country's Indices of Multiple Deprivation (IMD), each neighbourhood in ${locationName} is assigned a rank reflecting its relative deprivation in its country based on several indicators of health, measured as a rank with 1 being the most deprived and larger numbers being the least deprived. The mean and range of all neighbourhood ranks provide a snapshot of how ${locationName} fares, as a whole, relative to the country.`,
  temperature_difference: (locationName: string) =>
    `Heat disparity is a measure that compares average neighbourhood heat extremity with the local authority average to measure variance in heat severity across neighbourhoods. The average heat disparity provides a snapshot of how ${locationName} fares, as a whole, relative to the country.`,
}

export const TREE_CANOPY_CHARTS: Map<keyof NeighborhoodLike, TreeCanopyChartTemplate> = new Map(
  [
    {
      label: "Heat disparity",
      attr: "temperature_difference",
      help: (neighborhoodLikeType: string) =>
        `Heat disparity is measured by comparing average ${neighborhoodLikeType} heat extremity with the local authority to measure variance in heat severity across the country.`,
      bars: {
        fill: "#33966D",
        thresholds: [-2, 0, 2, 4, 2000], // picking a large number for the last threshold so that it's effectively >10
        groupFunc: group,
        labels: ["< -2°", "-2 to 0°", "0 to +2°", "+2 to +4°", "> +4°C"],
      },
    },
    {
      label: "Air pollution index",
      attr: "air_pollution",
      help: () =>
        "Index of air pollution in micrograms/cubic meter, where PM 2.5 and NO2 emissions were normalized independently by country, then averaged to create an index from 0 to 1.",
      bars: {
        fill: "#33966D",
        thresholds: [0.2, 0.4, 0.6, 0.8, 1],
        groupFunc: groupByQuantiles,
        labels: ["0-20th", "20-40th", "40-60th", "60-80th", "80-100th"],
        edgeLabels: ["least air pollution", "most air pollution"],
      },
    },
    {
      label: "Income ranking (IMD)",
      attr: "income_rank",
      help: () =>
        "Rank of Indices of Multiple Deprivation (IMD): Income Domain, where 1 is most deprived. Ranks were grouped by quintile for the location in this report where the lower the percentile, the more deprived.",
      bars: {
        fill: "#33966D",
        thresholds: [0.2, 0.4, 0.6, 0.8, 1],
        groupFunc: groupByQuantiles,
        labels: ["0-20th", "20-40th", "40-60th", "60-80th", "80-100th"],
        edgeLabels: ["most deprived", "least deprived"],
      },
    },
  ].map((chart) => [chart.attr, chart] as [keyof NeighborhoodLike, TreeCanopyChartTemplate])
)

export const TREE_CANOPY_CHART_OPTIONS = Array.from(TREE_CANOPY_CHARTS.keys())
export const DEFAULT_TARGET_SCORE = 75
