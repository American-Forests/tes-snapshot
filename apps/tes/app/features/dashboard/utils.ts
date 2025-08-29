/* eslint-disable */
// @ts-nocheck
import type { Blockgroup, iTree } from "db"
import {
  add,
  pick,
  listAdd,
  avg,
  avgBy,
  acresToSquareKilometers,
  squareKilometersToAcres,
  localeWithDecimals,
  roundToNearestThousand,
} from "utils"
import { approxTreeCount } from "app/utils/scenario_utils"
import { LocalityTableRowData } from "./components/advanced-planning-tool/data-table/types"
import { getAcresNeeded } from "app/utils/scenario_utils"
import {
  BlockgroupTableIds,
  LocalityTableIds,
} from "./components/advanced-planning-tool/data-table/types"
import type { BlockgroupWithCenter } from "app/constants"

/**
 * @param neighborhood
 * @param targetScore
 * @returns additional acres of tree canopy needed to reach target Tree Equity Score
 */
export const getTreeCanopySqKmNeeded = (neighborhood: Blockgroup, targetScore: number): number => {
  if (targetScore <= neighborhood.tree_equity_score) return 0
  const targetGapScore = (1 - targetScore / 100) / neighborhood.priority_indicator
  const targetTreeCanopyPercent =
    neighborhood.tree_canopy_goal - targetGapScore * neighborhood.tree_canopy_gap_max
  const targetSqKm = neighborhood.area_sqkm * targetTreeCanopyPercent
  return targetSqKm - neighborhood.area_sqkm * neighborhood.tree_canopy
}

export const getPercentTreeCanopyAdded = (blockgroups: Blockgroup[], treeCanopy: number) => {
  const totalArea = blockgroups.map((n) => n.area_sqkm).reduce(add, 0)
  return (treeCanopy / totalArea) * 100
}

export const clippedBlockgroupPopulation = listAdd<Blockgroup, number>("clipped_bg_population")
export const totalPopulation = listAdd<Blockgroup, number>("total_population")
export const totalArea = listAdd<Blockgroup, number>("area_sqkm")
export const avgByPop = avgBy<Blockgroup, number>("total_population")
export const avgDepProp = avgByPop("dependent_proportion")
export const avgByArea = avgBy<Blockgroup, number>("area_sqkm")
export const avgTreeCanopy = avgByArea("tree_canopy")

export const getCompositeLocalityScore = (blockgroups: Blockgroup[]) => {
  const not100 = blockgroups.filter((bg) => bg.tree_equity_score < 100)
  const is100 = blockgroups.filter((bg) => bg.tree_equity_score === 100)
  const sumScores = listAdd<Blockgroup, number>("tree_equity_score")(not100)
  const sumPriorityIndices = listAdd<Blockgroup, number>("equity_index")(is100)
  return Math.floor((sumScores + sumPriorityIndices * 100) / (not100.length + sumPriorityIndices))
}

export const getNewCompositeLocalityScore = (blockgroups: Blockgroup[], targetScore) => {
  if (targetScore === 100) return 100
  const updatedBgs = blockgroups.map((bg) => ({
    ...bg,
    tree_equity_score: bg.tree_equity_score < targetScore ? targetScore : bg.tree_equity_score,
  }))
  return getCompositeLocalityScore(updatedBgs)
}

const extents = (fmt, list) => {
  const allValues = list.map(fmt)
  return [allValues[0], allValues[allValues.length - 1]]
}
// displays the mean of a given key and also min max values
export const meanRange = <T extends Blockgroup>(
  key: keyof T,
  list: T[],
  format: (d: number) => number | string = (d) => d
) => {
  const mean = avg(list.map(pick<T, number>(key))).toFixed(3)
  const allvalues = list.map(pick<T, number>(key)).sort((a, b) => a - b)
  return `mean: ${format(parseFloat(mean))} | range: ${extents(format, allvalues).join("-")}`
}

const getBinsAverage = ({
  attribute,
  bins,
  normalizedPercentage = true,
}: {
  attribute: keyof Blockgroup
  bins: Blockgroup[][]
  normalizedPercentage?: boolean
}) => {
  return bins.map((bin: Blockgroup[]) =>
    bin.length
      ? avg(
          bin.map((bl: Blockgroup) =>
            normalizedPercentage ? (bl[attribute] as number) * 100 : (bl[attribute] as number)
          )
        )
      : null
  )
}

