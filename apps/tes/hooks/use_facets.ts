import type { City } from "app/features/regional-map/regional-map.types"
import myFacets from "data/processed_facet_schemas.json"
import {
  Facet,
  range,
  enumerate,
  rangeChoice,
  bool,
  treeEquityScore,
  treeCanopy,
  priorityIndicators,
  environmentalIndicators,
  hide,
  PRIORITY_INDICATORS,
  TREE_CANOPY,
  FacetGroup,
  Formatter,
  percentage,
  x100,
  floor,
  temp,
  identity,
  AIR_TEMPERATURE,
  PERCENTAGE,
  FacetStyle,
  priorityIndicatorStyle,
  potentialTreeCanopyStyle,
  treeEquityScoreStyle,
  treeCanopyGapStyle,
  treeCanopyStyle,
  surfaceTemperatureStyle,
  airTemperatureStyle,
  ejStyle,
  prop2perc,
  DataFormatter,
  imperviousSurfaceBlockgroupStyle,
  imperviousSurfaceAreaStyle,
  tempDataFormatter,
  identityDataFormatter,
  climateHealthRiskStyle,
  redliningStyle,
  tempDiff,
  PROPORTION,
  proportion,
  prop,
  airPollutionStyle,
  canopyChangePercentStyle,
  neighborhoodScoreCategoryStyle,
  ttfTreePlantingPriorityStyle,
  shadeStyle,
} from "data/facets"
import { Area, Blockgroup } from "db"
import { BLOCKGROUP_LEVEL_NAME, BlockgroupWithSupplemental, FACET_TITLES } from "app/constants"
import { facetsAtom, filtersAtom, getFilters } from "app/state"
import { useEffect, useState } from "react"
import { useSetAtom } from "jotai"
import { acresToSquareKilometers, squareMetersToSquareKilometers } from "utils"
import { env } from "lib/env"
import { groupShadeFacets } from "app/features/legend/legend.utils"

export type FacetSchema = {
  attr: keyof Blockgroup | keyof Area
  layer: "blockgroup" | "area"
  facet_type: "layer" | "layer_not_filterable" | "filter"
  data: rangeFacetSchema | enumFacetSchema | booleanFacetSchema
  explanation?: string
  source?: string
  location: string
}

type rangeFacetSchema = {
  type: "range"
  range: [number, number]
  gradient: number[]
}

type enumFacetSchema = {
  type: "enum"
  values: (string | number)[]
}

type booleanFacetSchema = {
  type: "boolean"
}

export function createFacet(facetSchema: FacetSchema, city?: City) {
  const { attr, layer, facet_type, data, explanation, source } = facetSchema
  const facet: Facet = {
    title:
      attr == "neighborhood" && city && city.id == "toronto"
        ? "Neighbourhood"
        : getTitle(attr, FACET_TITLES) || "",
    field: getField(attr, layer),
    data: getData(attr, data),
    group: getGroup(attr, facet_type),
    formatter: getFormatter(attr, city),
    style: getStyle(attr, layer),
    priorityIndex: getPriorityIndex(attr),
    explanation,
    source,
    hideFromFilters: facet_type == "layer_not_filterable" ? true : false,
  }
  return facet
}

function getTitle(
  attr: keyof BlockgroupWithSupplemental | keyof Area,
  titles: Map<keyof BlockgroupWithSupplemental | keyof Area, string>
) {
  if (titles.has(attr)) return titles.get(attr)
}

type BlockgroupField = {
  type: typeof BLOCKGROUP_LEVEL_NAME
  field: keyof Blockgroup
}

type AreaField = {
  type: "Area"
  field: keyof Area
}

function getField(
  attr: keyof Blockgroup | keyof Area,
  layer: "blockgroup" | "area"
): BlockgroupField | AreaField {
  if (layer == "blockgroup") return { type: BLOCKGROUP_LEVEL_NAME, field: attr as keyof Blockgroup }
  else return { type: "Area", field: attr as keyof Area }
}

function getData(
  attr: keyof Blockgroup | keyof Area,
  data: rangeFacetSchema | enumFacetSchema | booleanFacetSchema
): range | enumerate | bool | rangeChoice {
  if (data.type == "range") {
    const step = data.range[1] - data.range[0] <= 1 ? 0.01 : 1
    let dataRange
    if (step === 1) dataRange = [Math.floor(data.range[0]), Math.ceil(data.range[1])]
    else dataRange = [Math.floor(data.range[0] * 100) / 100, Math.ceil(data.range[1] * 100) / 100]
    return {
      type: data.type,
      value: dataRange as [number, number],
      gradient: data.gradient,
      step,
      formatter: getDataFormatter(attr),
    }
  } else if (data.type == "enum") {
    return {
      type: data.type,
      values: data.values,
    }
  } else {
    return {
      type: data.type,
    }
  }
}

function getGroup(
  attr: keyof Blockgroup | keyof Area,
  facet_type: "layer" | "layer_not_filterable" | "filter"
): FacetGroup {
  if (attr == "tree_equity_score") return treeEquityScore
  else if (TREE_CANOPY.includes(attr)) return treeCanopy
  else if (PRIORITY_INDICATORS.includes(attr)) return priorityIndicators
  else if (facet_type == "filter") return hide
  else return environmentalIndicators // should change to supplemental layers
}

