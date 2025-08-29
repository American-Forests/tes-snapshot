import simplify from "simplify-geojson"
import { wktToGeoJSON } from "betterknown"
import { ACCESS_TOKEN } from "hooks/use_map"
import { TYPES, TREE_INFO } from "app/constants"
import {
  squareFeetToAcres,
  acresToSquareFeet,
  squareKilometersToSquareFeet,
} from "app/utils/conversion_utils"
import { Blockgroup, AreaOnScenario, BlockgroupOnScenario, Area, Prisma } from "db"
import { GetScenario } from "app/scenarios/queries/getScenario"
import { GeoJSONSource } from "mapbox-gl"
import { QueryGeomEnvelope } from "tes-types"
import { ScenarioArea } from "types/data"
import bbox from "@turf/bbox"
import { squareKilometersToAcres } from "utils"

export function approxTreeCount(acres: number) {
  return Math.floor(Math.round(acresToSquareFeet(acres)) / TREE_INFO.treesMedium.AreaSF)
}

export function approxAcresFromTrees(trees: number) {
  return squareFeetToAcres(trees * TREE_INFO.treesMedium.AreaSF)
}

export function canopySquareFeet(trees: number) {
  return trees * TREE_INFO.treesMedium.AreaSF
}

/**
 * @param values count of trees for each type planted in area
 * @returns sum of canopy added in sqft
 */
export function getAreaSum(values: AreaOnScenario): number {
  let sum = 0
  for (const type of TYPES) {
    if (typeof values[type] === "number") {
      sum += values[type] * TREE_INFO[type].AreaSF
    }
  }
  return sum
}

export function totalTrees(values: AreaOnScenario): number {
  let sum = 0
  for (const type of TYPES) {
    if (typeof values[type] === "number") {
      sum += values[type]
    }
  }
  return sum
}

export function getScenarioTotalProposedTreeCount(
  areas: (AreaOnScenario & {
    area: Area
  })[]
): number {
  return areas
    .map((a) => {
      return a.treesSmall + a.treesMedium + a.treesLarge
    })
    .reduce((total, count) => total + count, 0)
}

export function getScenarioProposedTrees(areas: AreaOnScenario[]) {
  return areas.reduce(
    (acc, area) => {
      for (const type of TYPES) {
        acc[type] += area[type]
      }
      return acc
    },
    {
      treesSmall: 0,
      treesMedium: 0,
      treesLarge: 0,
    }
  )
}

export function getDemographicPercentageSum(
  values: (BlockgroupOnScenario & { blockgroup: Blockgroup })[],
  type: string
) {
  return values.reduce((acc: number, b: BlockgroupOnScenario & { blockgroup: Blockgroup }) => {
    return acc + ((b.blockgroup[type as keyof Blockgroup] || 0) as number) / values.length
  }, 0)
}

export function getDemographicSum(
  values: (BlockgroupOnScenario & { blockgroup: Blockgroup })[],
  type: string
) {
  return values.reduce((acc: number, b: BlockgroupOnScenario & { blockgroup: Blockgroup }) => {
    return acc + ((b.blockgroup[type as keyof Blockgroup] || 0) as number)
  }, 0)
}

export function getTotalTargetTreesFromTargetAreas(
  blockgroups: (BlockgroupOnScenario & { blockgroup: Blockgroup })[]
): number {
  return blockgroups.reduce((acc, bl) => acc + approxTreeCount(bl.targetArea), 0)
}

export function getTreesNeededToReachTarget(
  blockgroups: (BlockgroupOnScenario & { blockgroup: Blockgroup })[]
): number {
  return blockgroups.reduce(
    (acc, bl) => acc + approxTreeCount(getAcresNeeded(bl.blockgroup, bl.treeEquityScoreTarget)),
    0
  )
}

export function getScenarioCanopyIncrease(areas: AreaOnScenario[]): number {
  return areas.reduce((acc, a) => acc + approxAcresFromTrees(totalTrees(a)), 0)
}

/**
 * @param blockgroup
 * @param treeCanopyAcresAdded
 * @returns new TES based on acres of tree canopy added
 */
export function calculateTreeEquityScoreIncrease(
  blockgroup: Blockgroup,
  treeCanopyAcresAdded: number
): number {
  // Step 1 is provided - we're given tree_canopy_goal.

  // Step 2 - compute gap score
  const newTreeCanopyPercentage =
    (squareKilometersToAcres(blockgroup.area_sqkm!) * blockgroup.tree_canopy +
      treeCanopyAcresAdded) /
    squareKilometersToAcres(blockgroup.area_sqkm!)
  const gap = blockgroup.tree_canopy_goal - newTreeCanopyPercentage
  const gap_score = gap / blockgroup.tree_canopy_gap_max

  // Step 3 is provided - we're given equity_index
  const newScore = Math.floor(100 * (1 - gap_score * blockgroup.equity_index))
  return Math.min(100, newScore)
}

/**
 * @param blockgroup
 * @param treeEquityScoreTarget
 * @returns additional acres of tree canopy needed to reach target Tree Equity Score
 */
