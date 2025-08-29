import { atom } from "jotai"
import {
  Facet,
  FACETS,
  DEFAULT_NEIGHBOURHOOD_LIKE_FACET,
  DEFAULT_LOCALITY_LIKE_FACET,
} from "./facets.constants"
import { LOCALITY_LIKE_LAYER, NEIGHBORHOOD_LIKE_LAYER } from "../map/map.constants"

const activeNeighborhoodFacetInitialState = FACETS.find(
  (facet) =>
    facet.attr === DEFAULT_NEIGHBOURHOOD_LIKE_FACET && facet.layer === NEIGHBORHOOD_LIKE_LAYER,
)!
export const activeNeighborhoodFacetAtom = atom<Facet>(activeNeighborhoodFacetInitialState)

const activeLocalityFacetInitialState = FACETS.find(
  (facet) => facet.attr === DEFAULT_LOCALITY_LIKE_FACET && facet.layer === LOCALITY_LIKE_LAYER,
)!
export const activeLocalityFacetAtom = atom<Facet>(activeLocalityFacetInitialState)
