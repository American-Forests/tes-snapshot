import { Facet } from "data/facets"

export const groupShadeFacets = (facets: Facet[]) => {
  const shadeFacets = facets.filter((facet) => facet.field?.field.includes("shade"))
  const areaFacets = shadeFacets.filter((facet) => facet.field?.type === "Area")
  const blockgroupFacets = shadeFacets.filter((facet) => facet.field?.type === "Block Group")
  const nonShadeFacets = facets.filter((facet) => !facet.field?.field.includes("shade"))
  const mergedAreaShadeFacet = {
    ...areaFacets[0],
    field: {
      ...areaFacets[0]?.field,
      // This avoids a bug on first sublayer toggling
      field: null,
    },
    title: "merged_shade_facet",
    sublayers: areaFacets,
  }
  const mergedBlockgroupShadeFacet = {
    ...blockgroupFacets[0],
    field: {
      ...blockgroupFacets[0]?.field,
      field: null,
    },
    title: "merged_shade_facet",
    sublayers: blockgroupFacets,
  }
  return [...nonShadeFacets, mergedAreaShadeFacet, mergedBlockgroupShadeFacet]
}