export function getAcresNeeded(blockgroup: Blockgroup, treeEquityScoreTarget: number): number {
  if (treeEquityScoreTarget <= blockgroup.tree_equity_score) return 0
  const areaAcres = squareKilometersToAcres(blockgroup.area_sqkm!)
  const targetGapScore = (1 - treeEquityScoreTarget / 100) / blockgroup.equity_index
  const targetTreeCanopyPercent =
    blockgroup.tree_canopy_goal - targetGapScore * blockgroup.tree_canopy_gap_max
  const targetAcres = areaAcres * targetTreeCanopyPercent
  return targetAcres - areaAcres * blockgroup.tree_canopy
}

/**
 * @param blockgroup
 * @param treeCanopyAcresAdded
 * @returns new TES based on acres of tree canopy added
 */

/**
 * @param b
 * @param onScenario
 * @returns canopy increase percentage
 */
export function calculateTreesNeeded(b: Blockgroup, onScenario: BlockgroupOnScenario) {
  // GAP target on acres
  const gapTarget =
    getAcresNeeded(b, onScenario.treeEquityScoreTarget) / squareKilometersToAcres(b.area_sqkm!)
  return Math.round(
    (gapTarget * squareKilometersToSquareFeet(b.area_sqkm!)) / TREE_INFO.treesMedium.AreaSF
  )
}

/**
 * @param b Blockgroup
 * @param areas AreaOnScenario[]
 * @returns proposed canopy as a proportion
 */
export function getCanopyProposed(b: Blockgroup, areas: AreaOnScenario[]) {
  const canopyAreaProposed = areas.reduce(
    (acc: number, area: AreaOnScenario) => acc + getAreaSum(area),
    0
  )
  return squareFeetToAcres(canopyAreaProposed) / squareKilometersToAcres(b.area_sqkm!)
}

/**
 * @param areas array
 * @returns scenario total tree canopy sqft
 */
export function calculateScenarioTotalTreeCanopySqft(areas: AreaOnScenario[]): number {
  return areas.map((area) => getAreaSum(area)).reduce((total, num) => total + num, 0)
}

/**
 * @param areas
 * @returns scenario total existing tree canopy acres
 */
export function getExistingTreeCanopyAcres(areas: (AreaOnScenario & { area: Area })[]): number {
  return areas
    .map((area) => area.area.tree_canopy * squareKilometersToAcres(area.area.area_sqkm))
    .reduce((total, num) => total + num, 0)
}

export function parcelCanopyIncreaseProposed(
  parcel: AreaOnScenario & {
    area: Area
  }
) {
  const totalTreesSqft = getAreaSum(parcel)
  return squareFeetToAcres(totalTreesSqft) / squareKilometersToAcres(parcel.area.area_sqkm)
}

/**
 * @param scenario with associated areas and blockgroups
 * @param blockgroup
 * @returns Areas array for the given blockgroup
 */
export function getAreasOnBlockgroup(scenario: GetScenario, blockgroup: Blockgroup) {
  return scenario.areas.filter((area: ScenarioArea) => area.area.blockgroupId === blockgroup.id)
}

/**
 * @param areas Array of areas on scenario
 * @returns Object with total number of trees for a given blockgroup
 */
export function getBlockgroupProposedTrees(areas: AreaOnScenario[]) {
  if (!areas.length) return null
  return areas.reduce(
    (acc, area) => {
      return {
        treesLarge: acc.treesLarge + area.treesLarge,
        treesMedium: acc.treesMedium + area.treesMedium,
        treesSmall: acc.treesSmall + area.treesSmall,
      }
    },
    {
      treesLarge: 0,
      treesMedium: 0,
      treesSmall: 0,
    }
  )
}

export function getBbox(feature: QueryGeomEnvelope) {
  return bbox(wktToGeoJSON(feature[0].geom))
}

export function getSimplifiedGeojsonAndBbox(feature: QueryGeomEnvelope) {
  const geometry = feature && wktToGeoJSON(feature[0].geom)
  const geojson = simplify(
    {
      type: "Feature",
      properties: { "fill-opacity": 0, stroke: "#F9B37A", "stroke-width": 5 },
      geometry,
    },
    0.0001
  )
  return { geojson: geojson as GeoJSONSource, bbox: bbox(geometry) }
}

export function getMinimapImageSrc(geojson: GeoJSONSource, extent: Prisma.JsonValue) {
  let output
  if (Array.isArray(geojson)) {
    output = geojson.map((g) => JSON.stringify(g)).join()
  } else {
    output = JSON.stringify(geojson)
  }
  return `https://api.mapbox.com/styles/v1/mapbox/light-v10/static/geojson(${encodeURIComponent(
    output
  )})/[${extent}]/800x800?padding=200,200&access_token=${ACCESS_TOKEN}`
}

/**
 * Calculate the percent change between two values.
 * @param {number} x - The new value.
 * @param {number} y - The original value.
 * @returns {number} The percent change from the original to the new value.
 */
export function getPercentChange(x: number, y: number): number {
  if (y === 0) {
    return x !== 0 ? Infinity : 0
  }
  return ((x - y) / Math.abs(y)) * 100
}

export function getBlockgroupOnScenarioNeedsUpdate(blockgroup: BlockgroupOnScenario) {
  const {
    tes_change,
    target_change,
    area_id_change,
    land_area_change,
    target_area_change,
    lookup_id_change,
  } = blockgroup
  return (
    tes_change ||
    target_change ||
    area_id_change ||
    land_area_change ||
    target_area_change ||
    lookup_id_change
  )
}