export const getBinnedBlockgroups = ({
  data,
  thresholds,
  attribute,
}: {
  data: Partial<Blockgroup>[]
  thresholds: number[]
  attribute: keyof Blockgroup
}): Blockgroup[][] => {
  // Sort the thresholds in ascending order
  thresholds.sort((a, b) => a - b)

  const result = Array.from({ length: thresholds.length + 1 }, () => [])
  for (const obj of data) {
    const value = obj[attribute]

    // Find the index of the first threshold that is greater than or equal to the value
    const index = thresholds.findIndex((threshold) => value <= threshold)

    // If no threshold is greater than the value, add the object to the last array
    if (index === -1) {
      result[result.length - 1].push(obj)
    } else {
      // Otherwise, add the object to the corresponding array
      result[index].push(obj)
    }
  }
  return result
}

export const getHeatmapBlockgroupsData = (blockgroups: Blockgroup[]) => {
  const thresholds = [69, 74, 79, 84, 89, 94, 99]
  const binnedBlockgroups = getBinnedBlockgroups({
    data: blockgroups,
    thresholds,
    attribute: "tree_equity_score",
  })
  const elementsCount = binnedBlockgroups.flatMap((bin) => bin.length)

  return [
    {
      categoryName: "tree_canopy",
      domain: [0, 25, 50],
      range: ["#F7F7F7", "#379C68", "#2C8457"],
      data: getBinsAverage({
        attribute: "tree_canopy",
        bins: binnedBlockgroups,
      }),
      elementsCount,
      unit: "%",
    },
    {
      categoryName: "poverty_percent",
      domain: [0, 50, 100],
      range: ["#F7F7F7", "#007185", "#002F37"],
      data: getBinsAverage({
        attribute: "poverty_percent",
        bins: binnedBlockgroups,
      }),
      elementsCount,
      unit: "%",
    },
    {
      categoryName: "poc_percent",
      domain: [0, 50, 100],
      range: ["#F7F7F7", "#007185", "#002F37"],
      data: getBinsAverage({
        attribute: "poc_percent",
        bins: binnedBlockgroups,
      }),
      elementsCount,
      unit: "%",
    },
    {
      categoryName: "dependent_ratio",
      domain: [0, 50, 100],
      range: ["#F7F7F7", "#007185", "#002F37"],
      data: getBinsAverage({
        attribute: "dependent_ratio",
        bins: binnedBlockgroups,
      }),
      elementsCount,
      unit: "%",
    },
    {
      categoryName: "unemployment_rate",
      domain: [0, 50, 100],
      range: ["#F7F7F7", "#007185", "#002F37"],
      data: getBinsAverage({
        attribute: "unemployment_rate",
        bins: binnedBlockgroups,
      }),
      elementsCount,
      unit: "%",
      // manuallyHyphenatedElement: <>Unemploy&shy;ment</>,
    },
    {
      categoryName: "linguistic_isolation",
      domain: [0, 50, 100],
      range: ["#F7F7F7", "#007185", "#002F37"],
      data: getBinsAverage({
        attribute: "linguistic_isolation",
        bins: binnedBlockgroups,
      }),
      elementsCount,
      unit: "%",
    },
    {
      categoryName: "health_normalized",
      domain: [0, 50, 100],
      range: ["#F7F7F7", "#007185", "#002F37"],
      data: getBinsAverage({
        attribute: "health_normalized",
        bins: binnedBlockgroups,
      }),
      elementsCount,
      unit: "",
    },
    {
      categoryName: "temperature",
      domain: [-10, -5, 0, 5, 10, 15, 25],
      range: ["9ED4EB", "#CEE4ED", "#F7F7F7", "#FF6546", "#DB2400", "#A00E0D", "#710100"],
      data: getBinsAverage({
        attribute: "temperature",
        bins: binnedBlockgroups,
        normalizedPercentage: false,
      }),
      elementsCount,
      unit: "°F",
    },
  ]
}

export const calculateDeltaScore = (tesScore: number, targetScore = 75) =>
  tesScore >= targetScore ? 0 : targetScore - tesScore

