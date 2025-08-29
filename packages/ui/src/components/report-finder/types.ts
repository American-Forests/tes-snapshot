import type { Ctx, RouteUrlObject } from "blitz"
import type { ParsedUrlQueryInput } from "querystring"

export type ReportTypes = "CONSTITUENCY" | "COUNTRY" | "LOCALITY"
export type NeighbourhoodLike = {
  gid: number
  id: string
  type: string
  population: number
  area: number
  urban_area_proportion: number
  tree_canopy_goal: number
  tree_canopy: number
  tree_canopy_gap: number
  priority_indicator: number
  income_rank: number
  income_normalized: number
  income_rank_decile: number
  employment_rank: number
  employment_normalized: number
  employment_rank_decile: number
  health_rank: number
  health_normalized: number
  health_rank_decile: number
  temperature_difference: number
  temperature_difference_normalized: number
  air_pollution: number
  no2_average: number | null
  no2_normalized: number | null
  pm25_average: number | null
  pm25_normalized: number | null
  dependent_ratio: number
  dependent_ratio_normalized: number
  dependent_proportion: number
  tree_equity_score: number
  tree_canopy_gap_max: number
  children_proportion: number
  seniors_proportion: number
  region: string | null
  minority_ethnic_group_proportion: number | null
  peat: number
  rank: number | null
  rank_group_size: number | null
  locality_id: string
  constituency_id: string
  country_id: string
}

export type ReportOptions = {
  name: string
  type: string
  href: RouteUrlObject
}[]

export type Report = { id: string; displayName: string; type: string }

export type ReportAreasFromQueryQueryAndFormatter = [
  (input: { query: string }, ctx: Ctx) => Promise<Report[]>,
  (item: Report) => RouteUrlObject,
]

export type ReportAreaLoadQuery = (
  regionId: string,
  subRegionId: string
) => Report[][]

type Country = { id: string; displayName: string; type: ReportTypes }

export type CountriesLoadQuery = (searchQuery: string) => Country[][]
export type RegionsLoadQuery = () => Report[][]
export type SubregionsLoadQuery = (selectedRegion: string) => Report[][]
export type ReportAreaFromRegionAndSubRegion = {
  title: string
  loadQuery: ReportAreaLoadQuery
  format: {
    items: (d: Report[]) => Report[]
    href: (
      query: { id: string | number } & ParsedUrlQueryInput
    ) => RouteUrlObject
    title: (i: Report) => string
  }
}

type ReportFinderTabQueries = {
  getRegions: {
    title: string
    loadQuery: RegionsLoadQuery
    placeholder: string
  }
  getSubRegions: {
    title: string
    loadQuery: SubregionsLoadQuery
    placeholder: string
  }
  getReportAreas: ReportAreaFromRegionAndSubRegion
}

export type OpenSearchTabData = {
  title: string
  placeholder: string
  description: string
  loadQuery: CountriesLoadQuery
  format: (params: { id: string; type: ReportTypes }) => RouteUrlObject
}

export type FilteredSearchTabData = {
  title: string
  placeholder: string
  description: string
  queries: ReportFinderTabQueries
}

export type ReportFinderData = {
  neigborhoodLike: NeighbourhoodLike | undefined
  header: {
    placeholder: string
    intro: string
    title: string
    description: string
    noSelection: string
    reportOptions: ReportOptions | null
  }
  footer: {
    title: string
    description: string
  }
  tabs: (OpenSearchTabData | FilteredSearchTabData)[]
}
