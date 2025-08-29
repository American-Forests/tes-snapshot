import { Area, AreaOnScenario, Blockgroup, BlockgroupOnScenario, iTree } from "db"
import { acresToSquareMeters, squareFeetToAcres } from "./conversion_utils"
import { getAcresNeeded, getAreaSum } from "./scenario_utils"
import { squareKilometersToAcres } from "utils"

export function getEcosystemBenefits(params: {
  fipsToTreeCanopyAcresMap: Map<string, number>
  iTreeData: Map<string, iTree>
  benefitsList: string[]
}) {
  const { fipsToTreeCanopyAcresMap, iTreeData, benefitsList } = params
  const totalBenefits = new Map<string, number>(benefitsList.map((benefitName) => [benefitName, 0]))

  fipsToTreeCanopyAcresMap.forEach((treeCanopyAcres, fips) => {
    const iTreeFips = iTreeData.get(fips)
    if (iTreeFips) {
      const benefitsForFips = calculateEcosystemBenefitsForFips(
        iTreeFips,
        treeCanopyAcres,
        benefitsList
      )
      benefitsForFips.forEach((benefitValue, benefitName) => {
        const benefitValueSum = totalBenefits.get(benefitName) || 0
        totalBenefits.set(benefitName, benefitValueSum + benefitValue)
      })
    }
  })

  return totalBenefits
}

function calculateEcosystemBenefitsForFips(
  iTreeFips: iTree,
  treeCanopyAcres: number,
  benefitsList: string[]
): Map<string, number> {
  const treeCanopyAddedSqM = acresToSquareMeters(treeCanopyAcres)
  return new Map(
    benefitsList.map((benefit) => {
      const benefitMultiplier = iTreeFips[benefit as keyof iTree] as number
      return [benefit, benefitMultiplier * treeCanopyAddedSqM]
    })
  )
}

export function getFipsList(blockgroups: Blockgroup[]) {
  return Array.from(new Set(blockgroups.map((bg) => getFips(bg))))
}

export function getBenefit(
  benefitName: string,
  ecosystemBenefits: Map<string, number> | undefined
) {
  if (!ecosystemBenefits) return 0
  return ecosystemBenefits.get(benefitName) || 0
}

/**
 * used in the national explorer report, determines how many tree canopy acres to get all block groups within a certain area
 * to a certain target tree equity score
 * @param blockgroups
 * @param target
 * @returns
 */
export function sumSingleTargetTreeCanopyAcresByFips(
  blockgroups: Blockgroup[],
  target: number,
  includeExisting: boolean = false
): Map<string, number> {
  const targetedAreaMap = new Map<string, number>()
  blockgroups.forEach((blockgroup) => {
    const fips = getFips(blockgroup)
    const fipsTargetedTreeCanopySum = targetedAreaMap.get(fips) || 0
    const acresNeeded = getAcresNeeded(blockgroup, target)
    const existingCanopy = includeExisting
      ? blockgroup.tree_canopy * squareKilometersToAcres(blockgroup.area_sqkm!)
      : 0
    targetedAreaMap.set(fips, fipsTargetedTreeCanopySum + acresNeeded + existingCanopy)
  })
  return targetedAreaMap
}

export function sumTreeCanopyAcresProposedByFips(scenario: {
  areas: (AreaOnScenario & { area: Area })[]
  blockgroups: (BlockgroupOnScenario & { blockgroup: Blockgroup })[]
}): Map<string, number> {
  const proposedAreaMap = new Map<string, number>()

  const { areas, blockgroups } = scenario

  /** sum tree canopy by fips */
  areas.forEach((area) => {
    const bg: Blockgroup = blockgroups.filter(
      (bg) => bg.blockgroup.id === area.area.blockgroupId
    )[0]!.blockgroup
    const fips = getFips(bg)
    const addedTreeCanopy = squareFeetToAcres(getAreaSum(area))
    const fipsTreeCanopySum = proposedAreaMap.get(fips) || 0
    proposedAreaMap.set(fips, fipsTreeCanopySum + addedTreeCanopy)
  })

  return proposedAreaMap
}

export function sumTargetTreeCanopyAcresByFips(scenario: {
  areas: (AreaOnScenario & { area: Area })[]
  blockgroups: (BlockgroupOnScenario & { blockgroup: Blockgroup })[]
}): Map<string, number> {
  const targetedAreaMap = new Map<string, number>()
  const { blockgroups } = scenario
  blockgroups.forEach((blockgroup) => {
    const fips = getFips(blockgroup.blockgroup)
    const fipsTargetedTreeCanopySum = targetedAreaMap.get(fips) || 0
    targetedAreaMap.set(
      fips,
      fipsTargetedTreeCanopySum +
        getAcresNeeded(blockgroup.blockgroup, blockgroup.treeEquityScoreTarget)
    )
  })

  return targetedAreaMap
}

export function getFips(blockgroup: Blockgroup) {
  return blockgroup.fips || getFipsFromGeoId(blockgroup.id)
}

export function getFipsFromGeoId(geoId: string) {
  return geoId.substring(0, 5)
}

export function getExistingTreeCanopyAcresByFips(scenario: {
  areas: (AreaOnScenario & { area: Area })[]
  blockgroups: (BlockgroupOnScenario & { blockgroup: Blockgroup })[]
}): Map<string, number> {
  const existingCanopyMap = new Map<string, number>()

  const { areas, blockgroups } = scenario

  areas.forEach((area) => {
    const bg: Blockgroup = blockgroups.filter(
      (bg) => bg.blockgroup.id === area.area.blockgroupId
    )[0]!.blockgroup
    const fips = getFips(bg)
    const existingTreeCanopy = area.area.tree_canopy * squareKilometersToAcres(area.area.area_sqkm)
    const fipsExistingCanopySum = existingCanopyMap.get(fips) || 0
    existingCanopyMap.set(fips, fipsExistingCanopySum + existingTreeCanopy)
  })

  return existingCanopyMap
}
