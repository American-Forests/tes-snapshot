import { Blockgroup, Area, Municipality } from "db"
import {
  BLOCKGROUP_LEVEL_NAME,
  BlockgroupWithSupplemental,
  MUNICIPALITY_LEVEL_NAME,
} from "app/constants"
import { SetRequired } from "type-fest"
import { formatNumber } from "utils"

export type rangeChoice = {
  type: "rangeChoice"
  value: { label: string; range: number[] }[]
}

export type range = {
  type: "range"
  value: [number, number]
  gradient: number[]
  step: number
  formatter?: DataFormatter
}

export type bool = {
  type: "boolean"
}

export type enumerate = {
  type: "enum"
  values: (string | number)[]
}

export type Facet = {
  title: string
  field:
    | {
        type: typeof BLOCKGROUP_LEVEL_NAME
        field: keyof Blockgroup
      }
    | {
        type: "Area"
        field: keyof Area
      }
    | {
        type: typeof MUNICIPALITY_LEVEL_NAME
        field: keyof Municipality
      }
  data: range | enumerate | rangeChoice | bool
  group: FacetGroup
  formatter: Formatter
  style?: FacetStyle
  priorityIndex?: number
  explanation?: string
  source?: string
  hideFromFilters?: boolean
  sublayers?: Facet[]
}

export type FacetGroup = {
  title: string
}

export const treeEquityScore: FacetGroup = {
  title: "",
}

export const treeCanopy: FacetGroup = {
  title: "map:legend.tree_canopy",
}

export const priorityIndicators: FacetGroup = {
  title: "map:legend.priority_indicators",
}

export const environmentalIndicators: FacetGroup = {
  title: "map:legend.environmental_indicators",
}

export const hide: FacetGroup = {
  title: "Hide",
}

export const facetGroups = [
  treeEquityScore,
  treeCanopy,
  priorityIndicators,
  environmentalIndicators,
  hide,
]

export const PRIORITY_INDICATORS: (keyof Blockgroup | keyof Area)[] = [
  "equity_index",
  "dependent_ratio",
  "poc_percent",
  "unemployment_rate",
  "poverty_percent",
  "temperature",
  "health_normalized",
  "linguistic_isolation",
]

export const TREE_CANOPY: (keyof Blockgroup | keyof Area)[] = [
  "tree_canopy",
  "potential_tree_canopy",
  "tree_canopy_gap",
  "impervious_surface",
]

export const AIR_TEMPERATURE: (keyof BlockgroupWithSupplemental | keyof Area)[] = [
  "afternoon_air_average_temperature",
  "evening_air_average_temperature",
]

export const PERCENTAGE: (keyof BlockgroupWithSupplemental | keyof Area)[] = [
  "poverty_percent",
  "poc_percent",
  "unemployment_rate",
  "tree_canopy",
  "potential_tree_canopy",
  "tree_canopy_gap",
  "impervious_surface",
  "linguistic_isolation",
  "dependent_ratio",
  "canopy_change_percent",
  "total_shade12",
  "total_shade15",
  "total_shade18",
]

export const PROPORTION: (keyof BlockgroupWithSupplemental | keyof Area)[] = ["equity_index"]

export type Formatter = (arg0: number) => string

export const percentage = (val: number) => `${formatNumber(val * 100, 0, "en-us")}%`
export const floorPercentage = (val: number) =>
  `${formatNumber(Math.floor(val * 100), 0, "en-us")}%`
export const proportion = (val: number) => `${formatNumber(val, 2, "en-us")}`
export const x100 = (val: number) => `${formatNumber(val * 100, 0, "en-us")}`
export const floor = (val: number) => `${Math.floor(val)}`
export const temp = (val: number) => `${formatNumber(val, 0, "en-us")}°`
export const tempDiff = (val: number, locale: string | undefined) =>
  `${val > 0 ? "+" : ""}${Math.floor(val * 10) / 10}°${locale && locale === "en-CA" ? "C" : "F"}`
export const identity = (val: number) => `${val}`

export type FacetStyle = {
  fill: string[]
  opacity?: number[]
}

/** styles */
export const priorityIndicatorStyle: FacetStyle = {
  fill: ["#FFFFFF", "#007185"],
  opacity: [0.5, 1],
}

