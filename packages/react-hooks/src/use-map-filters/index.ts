import { useEffect } from "react"
import type { Map } from "mapbox-gl"

export type Filter = {
  type: "range" | "enum" | "quantile" | "boolean" | "sublayer"
  value: number[] | number
  property: string
}

const rangeFilterExpression = (
  expressions: mapboxgl.Expression[],
  filter: Filter
): void => {
  const value = filter.value as number[]
  expressions.push([">=", ["get", filter.property], value[0]])
  expressions.push(["<=", ["get", filter.property], value[1]])
}

const booleanFilterExpression = (
  expressions: mapboxgl.Expression[],
  filter: Filter
): void => {
  expressions.push([
    "match",
    ["get", filter.property],
    filter.value,
    true,
    false,
  ])
}

export const useMapFilters = ({
  map,
  layer,
  filters,
}: {
  map: Map | null
  layer: string
  filters: Filter[] | null
}) => {
  useEffect(() => {
    if (!map) return
    if (!filters) {
      map.setFilter(layer, null)
      return
    }
    const filterExpresions: mapboxgl.Expression[] = []
    filters.forEach((filter: Filter) => {
      if (filter.type !== "boolean") {
        rangeFilterExpression(filterExpresions, filter)
      } else {
        booleanFilterExpression(filterExpresions, filter)
      }
    })

    const newFilters: mapboxgl.Expression = ["all", ...filterExpresions]
    map.setFilter(layer, newFilters)
  }, [filters, map, layer])
}
