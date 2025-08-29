import { Facet } from "data/facets"

export type Filter =
  | {
      type: "range"
      sublayer?: string | null
      value: [number, number]
      active: boolean
    }
  | {
      type: "switch"
      value: "either" | "yes" | "no"
      active: boolean
    }
  | {
      type: "enum"
      value: string | null
      active: boolean
    }

export type Filters = Map<Facet, Filter>
