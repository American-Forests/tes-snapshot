import { Filters as TFilters } from "types/filter"
import { atom } from "jotai"
import { Facet } from "data/facets"
import myFacets from "data/processed_facet_schemas.json"
import { createFacet, FacetSchema } from "hooks/use_facets"
import { atomWithDefault } from "jotai/utils"

export const selectedFeatureAtom = atom<mapboxgl.MapboxGeoJSONFeature | null>(null)
export const hoveredFeatureAtom = atom<mapboxgl.MapboxGeoJSONFeature | null>(null)
export const hasUsedGeocoderAtom = atom(false)

export const getFilters = (facets: Facet[]): TFilters => {
  return new Map(
    facets.map((facet) => [
      facet,
      facet.data?.type === "range"
        ? {
            type: "range",
            value: facet.data.value,
            active: false,
          }
        : facet.data?.type === "boolean"
        ? {
            type: "switch",
            value: "either",
            active: false,
          }
        : {
            type: "enum",
            value: null as string | null,
            active: false,
          },
    ])
  )
}

const tes = createFacet(myFacets[0] as FacetSchema)
export const filtersAtom = atomWithDefault<TFilters>(() => getFilters([tes]))
export const facetsAtom = atomWithDefault<Facet[]>(() => [tes])

export const reportDropdownOpen = atom(false)