function getFormatter(attr: keyof Blockgroup | keyof Area, city?: City): Formatter {
  if (AIR_TEMPERATURE.includes(attr)) return temp
  else if (attr == "temperature") return (x) => tempDiff(x, city && city.locale)
  else if (PERCENTAGE.includes(attr)) return percentage
  else if (PROPORTION.includes(attr)) return proportion
  else if (attr == "health_normalized") return x100
  else if (attr == "tree_equity_score") return floor
  else return identity
}

function getDataFormatter(attr: keyof Blockgroup | keyof Area): DataFormatter | undefined {
  if (PERCENTAGE.includes(attr) || attr == "health_normalized") return prop2perc
  else if (PROPORTION.includes(attr)) return prop
  else if (AIR_TEMPERATURE.includes(attr) || attr == "temperature") return tempDataFormatter
  else return identityDataFormatter
}

function getStyle(
  attr: keyof BlockgroupWithSupplemental | keyof Area,
  layer: "blockgroup" | "area"
): FacetStyle {
  if (attr == "tree_equity_score") return treeEquityScoreStyle
  else if (AIR_TEMPERATURE.includes(attr)) return airTemperatureStyle
  else if (attr.includes("shade")) return shadeStyle
  else if (attr == "air_pollution") return airPollutionStyle
  else if (attr == "temperature") return surfaceTemperatureStyle
  else if (attr == "tree_canopy") return treeCanopyStyle
  else if (attr == "tree_canopy_gap") return treeCanopyGapStyle
  else if (attr == "potential_tree_canopy") return potentialTreeCanopyStyle
  else if (attr == "name_ej_criteria") return ejStyle
  else if (attr == "health_risk") return climateHealthRiskStyle
  else if (attr == "holc_grade") return redliningStyle
  else if (attr == "canopy_change_percent") return canopyChangePercentStyle
  else if (attr == "impervious_surface") {
    if (layer == "blockgroup") return imperviousSurfaceBlockgroupStyle
    else return imperviousSurfaceAreaStyle
  } else if (attr == "neighborhood_score_category") return neighborhoodScoreCategoryStyle
  else if (attr == "ttf_tree_equity_planting") return ttfTreePlantingPriorityStyle
  else return priorityIndicatorStyle
}

function getPriorityIndex(attr: keyof Blockgroup | keyof Area): number | undefined {
  if (!PRIORITY_INDICATORS.includes(attr)) return
  else return PRIORITY_INDICATORS.indexOf(attr)
}

function getArea(locale?: string): Facet {
  if (locale && locale === "en-CA") {
    return {
      title: "Area (sq-m)",
      field: { type: "Area", field: "area_sqkm" },
      data: {
        type: "rangeChoice",
        value: [
          // label in sq-m, range units should be in square_kilometers
          { label: "Any", range: [0, 1e9] },
          { label: "≦5,000", range: [0, squareMetersToSquareKilometers(5000)] },
          {
            label: "5,000-20,000",
            range: [squareMetersToSquareKilometers(5000), squareMetersToSquareKilometers(20000)],
          },
          { label: ">20,000", range: [squareMetersToSquareKilometers(20000), 1e9] },
        ],
      },
      group: hide,
      formatter: floor,
      explanation: "Total land area of the parcel.",
    }
  }

  return {
    title: "Area (acres)",
    field: { type: "Area", field: "area_sqkm" },
    data: {
      type: "rangeChoice",
      value: [
        { label: "Any", range: [0, 1e9] },
        { label: "≦1", range: [0, acresToSquareKilometers(1)] },
        { label: "1-5", range: [acresToSquareKilometers(1), acresToSquareKilometers(5)] },
        { label: ">5", range: [acresToSquareKilometers(5), 1e9] },
      ],
    },
    group: hide,
    formatter: floor,
    explanation: "Total land area of the parcel.",
  }
}

function getIncoporatedPlaceMeanTreeEquityScore() {
  const incorporatedPlaceMeanTreeEquityScoreFacet: Facet = {
    title: "Tree Equity Score",
    field: { type: "Municipality", field: "incorporated_place_mean_tree_equity_score" },
    data: {
      type: "range",
      value: [0, 100],
      gradient: [0, 70, 100, 100],
      step: 1,
    },
    style: treeEquityScoreStyle,
    formatter: floor,
    group: treeEquityScore,
    hideFromFilters: true,
  }
  return incorporatedPlaceMeanTreeEquityScoreFacet
}

export default function useFacets(city: City) {
  const setFacets = useSetAtom(facetsAtom)
  const setFilters = useSetAtom(filtersAtom)
  const [facetsLoaded, setFacetsLoaded] = useState(false)

  useEffect(() => {
    if (!city) return
    const displayShadeFacets = env.NEXT_PUBLIC_SHADE_FEATURE_FLAG_ACTIVE === "true"
    const schemas = myFacets as FacetSchema[]
    const processedFacets = schemas
      .filter((schema) => schema.location === city.id)
      .filter((schema) => (displayShadeFacets ? true : !schema.attr.includes("shade")))
      .map((schema) => createFacet(schema, city))
    processedFacets.push(getArea(city.locale))
    processedFacets.push(getIncoporatedPlaceMeanTreeEquityScore())

    const facets = displayShadeFacets ? groupShadeFacets(processedFacets) : processedFacets
    setFacets(facets as Facet[])
    setFilters(getFilters(facets as Facet[]))
    setFacetsLoaded(true)
  }, [city])

  return facetsLoaded
}
