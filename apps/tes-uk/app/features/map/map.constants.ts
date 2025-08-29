import type { LayersConfig } from "react-hooks"
import { getFillExpression, getOpacityExpression } from "utils"
import {
  FACETS,
  DEFAULT_NEIGHBOURHOOD_LIKE_FACET,
  DEFAULT_LOCALITY_LIKE_FACET,
} from "app/features/facets/facets.constants"

/// Styles
export const MAX_FILL_OPACITY = 0.75
export const NEIGHBORHOOD_LIKE_LINE_COLOR = "#626262"
export const NEIGHBORHOOD_LIKE_HOVER_LINE_COLOR = "#4E4E4E"
export const NEIGHBORHOOD_LIKE_LINE_WIDTH = 0.8
export const NEIGHBORHOOD_LIKE_HOVER_LINE_WIDTH = 2.8
export const NEIGHBORHOOD_LIKE_SELECTED_LINE_COLOR = "#005351"
export const NEIGHBORHOOD_LIKE_SELECTED_LINE_WIDTH = 4

export const LOCALITY_LINE_COLOR = "#535353"
export const LOCALITY_LINE_WIDTH = 2.3

export const PEAT_LAYER_OPACITY = 0.4
export const URBAN_AREAS_LAYER_OPACITY = 0.15

///

export const UK_BBOX: [number, number, number, number] = [
  -23.374871, 47.930285, 16.000129, 59.533726,
]

export const LOCALITY_LIKE_ZOOM_LEVEL: number = 8
export const NEIGHBORHOOD_LIKE_ZOOM_LEVEL: number = 10
export const NEIGHBORHOOD_LIKE_SOURCE: LayerSource = "neighborhood_like"
export const LOCALITY_LIKE_SOURCE: LayerSource = "locality_like"
export const AGGREGATED_LOCALITY_LIKE_SOURCE: LayerSource = "aggregated_locality_like"
export const PEAT_SOURCE = "peat"
export const URBAN_AREAS_SOURCE = "urban_area"
export const NEIGHBORHOOD_LIKE_LAYER: MapLayer = "neighborhood_like-fill"
export const NEIGHBORHOOD_LIKE_LINE_LAYER: MapLayer = "neighborhood_like-line"
export const LOCALITY_LIKE_LAYER: MapLayer = "locality_like-fill"
export const LOCALITY_LIKE_LINE_LAYER: MapLayer = "locality_like-line"
export const AGGREGATED_LOCALITY_LIKE_LAYER: MapLayer = "aggregated_locality_like-fill"
export const DATA_LAYERS: MapLayer[] = [
  AGGREGATED_LOCALITY_LIKE_LAYER,
  NEIGHBORHOOD_LIKE_LAYER,
  LOCALITY_LIKE_LAYER,
]
export type BaseLayer = typeof PEAT_SOURCE | typeof URBAN_AREAS_SOURCE
export type BaseLayerConfig = {
  id: BaseLayer
  title: string
  opacity: number
  dataSource: string
  explanation: string
}
export const LOCALITY_ZOOM_LEVEL = 8
export const NEIGHBORHOOD_ZOOM_LEVEL = 10

export const LAYERS_SOURCES = [
  NEIGHBORHOOD_LIKE_SOURCE,
  LOCALITY_LIKE_SOURCE,
  AGGREGATED_LOCALITY_LIKE_SOURCE,
  PEAT_SOURCE,
  URBAN_AREAS_SOURCE,
]

export const ZOOM_LAYERS_STEPS = [
  { id: AGGREGATED_LOCALITY_LIKE_LAYER, nextStep: LOCALITY_ZOOM_LEVEL },
  { id: LOCALITY_LIKE_LAYER, nextStep: NEIGHBORHOOD_ZOOM_LEVEL },
]

