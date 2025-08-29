import { atom } from "jotai"
import {
  DEFAULT_TARGET_SCORE_EXISTING_CANOPY,
  DEFAULT_TARGET_SCORE_NEW_CANOPY,
  DEFAULT_PLANNING_SECTION_TAB,
} from "./dashboard.constants"
import type { MapboxGeoJSONFeature, Map } from "mapbox-gl"
import { PlanningCanopyScenario } from "./dashboard.types"
import {
  BlockgroupTableRowData,
  LocalityTableRowData,
} from "./components/advanced-planning-tool/data-table/types"

export const targetScoreNewCanopyAtom = atom<number>(DEFAULT_TARGET_SCORE_NEW_CANOPY)
export const targetScoreExistingCanopyAtom = atom<number>(DEFAULT_TARGET_SCORE_EXISTING_CANOPY)
export const targetScoreNewCanopyDebouncedAtom = atom<number>(DEFAULT_TARGET_SCORE_NEW_CANOPY)
export const targetScoreExistingCanopyDebouncedAtom = atom<number>(
  DEFAULT_TARGET_SCORE_EXISTING_CANOPY,
)
export const mapAtom = atom<Map | null>(null)
export const mapTableAtom = atom<Map | null>(null)
export const clickedFeatureAtom = atom<MapboxGeoJSONFeature | null>(null)
export const selectedFeaturesIdsTableMapAtom = atom<string[]>([])

export const planningSelectedTabAtom = atom<PlanningCanopyScenario>(DEFAULT_PLANNING_SECTION_TAB)

export const targetScoreAtom = atom<number>((get) => {
  const selectedTab = get(planningSelectedTabAtom)
  return selectedTab === DEFAULT_PLANNING_SECTION_TAB
    ? get(targetScoreNewCanopyAtom)
    : get(targetScoreExistingCanopyAtom)
})
export const targetScoreDebouncedAtom = atom<number>((get) => {
  const selectedTab = get(planningSelectedTabAtom)
  return selectedTab === DEFAULT_PLANNING_SECTION_TAB
    ? get(targetScoreNewCanopyDebouncedAtom)
    : get(targetScoreExistingCanopyDebouncedAtom)
})

export const hoveredRowAtom = atom<BlockgroupTableRowData | LocalityTableRowData | null>(null)
export const selectedRowAtom = atom<BlockgroupTableRowData | LocalityTableRowData | null>(null)
export const tableDataAtom = atom<BlockgroupTableRowData[] | LocalityTableRowData[]>([])
