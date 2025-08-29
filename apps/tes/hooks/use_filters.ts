import mapboxgl from "mapbox-gl"
import { useEffect, useState } from "react"
import { Filter } from "types/filter"
import {
  BLOCKGROUP_LAYER_NAME,
  BLOCKGROUP_LEVEL_NAME,
  PARCEL_LAYER_NAME,
  RIGHT_OF_WAY_LAYER_NAME,
  PARCEL_OUTLINE_LAYER_NAME,
  RIGHT_OF_WAY_OUTLINE_LAYER_NAME,
} from "app/constants"
import { Facet } from "data/facets"
import { useAtomValue } from "jotai"
import { filtersAtom } from "app/state"

export default function useFilters(params: {
  map: mapboxgl.Map | null
  baseMapStyleIsLoaded: boolean
  currentLevel: "Block Group" | "Municipality" | "Parcel" | "Aggregated Municipality"
}) {
  const { map, baseMapStyleIsLoaded, currentLevel } = params
  const [filteredBlockgroupIds, setFilteredBlockgroupIds] = useState<string[] | null>(null)
  const filters = useAtomValue(filtersAtom)

  function getFilterExpressions(facet: Facet, filter: Filter) {
    const expr: mapboxgl.Expression[] = []
    if (
      filter.type === "range" &&
      filter.value &&
      (facet.data?.type === "range" || facet.data?.type === "rangeChoice")
    ) {
      expr.push([">=", ["get", facet.field.field], filter.value[0]])
      expr.push(["<=", ["get", facet.field.field], filter.value[1]])
    } else if (
      filter.type === "switch" &&
      facet.data?.type === "boolean" &&
      filter.value !== "either"
    ) {
      expr.push([
        "==",
        ["to-boolean", ["get", facet.field.field]],
        filter.value === "yes" ? true : false,
      ])
    } else if (filter.type === "enum" && facet.data.type === "enum" && filter.value !== null) {
      expr.push(["==", ["to-string", ["get", facet.field.field]], filter.value])
    } else if (filter.type === "range" && filter.sublayer) {
      expr.push([">=", ["get", facet.field.field], filter.value[0]])
      expr.push(["<=", ["get", facet.field.field], filter.value[1]])
    }
    return expr
  }

  function getSublayerFacet(facet: Facet, filter: Filter) {
    if (!facet.sublayers?.length || filter.type !== "range") return null
    return facet.sublayers.find((sublayer) => sublayer.field.field === filter.sublayer)
  }

  useEffect(() => {
    if (
      !map ||
      !filters ||
      !baseMapStyleIsLoaded ||
      !map.isSourceLoaded("blockgroup") ||
      currentLevel !== "Block Group"
    )
      return

    const newExpressions: mapboxgl.Expression[] = []
    for (const [facet, filter] of Array.from(filters).filter(
      ([facet, filter]) => facet.field?.type === BLOCKGROUP_LEVEL_NAME && filter.active
    )) {
      const subLayerFacet = getSublayerFacet(facet, filter)
      const facetToFilter = subLayerFacet || facet
      const filterExpressions = getFilterExpressions(facetToFilter, filter).filter(
        (expr) => expr.length
      )
      filterExpressions.forEach((expr) => newExpressions.push(expr))
    }

    if (newExpressions.length) {
      const newFilters: mapboxgl.Expression = ["all", ...newExpressions]
      // TODO: add { validate: false } in future for performance boost
      map.setFilter(BLOCKGROUP_LAYER_NAME, newFilters)
      const filteredBlockgroups = map.querySourceFeatures("blockgroup", {
        sourceLayer: "data",
        filter: newFilters,
      })
      const newFilteredBlockgroupIds = filteredBlockgroups
        .map((feature) => feature?.properties?.id)
        .filter((id) => id)
      setFilteredBlockgroupIds(newFilteredBlockgroupIds)
    } else {
      map.setFilter(BLOCKGROUP_LAYER_NAME, null)
      setFilteredBlockgroupIds(null)
    }

    // without the noAreasFilter, all parcel/row tiles are loaded for a hot second before the filters
    // set on the blockgroup layer kick in, this ensures that that doesn't happen
    // const noAreasFilter = ["in", ["get", "blockgroupId"], ""]
    // map.setFilter(PARCEL_LAYER_NAME, noAreasFilter)
    // map.setFilter(RIGHT_OF_WAY_LAYER_NAME, noAreasFilter)
    // map.setFilter(PARCEL_OUTLINE_LAYER_NAME, noAreasFilter)
    // map.setFilter(RIGHT_OF_WAY_OUTLINE_LAYER_NAME, noAreasFilter)
  }, [map, filters, baseMapStyleIsLoaded, currentLevel])

  useEffect(() => {
    if (!map || !filters || !baseMapStyleIsLoaded || currentLevel != "Parcel") return
    const areaFilterExpressions: mapboxgl.Expression[] = []

    if (filteredBlockgroupIds) {
      const blockgroupFiltersExpr: mapboxgl.Expression = [
        "in",
        ["get", "blockgroupId"],
        ["literal", filteredBlockgroupIds],
      ]
      areaFilterExpressions.push(blockgroupFiltersExpr)
    }

    for (const [facet, filter] of Array.from(filters).filter(
      ([facet, filter]) => facet?.field?.type === "Area" && filter.active
    )) {
      const subLayerFacet = getSublayerFacet(facet, filter)
      const facetToFilter = subLayerFacet || facet
      const filterExpressions = getFilterExpressions(facetToFilter, filter).filter(
        (expr) => expr.length
      )
      filterExpressions.forEach((expr) => areaFilterExpressions.push(expr))
    }

    if (areaFilterExpressions.length) {
      const newFilters: mapboxgl.Expression = ["all", ...areaFilterExpressions]
      map.setFilter(PARCEL_LAYER_NAME, newFilters)
      map.setFilter(RIGHT_OF_WAY_LAYER_NAME, newFilters)
      map.setFilter(PARCEL_OUTLINE_LAYER_NAME, newFilters)
      map.setFilter(RIGHT_OF_WAY_OUTLINE_LAYER_NAME, newFilters)
    } else {
      map.setFilter(PARCEL_LAYER_NAME, null)
      map.setFilter(RIGHT_OF_WAY_LAYER_NAME, null)
      map.setFilter(PARCEL_OUTLINE_LAYER_NAME, null)
      map.setFilter(RIGHT_OF_WAY_OUTLINE_LAYER_NAME, null)
    }
  }, [map, filters, baseMapStyleIsLoaded, currentLevel, filteredBlockgroupIds])
}
