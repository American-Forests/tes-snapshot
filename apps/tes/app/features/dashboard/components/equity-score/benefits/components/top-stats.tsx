import type { Blockgroup } from "@prisma/client"
import { twMerge } from "tailwind-merge"
import { useAtomValue } from "jotai"
import { HelpTooltip } from "ui"
import { formatNumber, squareKilometersToAcres } from "utils"
import {
  clippedBlockgroupPopulation,
  getNewCompositeLocalityScore,
} from "app/features/dashboard/utils"
import { approxTreeCount } from "app/utils/scenario_utils"
import { planningSelectedTabAtom } from "app/features/dashboard/dashboard.state"
import type { ReportType } from "app/features/report-finder/types"
import { BenefitsSummaryItem } from "./summary-item"
import { acresToSquareFeet, acresToSquareMiles } from "app/utils/conversion_utils"
import { sumBy } from "lodash"
import { Trans, useTranslation } from "react-i18next"
import { useTopStatsData } from "app/features/dashboard/hooks"

type TopStatsProps = {
  canopyAcresNeeded: number
  ecosystemBenefits: Map<string, number> | undefined
  targetScore: number
  benefitTooltipContent: Map<number, string>
  blockgroups: Blockgroup[]
  reportType: ReportType
  locationName: string
}

type BenefitsIntroNewProps = {
  canopyAcresNeeded: number
  treesNeeded: number
  targetScore: number
  className?: string
}

const BenefitsIntroNew = ({
  canopyAcresNeeded,
  treesNeeded,
  targetScore,
  className,
}: BenefitsIntroNewProps) => {
  const canopyNeededInSqMi = acresToSquareMiles(canopyAcresNeeded)
  const expansionValue = canopyNeededInSqMi < 0.1
    ? `${formatNumber(acresToSquareFeet(canopyAcresNeeded), 0, "en-us")} sq-ft`
    : `${formatNumber(canopyNeededInSqMi, 1, "en-us")} sq-mi`
  return (
    <p className={className}>
      <Trans
        i18nKey="location-insights:planning.new_canopy_intro"
        values={{ expansionValue, targetScore, treesNeeded: formatNumber(treesNeeded, 0, "en-us") }}
        components={{
          bold: <span className="font-bold text-brand-green-dark"/>,
        }}
      />
    </p>
  )
}

type BenefitsIntroExistingProps = {
  locationName: string
  existingCanopyAcres: number
  existingTrees: number
  canopyAcresNeeded: number
  treesNeeded: number
  targetScore: number
  className?: string
}

const BenefitsIntroExisting = ({
  locationName,
  existingCanopyAcres,
  existingTrees,
  canopyAcresNeeded,
  treesNeeded,
  targetScore,
  className,
}: BenefitsIntroExistingProps) => {
  const canopyNeededInSqMi = acresToSquareMiles(canopyAcresNeeded)
  const expansionValue = canopyNeededInSqMi < 0.1
    ? `${formatNumber(acresToSquareFeet(canopyAcresNeeded), 0, "en-us")} sq-ft`
    : `${formatNumber(canopyNeededInSqMi, 1, "en-us")} sq-mi`
  const treesEquivalent = formatNumber(existingTrees, 0, "en-us")
  return (
    <p className={className}>
      <Trans
        i18nKey="location-insights:planning.existing_canopy_intro"
        values={{ expansionValue, targetScore, treesNeeded: formatNumber(treesNeeded, 0, "en-us"), treesEquivalent, existingCanopyAcres: formatNumber(acresToSquareMiles(existingCanopyAcres), 1, "en-us"), locationName }}
        components={{
          bold: <span className="font-bold text-brand-green-dark"/>,
        }}
      />
    </p>
  )
}

export const TopStats = ({
  locationName,
  canopyAcresNeeded,
  ecosystemBenefits,
  targetScore,
  blockgroups,
  reportType,
}: TopStatsProps) => {
  const { t } = useTranslation(["location-insights"])
  const planningTab = useAtomValue(planningSelectedTabAtom)
  const treesNeeded = approxTreeCount(canopyAcresNeeded)
  const existingCanopyAcres = sumBy(
    blockgroups,
    (bg) => bg.tree_canopy * squareKilometersToAcres(bg.area_sqkm!)
  )
  const existingTrees = approxTreeCount(existingCanopyAcres)
  const newCompositeLocalityScore = getNewCompositeLocalityScore(blockgroups, targetScore)
  const totalPopulation = clippedBlockgroupPopulation(blockgroups)
  const numberLocalitiesImpacted = new Set(
    blockgroups
      .filter((bg) => bg.tree_equity_score < targetScore && bg.incorporated_place_name !== null)
      .map((bg) => bg.incorporated_place_name)
  ).size
  const summaryCX =
    "grid lg:grid-cols-6 grid-cols-2 gap-4 items-center justify-items-center lg:py-8 py-4 xl:w-11/12 w-full m-auto"
  const bodyCX = "text-brand-green-dark text-lg leading-snug col-span-2 lg:mb-0 mb-4"
  const tooltipCX = "text-sm font-medium leading-tight"
  const bodyPrintCX = "print:mb-4"
  const benefitsItemCX = "col-span-1 flex flex-col items-center justify-center text-center"

  const totalEcosystemServiceValue =
    (ecosystemBenefits && ecosystemBenefits.get("total_ecosystem_service_value")) || 0
  const topStatsContent = useTopStatsData({
    blockgroups,
    canopyAcresNeeded,
    totalEcosystemServiceValue,
    treesNeeded,
    existingTrees,
    reportType,
    newCompositeLocalityScore,
    numberLocalitiesImpacted,
    planningTab,
    totalPopulation,
  })

  const itemsData = topStatsContent?.items

  return (
    <>
      {ecosystemBenefits && (
        <>
          <div className="bg-[#FBFDFD] -mt-6 pt-14 2xl:px-12 md:px-6 px-0">
            <div className="col-span-6 border-b-2 pb-1 border-brand-green-dark m-auto xl:w-11/12 w-full">
              <span className="text-brand-green-darker font-bold mr-3 uppercase">
                {t("location-insights:top-stats.title")}
              </span>{" "}
              <span className="font-normal text-brand-green-dark">{topStatsContent?.title}</span>
            </div>
            <div className={twMerge(summaryCX, "col-span-2")}>
              <div className={twMerge(bodyCX, bodyPrintCX)}>
                {planningTab === "new" ? (
                  <BenefitsIntroNew
                    className="inline"
                    canopyAcresNeeded={canopyAcresNeeded}
                    targetScore={targetScore}
                    treesNeeded={treesNeeded}
                  />
                ) : (
                  <BenefitsIntroExisting
                    className="inline"
                    canopyAcresNeeded={canopyAcresNeeded}
                    treesNeeded={treesNeeded}
                    existingCanopyAcres={existingCanopyAcres}
                    existingTrees={existingTrees}
                    targetScore={targetScore}
                    locationName={locationName}
                  />
                )}
                <HelpTooltip className="ml-1 -mt-1">
                  <p className="text-center">
                    <span className={tooltipCX}>
                      {t("location-insights:top-stats.tree_target.hint")}
                    </span>
                  </p>
                </HelpTooltip>
              </div>
              {itemsData?.map((item, i) => (
                <BenefitsSummaryItem
                  key={i}
                  className={benefitsItemCX}
                  label={item.label}
                  value={item.value}
                  hint={item.hint}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}