export const BASE_LAYERS: BaseLayerConfig[] = [
  {
    id: PEAT_SOURCE,
    title: "peat",
    opacity: PEAT_LAYER_OPACITY,
    explanation: `The U.K. has nearly 3 million hectares of peatland habitat and is one of the world's 
    top ten countries for peatland area. Peat soils store 3.2 billion tonnes of carbon and 
    can support a range of unique open and wooded habitats and wildlife. Trees on 
    peaty soils can result in net ecosystem carbon loss through a range of soil-plant-
    atmosphere interactions such as drying out of peat and oxidation of organic matter. 
    In northern England, Northern Ireland and Scotland peatland habitats occurr both in 
    remote areas and near major population centres covered by Tree Equity Score. The 
    peat layer can assist users to avoid targeting areas of peatland for tree planting 
    efforts.`,
    dataSource: `British Geological Survey, Cranfield University (NSRI), Ordnance 
    Survey, Natural England Open Data (2021); Welsh Government, DataMapWales 
    (2022); Scottish Natural Heritage, NatureScor Maps (2016); Northern Ireland 
    Peatland Survey (1988).`,
  },
  {
    id: URBAN_AREAS_SOURCE,
    title: "urban areas",
    opacity: URBAN_AREAS_LAYER_OPACITY,
    explanation: `Tree Equity Scores are calculated solely for the urbanized areas within 
    neighbourhoods for the purpose of guiding urban forestry work. The score excludes 
    peripheral areas characterized by agriculture as well as non-forested or other 
    natural land covers that would not be targeted in an urban forestry program.`,
    dataSource: `Urban boundaries were determined using urban classifications for 
    LSOAs, SOAs, and Data Zones overlaid on built-up area classifications from the 
    NERC EDS Environmental Information Data Centre Land Cover Map 2021.`,
  },
]
export type MapLayer =
  | "neighborhood_like-fill"
  | "locality_like-fill"
  | "aggregated_locality_like-fill"
  | "neighborhood_like-line"
  | "locality_like-line"

export type LayerSource = "neighborhood_like" | "locality_like" | "aggregated_locality_like"
export const LAYERS_GENERATORS: LayersConfig["layers"] = [
  {
    id: AGGREGATED_LOCALITY_LIKE_LAYER,
    source: AGGREGATED_LOCALITY_LIKE_SOURCE,
    type: "fill",
    paint: { "fill-color": "#33966D" },
    clickable: false,
    hoverable: true,
    minzoom: 0,
    maxzoom: 7,
  },
  {
    id: LOCALITY_LIKE_LAYER,
    source: LOCALITY_LIKE_SOURCE,
    type: "fill",
    paint: {
      "fill-color": getFillExpression(FACETS.find((f) => f.attr === DEFAULT_LOCALITY_LIKE_FACET)!),
      "fill-opacity": getOpacityExpression(
        FACETS.find((f) => f.attr === DEFAULT_LOCALITY_LIKE_FACET)!,
      ),
    },
    clickable: false,
    hoverable: true,
    maxzoom: 10,
    minzoom: 8,
  },
  {
    id: NEIGHBORHOOD_LIKE_LAYER,
    source: NEIGHBORHOOD_LIKE_SOURCE,
    type: "fill",
    paint: {
      "fill-color": getFillExpression(
        FACETS.find((f) => f.attr === DEFAULT_NEIGHBOURHOOD_LIKE_FACET)!,
      ),
      "fill-opacity": getOpacityExpression(
        FACETS.find((f) => f.attr === DEFAULT_NEIGHBOURHOOD_LIKE_FACET)!,
      ),
    },
    clickable: true,
    hoverable: true,
  },
  {
    id: NEIGHBORHOOD_LIKE_LINE_LAYER,
    source: "neighborhood_like",
    type: "line",
    paint: {
      "line-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        NEIGHBORHOOD_LIKE_HOVER_LINE_COLOR,
        ["boolean", ["feature-state", "selected"], false],
        NEIGHBORHOOD_LIKE_SELECTED_LINE_COLOR,
        NEIGHBORHOOD_LIKE_LINE_COLOR,
      ],
      "line-width": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        NEIGHBORHOOD_LIKE_HOVER_LINE_WIDTH,
        ["boolean", ["feature-state", "selected"], false],
        NEIGHBORHOOD_LIKE_SELECTED_LINE_WIDTH,
        NEIGHBORHOOD_LIKE_LINE_WIDTH,
      ],
    },
    clickable: false,
    hoverable: false,
  },
  {
    id: LOCALITY_LIKE_LINE_LAYER,
    source: "locality_like",
    type: "line",
    paint: {
      "line-color": LOCALITY_LINE_COLOR,
      "line-width": LOCALITY_LINE_WIDTH,
    },
    clickable: false,
    hoverable: false,
    maxzoom: 20,
    minzoom: 8,
  },
  {
    id: PEAT_SOURCE,
    source: PEAT_SOURCE,
    layout: {
      visibility: "none",
    },
    type: "fill",
    paint: {
      "fill-color": "#827671",
      "fill-opacity": PEAT_LAYER_OPACITY,
    },
    clickable: false,
    hoverable: false,
  },
  {
    id: URBAN_AREAS_SOURCE,
    source: URBAN_AREAS_SOURCE,
    layout: {
      visibility: "none",
    },
    type: "fill",
    paint: {
      "fill-color": "#35374A",
      "fill-opacity": URBAN_AREAS_LAYER_OPACITY,
    },
    clickable: false,
    hoverable: false,
  },
]