type BlockgroupsSummary = {
  peopleOfColor: number
  peopleInPoverty: number
  children: number
  seniors: number
  childrenAndSeniors: number
  unemployment: number
  linguisticIsolation: number
  healthBurden: number
  heatDisparity: number
  treeCanopy: number
  totalArea: number
  clippedBlockgroupPopulation: number
  totalPopulation: number
}

export const getBlockgroupsSummary = (blockgroups: Blockgroup[]): BlockgroupsSummary => {
  return {
    peopleOfColor: avgByPop("poc_percent")(blockgroups),
    peopleInPoverty: avgByPop("poverty_percent")(blockgroups),
    children: avgByPop("child_percent")(blockgroups),
    seniors: avgByPop("senior_percent")(blockgroups),
    childrenAndSeniors: avgByPop("dependent_ratio")(blockgroups),
    unemployment: avgByPop("unemployment_rate")(blockgroups),
    linguisticIsolation: avgByPop("linguistic_isolation")(blockgroups),
    healthBurden: avg(blockgroups.map((bg) => bg.health_normalized * 100)),
    heatDisparity: avgByArea("temperature")(blockgroups),
    treeCanopy: avgByArea("tree_canopy")(blockgroups),
    totalPopulation: totalPopulation(blockgroups),
    clippedBlockgroupPopulation: clippedBlockgroupPopulation(blockgroups),
    totalArea: totalArea(blockgroups),
  }
}

type BlockgroupTargetScoreSummary = {
  acresNeeded: number
  treesNeeded: number
  treeCanopyGain: number
}

export const getBlockgroupTargetScoreSummary = (
  blockgroups: Blockgroup[],
  targetScore: number
): BlockgroupTargetScoreSummary => {
  const acresNeeded = blockgroups.map((bg) => getAcresNeeded(bg, targetScore)).reduce(add)
  const squareKilometersNeeded = acresToSquareKilometers(acresNeeded)
  return {
    acresNeeded,
    treesNeeded: approxTreeCount(acresNeeded),
    treeCanopyGain: getPercentTreeCanopyAdded(blockgroups, squareKilometersNeeded),
  }
}

export const getLocalityTableRowData = ({
  municipality,
  blockgroups,
  extraBlockgroups,
  targetScore,
}: {
  municipality: Municipality
  blockgroups: Blockgroup[]
  extraBlockgroups?: Blockgroup[]
  targetScore: number
}): LocalityTableRowData => {
  const blockgroupsSummary = getBlockgroupsSummary(blockgroups)
  const targetScoreSummary = getBlockgroupTargetScoreSummary(blockgroups, targetScore)

  /**
   * blockgroups sent to this function should have the same locality
   */
  const firstBg = blockgroups[0]
  const localityName = firstBg?.incorporated_place_name
  const compositeScore = firstBg?.incorporated_place_mean_tree_equity_score
  /**
   * only update target score for block groups in this report (those
   * stored in the blockgroups property), but make sure to pass extraBlockgroups
   * to the getCompositeLocalityScore function to correctly calculate the
   * composite score
   */
  const updatedBgs = blockgroups.map((bg) => ({
    ...bg,
    tree_equity_score: bg.tree_equity_score < targetScore ? targetScore : bg.tree_equity_score,
  }))
  const newCompositeScore = getCompositeLocalityScore([...updatedBgs, ...(extraBlockgroups || [])])
  const hasExtra = extraBlockgroups?.length > 0

  return {
    id: firstBg?.municipality_slug,
    locality_name: `${localityName}${hasExtra ? "*" : ""}`,
    composite_score: compositeScore,
    delta_score: newCompositeScore - compositeScore,
    tree_canopy: blockgroupsSummary?.treeCanopy || 0,
    tree_canopy_gain: targetScoreSummary?.treeCanopyGain || 0,
    trees_needed: targetScoreSummary?.treesNeeded || 0,
    targeted_blockgroups: blockgroups?.filter((bg) => bg.tree_equity_score < targetScore).length,
    total_population: blockgroupsSummary?.clippedBlockgroupPopulation || 0,
    poverty_percent: blockgroupsSummary?.peopleInPoverty || 0,
    poc_percent: blockgroupsSummary?.peopleOfColor || 0,
    unemployment_rate: blockgroupsSummary?.unemployment || 0,
    senior_percent: blockgroupsSummary?.childrenAndSeniors || 0, // This might need adjustment
    linguistic_isolation: blockgroupsSummary?.linguisticIsolation || 0,
    area: blockgroupsSummary?.totalArea, // This should be calculated or retrieved
    health_normalized: blockgroupsSummary?.healthBurden || 0,
    blockgroup_count: blockgroups?.length,
    center: municipality?.center,
  }
}

