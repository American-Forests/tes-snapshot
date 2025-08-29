import { Facet } from "data/facets"

export function isShadeFacet(facet: Facet) {
  return facet.field.field.includes("shade")
}

export function getShadeTime(facet: Facet) {
  const shadeTime = facet.field.field.split("_").pop()
  return shadeTime
}
