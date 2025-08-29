import { twMerge } from "tailwind-merge"
import { PRINT_BLOCK } from "../dashboard.constants"
import { MinimalTesBarChart, HelpTooltip } from "ui"
import { Blockgroup } from "db"
import { approxTreeCount, getAcresNeeded } from "app/utils/scenario_utils"
import { acresToSquareMiles } from "app/utils/conversion_utils"
import { formatNumber } from "utils"
import { getBlockgroupsSummary } from "../utils"
import { useTranslation, Trans } from "react-i18next"

interface SElement {
  displayText: string
  value: number | string
  unit?: string
  explanation: string
  formatFunction?: (value: number) => string
}

export interface SummaryProps {
  urbanAreaPopulation: SElement
  treeCanopyCover: SElement
  peopleOfColor: SElement
  peopleInPoverty: SElement
  children: SElement
  seniors: SElement
  unemployment: SElement
  linguisticIsolation: SElement
  avgHealthBurdenIdx: SElement
  blocksBelow100: SElement
}
const getSummaryData = (blockgroups: Blockgroup[]): SummaryProps => {
  const { t } = useTranslation(["location-insights"])
  const blockgroupsSummary = getBlockgroupsSummary(blockgroups)
  return {
    urbanAreaPopulation: {
      displayText: t("location-insights:summary.urban_area_population.displayText"),
      value: blockgroupsSummary.clippedBlockgroupPopulation,
      explanation: t("location-insights:summary.urban_area_population.explanation"),
      formatFunction: (value: number) => value.toLocaleString("en-US"),
    },
    treeCanopyCover: {
      displayText: t("location-insights:summary.tree_canopy_cover.displayText"),
      value: blockgroupsSummary.treeCanopy,
      unit: "%",
      formatFunction: (value: number) => formatNumber(value, 0, "en-us"),
      explanation: t("location-insights:summary.tree_canopy_cover.explanation"),
    },
    peopleInPoverty: {
      displayText: t("location-insights:summary.people_in_poverty.displayText"),
      value: blockgroupsSummary.peopleInPoverty,
      unit: "%",
      formatFunction: (value: number) => formatNumber(value, 0, "en-us"),
      explanation: t("location-insights:summary.people_in_poverty.explanation"),
    },
    peopleOfColor: {
      displayText: t("location-insights:summary.people_of_color.displayText"),
      value: blockgroupsSummary.peopleOfColor,
      unit: "%",
      formatFunction: (value: number) => formatNumber(value, 0, "en-us"),
      explanation: t("location-insights:summary.people_of_color.explanation"),
    },
    unemployment: {
      displayText: t("location-insights:summary.unemployment.displayText"),
      value: blockgroupsSummary.unemployment,
      unit: "%",
      formatFunction: (value: number) => formatNumber(value, 0, "en-us"),
      explanation: t("location-insights:summary.unemployment.explanation"),
    },
    children: {
      displayText: t("location-insights:summary.children.displayText"),
      value: blockgroupsSummary.children,
      unit: "%",
      formatFunction: (value: number) => formatNumber(value, 0, "en-us"),
      explanation: t("location-insights:summary.children.explanation"),
    },
    seniors: {
      displayText: t("location-insights:summary.seniors.displayText"),
      value: blockgroupsSummary.seniors,
      unit: "%",
      formatFunction: (value: number) => formatNumber(value, 0, "en-us"),
      explanation: t("location-insights:summary.seniors.explanation"),
    },
    linguisticIsolation: {
      displayText: t("location-insights:summary.linguistic_isolation.displayText"),
      value: blockgroupsSummary.linguisticIsolation,
      unit: "%",
      formatFunction: (value: number) => formatNumber(value, 0, "en-us"),
      explanation: t("location-insights:summary.linguistic_isolation.explanation"),
    },
    avgHealthBurdenIdx: {
      displayText: t("location-insights:summary.health_burden.displayText"),
      value: blockgroupsSummary.healthBurden,
      formatFunction: (value: number) => formatNumber(value, 0, "en-us"),
      explanation: t("location-insights:summary.health_burden.explanation"),
    },
    blocksBelow100: {
      displayText: t("location-insights:summary.neighborhoods_below.displayText"),
      value:
        (blockgroups.filter((bg) => bg.tree_equity_score < 100).length / blockgroups.length) * 100,
      formatFunction: (value: number) => `${formatNumber(value, 0, "en-us")}%`,
      explanation: t("location-insights:summary.neighborhoods_below.explanation"),
    },
  }
}