export const getFilterForLayer = (
  layerSrc: string,
  blockgroups: Blockgroup[]
): Expression | null => {
  if (layerSrc === "national_blockgroup") {
    return ["in", ["get", "id"], ["literal", blockgroups.map((f: Blockgroup) => f.id)]]
  } else if (layerSrc === "national_municipality") {
    return [
      "in",
      ["get", "slug"],
      ["literal", blockgroups.map((f: Blockgroup) => f.municipality_slug)],
    ]
  }
  return null
}

type TableHeadersDictionary =
  | { [key in BlockgroupTableIds]: string }
  | { [key in LocalityTableIds]: string }
export const getTableHeaders = (headersDictionary: TableHeadersDictionary) =>
  Object.entries(headersDictionary).map(([key, label]) => ({
    key,
    label,
  }))

export const sortTableDataByEquityScore = (
  data: BlockgroupTableRowData[] | LocalityTableRowData[]
) =>
  [...data].sort((a, b) => {
    return a.tree_equity_score - b.tree_equity_score
  })

export const getBlockgroupTableData = (
  blockgroups: BlockgroupWithCenter[],
  targetScore: number
): BlockgroupTableRowData[] => {
  return blockgroups
    .filter((b) => b.tree_equity_score < targetScore)
    .map((b) => {
      const acresNeeded = getAcresNeeded(b, targetScore)
      const canopyGain = acresNeeded / squareKilometersToAcres(b.area_sqkm)
      const treesNeeded = approxTreeCount(acresNeeded)

      return {
        ...Object.fromEntries(
          Object.values(BlockgroupTableIds).map((key) => [key, b[key as keyof Blockgroup] ?? null])
        ),
        [BlockgroupTableIds.TreeCanopyGain]: canopyGain,
        [BlockgroupTableIds.PlantingNeed]: treesNeeded,
        [BlockgroupTableIds.Center]: b.center,
      }
    })
}

export const getLocalityTableData = (
  municipalities: Municipality[],
  blockgroups: Blockgroup[],
  targetScore: number,
  extraBlockgroups?: Blockgroup[]
): LocalityTableRowData[] => {
  /**
   * Group blockgroups by municipality. TODO: Move this code into some groupByParam function later on
   */
  const groupedBlockgroups = Object.values(
    blockgroups
      .filter((bg) => bg.incorporated_place_name !== null)
      .reduce((acc, bg) => {
        const municipality = bg.municipality_slug!
        acc[municipality] = acc[municipality] || []
        acc[municipality].push(bg)
        return acc
      }, {} as Record<string, Blockgroup[]>)
  )

  const municipalitiesMap = new Map(municipalities.map((m) => [m.slug, m]))

  return groupedBlockgroups
    .map((blockgroups) =>
      getLocalityTableRowData({
        municipality: municipalitiesMap.get(blockgroups[0].municipality_slug)!,
        blockgroups,
        targetScore,
        extraBlockgroups: extraBlockgroups?.filter(
          (bg) => blockgroups[0].municipality_slug === bg.municipality_slug
        ),
      })
    )
    .filter((rowData) => (rowData.trees_needed as number) > 0)
}

export function getBenefit(
  benefitName: string,
  ecosystemBenefits: Map<string, number> | undefined
) {
  if (!ecosystemBenefits) return 0
  return ecosystemBenefits.get(benefitName) || 0
}

export const formatBenefitValue = (value: number, type?: string): string => {
  if (type === "offset") return `${Math.round(value).toLocaleString("en")} `
  else if (type == "liquid") return roundToNearestThousand(value)
  else return localeWithDecimals(value)
}
