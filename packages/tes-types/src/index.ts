import type {
  FillLayer,
  LineLayer,
  LinePaint,
  FillPaint,
  Layer,
  MapboxGeoJSONFeature,
} from "mapbox-gl"
import mapboxgl from "mapbox-gl"
import { FormatterOptions } from "utils"

export interface TesLayer extends Layer {
  type: FillLayer["type"] | LineLayer["type"]
  paint: FillPaint | LinePaint
  source: string
  clickable?: boolean
  hoverable?: boolean
  filter?: mapboxgl.Expression
}

export type MapFeatureState = "selected" | "hover"

export type ColorValueHex = `#${string}`
export type FacetStyle = {
  // stops, fill, and opacity are all arrays of the same length
  // the stops are the points on the gradient where the color changes
  stops: number[]
  // the fill is the color of the gradient at each stop
  fill: ColorValueHex[]
  // the opacity is the opacity of the gradient at each stop
  opacity?: number[]
}
export type FacetData = {
  type: "range" | "enum" | "quantile" | "boolean"
  // the valid range of the data
  values: number[]
  // This will control the start and end points of the filters
  filterValues?: number[]
  // the values to be displayed on the ramp component
  rampLabels?: number[]
  // Wether ramp values are in reversed order
  reversedRamp?: boolean
  // the values to be displayed on the filter slider
  filterLabels?: number[]
  // Function that transform display values to values inside the filterable data range
  filterMapper?: (filterValue: number[] | string) => number[] | number
  // Function that transform filter values to UI values
  filterUnmapper?: (
    filterValue: number[] | number | undefined
  ) => number[] | undefined | string
  formatter?: (arg: number, options?: FormatterOptions) => string
  step?: number
  style?: FacetStyle
}

export type Facet = {
  layer: string
  layerName?: string
  attr: string
  tooltipAttribute?: string
  tooltipName?: string
  tooltipFormatter?: (arg: number, options?: Record<string, boolean>) => string
  getTooltipString?: (facet: Facet, feature: MapboxGeoJSONFeature) => string
  name: string
  data: FacetData
  isLayer: boolean
  isFilter: boolean
  source?: string
  explanation?: string
  category?: string
}

export type QueryExtentEnvelope = { extent: string }[]
export type QueryGeomEnvelope = { geom: string }[]
export type ErrorWithCode = { code: string }
