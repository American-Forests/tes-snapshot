import type { NeighborhoodLike, iTree } from "@prisma/client"

import { ECOSYSTEM_BENEFITS_LIST } from "./report.constants"
import { add, pick, listAdd, avg, avgBy } from "utils"

export const getEcosystemBenefitsMap = ({
  neighborhoods,
  iTreeData,
  targetScore,
}: {
  neighborhoods: NeighborhoodLike[]
  iTreeData: Map<string, iTree>
  targetScore: number
}): Map<keyof iTree, number> => {
  const benefitsMap = new Map<keyof iTree, number>(
    ECOSYSTEM_BENEFITS_LIST.map((benefit) => [benefit, 0])
  )
  neighborhoods.forEach((n) => {
    const sqKm = getTreeCanopySqKmNeeded(n, targetScore)
    const hectaresNeeded = sqKm * 100
    ECOSYSTEM_BENEFITS_LIST.map((benefit) => {
      const localityTreeData = iTreeData.get(n.locality_id)
      const benefitMultiplier = localityTreeData ? localityTreeData[benefit] as number : 0
      const benefitValue = benefitMultiplier ? benefitMultiplier * hectaresNeeded : 0
      const currentBenefitValue = benefitsMap.get(benefit)!
      benefitsMap.set(benefit, currentBenefitValue + benefitValue)
    })
  })
  return benefitsMap
}

/**
 * @param neighborhood
 * @param targetScore
 * @returns additional acres of tree canopy needed to reach target Tree Equity Score
 */
export const getTreeCanopySqKmNeeded = (
  neighborhood: NeighborhoodLike,
  targetScore: number
): number => {
  if (targetScore <= neighborhood.tree_equity_score) return 0
  const targetGapScore = (1 - targetScore / 100) / neighborhood.priority_indicator
  const targetTreeCanopyPercent =
    neighborhood.tree_canopy_goal - targetGapScore * neighborhood.tree_canopy_gap_max
  const targetSqKm = neighborhood.area * targetTreeCanopyPercent
  return targetSqKm - neighborhood.area * neighborhood.tree_canopy
}

export const getPercentTreeCanopyAdded = (
  neighborhoods: NeighborhoodLike[],
  treeCanopySqKm: number
) => {
  const totalAreaSqKm = neighborhoods.map((n) => n.area).reduce(add, 0)
  return (treeCanopySqKm / totalAreaSqKm) * 100
}

export const totalPopulation = listAdd<NeighborhoodLike, number>("population")
export const avgByPop = avgBy<NeighborhoodLike, number>("population")
export const avgDepProp = avgByPop("dependent_proportion")

const extents = (fmt: (d: number) => number | string, list: number[]) => {
  const allValues = list.map(fmt)
  return [allValues[0], allValues[allValues.length - 1]]
}
// displays the mean of a given key and also min max values
export const meanRange = <T extends NeighborhoodLike>(
  key: keyof T,
  list: T[],
  format: (d: number) => number | string = (d) => d
) => {
  const mean = avg(list.map(pick<T, number>(key))).toFixed(3)
  const allvalues = list.map(pick<T, number>(key)).sort((a, b) => a - b)
  return `mean: ${format(parseFloat(mean))} | range: ${extents(format, allvalues).join("-")}`
}

export const treeCanopyPerCapita = (neighborhood: {
  tree_canopy: NeighborhoodLike["tree_canopy"]
  area: NeighborhoodLike["area"]
  population: NeighborhoodLike["population"]
}) => {
  /**
   * multiply tree canopy by area to get sq-km of tree canopy
   * then, divide by population to get sq-km per person
   * lastly, multiply by 1,000,000 to convert sq-km/person to sq-m/person
   */
  return ((neighborhood.tree_canopy * neighborhood.area) / neighborhood.population) * 1000000
}

/**
 * Calculate the per capita tree canopy coverage for each group.
 *
 * @param {NeighborhoodLike[][]} groups - An array of groups, where each group is an array of neighborhood-like objects.
 * @returns {number[]} An array of per capita tree canopy values for each group.
 */
export const treeCanopyPerCapitaByGroup = (groups: NeighborhoodLike[][]) =>
  groups.map((group, i) => {
    const treeCanopyPerCapitaSum = group
      .map(treeCanopyPerCapita)
      /**
       * sum sq-m per person for each neighborhood in the group and
       * divide by the number of neighborhoods in the group to get the
       * average sq-m per person for the group
       */
      .reduce(add, 0)
    /**
     * if the group is empty, return 0 to avoid dividing by 0 and messing up the chart formatting
     */
    return groups[i]!.length > 0 ? treeCanopyPerCapitaSum / groups[i]!.length : 0
  })