const Separator = ({ className }: { className?: string }) => (
  <div className={twMerge(className, "h-[1px] w-full bg-gray-200")} />
)

function SummaryElement({
  data: { displayText, value, unit, explanation, formatFunction },
}: {
  data: SElement
}) {
  return (
    <>
      <p className="font-medium text-neutral-600 text-caption">{displayText}</p>
      <div className="flex items-center justify-center text-brand-green-darker">
        <p className="font-bold mr-2">{`${
          formatFunction ? formatFunction(value as number) : value
        }${unit ? unit : ""}`}</p>
        <HelpTooltip>{explanation}</HelpTooltip>
      </div>
    </>
  )
}

export const Overview = ({
  blockgroups,
  compositeScore,
  locationName,
}: {
  blockgroups: Blockgroup[]
  compositeScore?: number
  locationName: string
}) => {
  const { t } = useTranslation(["location-insights", "map"])
  const cx = "xl:w-4/5 w-full m-auto px-2 sm:px-10 py-8"
  const printCX = twMerge(PRINT_BLOCK)
  const canopyNeededAcres = blockgroups
    .map((bg) => getAcresNeeded(bg, 100))
    .reduce((a, b) => a + b, 0)
  const canopyNeededSquareMiles = acresToSquareMiles(canopyNeededAcres)
  const treesNeeded = approxTreeCount(canopyNeededAcres)
  const summaryData = getSummaryData(blockgroups)
  const canopyExpansion = formatNumber(canopyNeededSquareMiles, 1, "en-us")
  const neededTrees = formatNumber(treesNeeded, 0, "en-us")
  return (
    <section className={twMerge(cx, printCX, "bg-white")}>
      <h2 className="text-subtitle font-extrabold text-brand-green-darker">
        {t("location-insights:overview.title").toUpperCase()}
      </h2>
      <Separator className="mb-6" />
      {/* <div className="flex flex-col sm:flex-row gap-4"> */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 xl:gap-4 gap-x-4">
        <div className="w-full pr-4">
          <h3 className="text-subtitle font-medium text-brand-green-dark pb-2">
            {t("location-insights:overview.achieving_equity")}
          </h3>
          <p className="font-medium text-neutral-600 text-caption">
            <Trans
              i18nKey="location-insights:overview.tree_equity_explanation"
              values={{ canopyExpansion, neededTrees, locationName }}
            >
              Expanding the urban canopy by
              <span className="text-brand-green-dark"></span>
              (roughly {{ neededTrees }} trees) and maintaining the existing canopy would bring
              every urban neighborhood in <span className="capitalize"></span> to a Tree Equity
              Score of 100.
            </Trans>
          </p>
        </div>
        <div className="w-full">
          <h3 className="text-subtitle font-medium text-brand-green-dark">
            {t("location-insights:overview.distribution_scores")}
          </h3>
          <p className="font-medium text-neutral-600 text-caption -mt-1 capitalize">
            {compositeScore
              ? `${t("map:composite_score_tooltip_name")}: ${compositeScore}`
              : `${locationName}`}
          </p>
          <MinimalTesBarChart
            values={blockgroups.map((bg) => bg.tree_equity_score)}
            tooltipStrings={{ singular: t("common:blockgroup"), plural: t("common:blockgroups") }}
          />
        </div>
        <div className="sm:col-span-2">
          <h3 className="text-subtitle font-medium text-brand-green-dark pb-2">
            {t("location-insights:overview.summary")}
          </h3>
          <div className="flex flex-col sm:flex-row justify-between">
            <div className="flex flex-col justify-between flex-1 sm:mr-12">
              {Object.entries(summaryData)
                .slice(0, 5)
                .map(([key, data]: [key: string, data: SElement]) => (
                  <div key={key} className="flex w-full items-start justify-between">
                    <SummaryElement data={data} />
                  </div>
                ))}
            </div>
            <div className="flex flex-col justify-between flex-1">
              {Object.entries(summaryData)
                .slice(5)
                .map(([key, data]: [key: string, data: SElement]) => (
                  <div key={key} className="flex w-full items-start justify-between">
                    <SummaryElement data={data} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Separator className="mt-6" />
    </section>
  )
}