export const shadeStyle: FacetStyle = {
  fill: ["#F6D0B1", "#c2cad4", "#8b929e", "#3D485B"],
  opacity: [1, 1, 1, 1],
}

export const treeEquityScoreStyle: FacetStyle = {
  fill: ["#F99D3E", "#6CC396"],
  opacity: [1, 1],
}

export const treeCanopyStyle: FacetStyle = {
  fill: ["#FFFFFF", "#379C68"],
  opacity: [0.7, 1],
}

export const treeCanopyGapStyle: FacetStyle = {
  fill: ["#FFFFFF", "#F9A650"],
  opacity: [0.7, 1],
}

export const surfaceTemperatureStyle: FacetStyle = {
  fill: ["#CEE4ED", "#FFF", "#F54625", "#DB2400", "#A00E0D"],
  opacity: [0.7, 0.4, 0.9, 0.9, 0.9],
}

export const airTemperatureStyle: FacetStyle = {
  fill: ["#FFFFFF", "#FFE6E9", "#F54625", "#DB2400"],
  opacity: [0.5, 0.9, 0.9, 0.9],
}

export const airPollutionStyle: FacetStyle = {
  fill: ["#F3F3EB", "#C1C1AB", "#777700", "#6B6A30", "#524D11"],
  opacity: [0.3, 0.5, 0.55, 0.8, 0.95],
}

export const potentialTreeCanopyStyle: FacetStyle = {
  fill: ["#FFFFFF", "#F9A650"],
  opacity: [0.7, 1],
}

export const ejStyle: FacetStyle = {
  fill: ["#55FF00", "#FFD400", "#E600A9", "#4C7300", "#2F2DBA"],
  opacity: [0.7],
}

export const imperviousSurfaceAreaStyle: FacetStyle = {
  fill: ["#FFFFFF", "#C9C7C0", "#5F5B4E"],
  opacity: [0.5, 0.5, 1],
}

export const imperviousSurfaceBlockgroupStyle: FacetStyle = {
  fill: ["#C9C7C0", "#5F5B4E"],
  opacity: [0.5, 1],
}

export const redliningStyle: FacetStyle = {
  fill: ["#6CC296", "#386cb0", "#ffff99", "#ee261e", "#e6b8ff"],
}

export const climateHealthRiskStyle: FacetStyle = {
  fill: ["#6CC296", "#f99d3e", "brown", "#FFFFFF"],
  opacity: [1, 1, 1, 0],
}

export const canopyChangePercentStyle: FacetStyle = {
  fill: ["#4C0073", "#4C0073", "#FFFFFF", "#3BAD72", "#3BAD72"],
  opacity: [1, 1, 0.7, 1, 1],
}

export const neighborhoodScoreCategoryStyle: FacetStyle = {
  fill: ["#F99F3A", "#D6A755", "#A0B776", "#81BE8A", "#6BC396"],
  opacity: [1, 1, 1, 1, 1],
}

export const ttfTreePlantingPriorityStyle: FacetStyle = {
  fill: ["#DE577B", "#E5A47F", "#E8C898", "#B8E0DB", "#ECF4F4"],
  opacity: [0.9, 0.9, 0.8, 0.5, 0.5],
}

export type PriorityFacet = SetRequired<Facet, "priorityIndex">

export type DataFormatter = {
  dataToLabel: (arg0: number) => number
  labelToData: (arg0: number) => number
}

export const prop2perc: DataFormatter = {
  dataToLabel: (x) => Math.round(x * 100),
  labelToData: (x) => x / 100,
}

export const prop: DataFormatter = {
  dataToLabel: (x) => Math.round(x * 100) / 100,
  labelToData: (x) => x,
}

export const tempDataFormatter: DataFormatter = {
  dataToLabel: (x) => Math.floor(x),
  labelToData: (x) => x,
}

export const identityDataFormatter: DataFormatter = {
  dataToLabel: (x) => x,
  labelToData: (x) => x,
}

export const getPriorityFacets = (facets: Facet[]): Facet[] =>
  facets
    .flatMap((facet) => (facet.priorityIndex !== undefined ? [facet as PriorityFacet] : []))
    .sort((a, b) => b.priorityIndex - a.priorityIndex)
