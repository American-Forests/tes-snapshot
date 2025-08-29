import { useQuery } from "@blitzjs/rpc"
import { Suspense, useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import { SymbolIcon } from "@radix-ui/react-icons"
import type { NeighborhoodLike, iTree } from "@prisma/client"

import getITree from "app/queries/get-itree"
import { HelpTooltip, BenefitsPanel } from "ui"
import type { BenefitsPanelData } from "ui"
import { add, formatNumber } from "utils"
import {
  getEcosystemBenefitsMap,
  getPercentTreeCanopyAdded,
  getTreeCanopySqKmNeeded,
} from "app/features/report/utils"
import { BENEFITS_PANNEL_TOOLTIP_CONTENT } from "app/constants"

const BenefitsSummaryItem = ({
  label,
  value,
  hint,
}: {
  label: string
  value: string
  hint?: string
}) => {
  const cx = "flex flex-col flex-1 items-center justify-center"
  const titleCX = "text-gray-700 font-bold mb-2 text-left"
  const helpWrapperCX = "text-gray-400 hover:text-black ml-1"
  const hintCX = "text-sm font-medium leading-snug pb-4"
  const valueCX = "text-brand-green-dark text-3xl font-bold"

  const labelPrintCX = "text-sm"
  return (
    <div className={cx}>
      <div className={titleCX}>
        <span className={labelPrintCX}>{label}</span>
        {hint && (
          <HelpTooltip className={helpWrapperCX}>
            <span className={hintCX}>{hint}</span>
          </HelpTooltip>
        )}
      </div>
      <p className={valueCX}>{value}</p>
    </div>
  )
}

const split = (thresh: number) => (value: number, a: number | string, b: number | string) =>
  value >= thresh ? b : a
const splitn = (thresh: number) => (value: number) => value >= thresh ? value / thresh : value
const splitByThousand = split(1000)
const splitByThousandN = splitn(1000)
const splitByMillion = split(1000000)
const roundToNearest = (nearest: number, number: number) => Math.round(number / nearest) * nearest

export const getBenefitsPanelData = (
  ecosystemBenefits: Map<keyof iTree, number>
): BenefitsPanelData => {
  const carbonSequesteredBase = ecosystemBenefits.get("carbon") || 0
  const carbonSequestered = formatNumber(carbonSequesteredBase, 1, "en-GB")
  const carbonSequestredEqualTo = formatNumber((carbonSequesteredBase * 3.67) / 1.971, 0, "en-GB")

  const pm25PollutionRemovedBase = ecosystemBenefits.get("pm25") || 0 // grams
  const pm25PollutionRemovedKg = pm25PollutionRemovedBase / 1000 // kg
  const pm25PollutionRemoved = formatNumber(splitByThousandN(pm25PollutionRemovedKg), 1, "en-GB")
  const pm25PollutionRemovedUnit = splitByThousand(pm25PollutionRemovedKg, "kg", "tonnes") as string
  const pm25PollutionEqualTo = formatNumber(pm25PollutionRemovedKg / 0.238, 0, "en-GB")

  const nitrogenDioxideRemovedBase = ecosystemBenefits.get("no2") || 0
  const nitrogenDioxideRemovedKg = nitrogenDioxideRemovedBase / 1000
  const nitrogenDioxideRemoved = formatNumber(
    splitByThousandN(nitrogenDioxideRemovedKg),
    1,
    "en-GB"
  )
  const nitrogenDioxideRemovedUnit = splitByThousand(
    nitrogenDioxideRemovedKg,
    "kg",
    "tonnes"
  ) as string

  const sulfurDioxideRemovedBase = ecosystemBenefits.get("so2") || 0
  const sulfurDioxideRemovedKg = sulfurDioxideRemovedBase / 1000
  const sulfurDioxideRemoved = formatNumber(splitByThousandN(sulfurDioxideRemovedKg), 1, "en-GB")
  const sulfurDioxideRemovedUnit = splitByThousand(sulfurDioxideRemovedKg, "kg", "tonnes") as string

  const stormwaterRunoffPreventedBase = ecosystemBenefits.get("runoff_avoided") || 0
  const stormwaterRunoffPrevented =
    stormwaterRunoffPreventedBase >= 1000000
      ? formatNumber(stormwaterRunoffPreventedBase / 1000000, 1, "en-GB")
      : formatNumber(roundToNearest(1000, stormwaterRunoffPreventedBase), 0, "en-GB")

  const stormwaterRunoffPreventedUnit = splitByMillion(
    stormwaterRunoffPreventedBase,
    "litres",
    "million litres"
  ) as string

  const stormwaterRunoffEqualTo = formatNumber(
    stormwaterRunoffPreventedBase / (1000 * 66),
    0,
    "en-GB"
  )

  return {
    carbon: [
      {
        label: "Carbon sequestered",
        value: carbonSequestered,
        unit: "tonnes",
        hint: "The atmospheric carbon dioxide captured and stored by these trees, measured in annual tonnes. Conversion sourced from iTree Landscape.",
      },
      {
        label: "Carbon sequestered equal to:",
        value: carbonSequestredEqualTo,
        unit: "petrol-powered cars offset",
        hint: "The atmospheric carbon captured and stored by these trees, measured in annual tonnes. Conversion sourced from iTree Landscape.",
      },
    ],
    air: [
      {
        label: "Pm2.5 pollution removed",
        value: pm25PollutionRemoved,
        unit: pm25PollutionRemovedUnit,
        hint: "Annual tonnes of absorption of particulate matter less than 2.5 microns in size by these trees. PM2.5 is a smaller size class of airborne microscopic particles that can be inhaled and deposit deeper in the lungs and even enter the bloodstream, potentially causing serious health problems. Conversion sourced from iTree Landscape.",
      },
      {
        label: "Pm2.5 pollution equal to:",
        value: pm25PollutionEqualTo,
        unit: "petrol-powered cars offset",
        hint: "Annual offset of particulate matter less than 2.5 microns in size produced by automobiles. Conversion sourced from iTree County.",
        compare: true,
      },
      {
        label: "Nitrogen dioxide removed",
        value: nitrogenDioxideRemoved,
        unit: nitrogenDioxideRemovedUnit,
        hint: "Annual kilograms or tonnes of nitrogen dioxide absorption by these trees. Nitrogen dioxide is an air pollutant, the most prominent source coming from the burning of fossil fuels. Breathing air with a high concentration of NO2 can irritate airways in the human respiratory system. Exposures over short periods can aggravate respiratory diseases, particularly asthma, leading to respiratory symptoms (such as coughing, wheezing or difficulty breathing), hospital admissions and visits to emergency rooms. Longer exposures to elevated concentrations of NO2 may contribute to the development of asthma and potentially increase susceptibility to respiratory infections. People with asthma, as well as children and the elderly are generally at greater risk for the health effects of NO2. Conversion sourced from iTree Landscape.",
      },
      {
        label: "Sulfur dioxide removed",
        value: sulfurDioxideRemoved,
        unit: sulfurDioxideRemovedUnit,
        hint: "Annual kilograms or tonnes of sulfur dioxide absorption by these trees. Sulfur dioxide is a toxic gas released by burning sulfur-containing fuels such as coal, oil, or diesel and as a byproduct of mining. Short-term exposures to SO2 can harm the human respiratory system and make breathing difficult. Continued exposure increases respiratory symptoms and affects lung function. High concentrations of SO2 in the air generally also convert to other sulfur oxides that react with other compounds to form small particles that may penetrate deeply into the lungs and in sufficient quantity can contribute to health problems. People with asthma, particularly children, are sensitive to these effects of SO2. Conversion sourced from iTree Landscape",
      },
    ],
    water: [
      {
        label: "Stormwater runoff prevented",
        value: stormwaterRunoffPrevented,
        unit: stormwaterRunoffPreventedUnit,
        hint: "Annual litres of reduced stormwater surface runoff (and associated pollutants) that would be absorbed by these trees and no longer require management. Conversion sourced from iTree Landscape.",
      },
      {
        label: "Stormwater runoff equal to:",
        value: stormwaterRunoffEqualTo,
        unit: "standard swimming pools",
        hint: "Conversion to standard swimming pools based on a 66-cubic metre standard swimming pool (11mx4mx1.5m).",
        compare: true,
      },
    ],
  }
}

const benefitsPanelLayout = new Map()
benefitsPanelLayout.set("carbon", {
  grouped: 2,
  items: {
    border: [true],
  },
})

benefitsPanelLayout.set("water", {
  grouped: 2,
  items: {
    border: [true],
  },
})

benefitsPanelLayout.set("air", {
  grouped: 2,
  items: {
    border: [true],
  },
})

const benefitsPanelClasses = {
  section: {
    carbon: "text-gray-800 md:col-span-2 xl:col-span-1 print:col-span-2",
    water: "text-gray-800 md:col-span-2 xl:col-span-1 print:col-span-2",
    air: "text-gray-800 md:col-span-4 xl:col-span-2 print:col-span-4 print:break-before-page",
  },
  sectionContainer: {
    carbon: "grid grid-rows-2 gap-4 xl:h-[280px] h-fit",
    water: "grid grid-rows-2 gap-4 xl:h-[280px] h-fit",
    air: "grid md:grid-cols-2 grid-rows-2 gap-4 xl:h-[280px] h-fit print:grid-cols-2",
  },
  sectionIntro: {
    carbon: "grid grid-rows-2 gap-y-4 bg-brand-gray rounded-md row-span-2",
    water: "grid grid-rows-2 gap-y-4 bg-brand-blue-pale rounded-md row-span-2",
    air: "grid grid-rows-2 row-span-2 bg-brand-green-pale rounded-md gap-y-4",
  },
  block: {
    carbon: "",
    water: "bg-brand-blue-pale rounded-md",
    air: "bg-brand-green-pale rounded-md",
  },
}

const BenefitsSection = ({
  targetScore,
  neighborhoods,
  benefitTooltipContent,
  neighborhoodType,
}: {
  targetScore: number
  neighborhoods: NeighborhoodLike[]
  benefitTooltipContent: Map<number, string>
  neighborhoodType: string
}) => {
  /**
   * map that contains the ecosystem benefits from planting the number of sq km of tree canopy needed to reach the target score
   */
  const [ecosystemBenefitsMap, setEcosystemBenefitsMap] = useState<Map<keyof iTree, number> | null>(
    null
  )

  /**
   * sq km of tree canopy needed to be planted to reach the tree equity score target specified by the user
   */
  const [treeCanopySqKmNeeded, setTreeCanopySqKmNeeded] = useState(0)

  /**
   * formatted data for the ui benefits panel component
   */
  const [benefitsPanelData, setBenefitsPanelData] = useState<BenefitsPanelData | null>(null)

  const localityIds = Array.from(new Set(neighborhoods.map((n) => n.locality_id)))
  const [iTreeData] = useQuery(getITree, { localityIds })

  useEffect(() => {
    /**
     * get tree canopy sq km needed to reach target score
     */
    const tc = neighborhoods.map((n) => getTreeCanopySqKmNeeded(n, targetScore)).reduce(add, 0)
    setTreeCanopySqKmNeeded(tc)

    /**
     * get benefits based on tree canopy sq km needed
     */
    const ecosystemBenefits = getEcosystemBenefitsMap({ neighborhoods, iTreeData, targetScore })
    setEcosystemBenefitsMap(ecosystemBenefits)

    /**
     * format data for the benefits panel component
     */
    setBenefitsPanelData(getBenefitsPanelData(ecosystemBenefits))
  }, [neighborhoods, targetScore, iTreeData])

  const summaryCX = "flex flex-row justify-evenly pb-8 flex-wrap"
  const bodyCX = "text-brand-green text-xl lg:flex-1 lg:mb-0 mb-4 text-center sm:text-left"
  const textCX = "font-bold text-brand-green-dark"
  const helpCX = "text-gray-400 hover:text-black ml-1"
  const tooltipCX = "text-sm font-medium leading-tight"
  const bodyPrintCX = "print:flex-auto print:mb-4"

  const totalEcosystemServiceValue =
    (ecosystemBenefitsMap && ecosystemBenefitsMap.get("total_ecosystem_service_value")) || 0

  return (
    <div>
      {ecosystemBenefitsMap && (
        <div className={summaryCX}>
          <div className={twMerge(bodyCX, bodyPrintCX)}>
            <span className={textCX}>
              {/**
               * if the tree canopy sq km needed is less than 1, then convert to sq m
               */}
              {treeCanopySqKmNeeded < 1
                ? formatNumber(treeCanopySqKmNeeded * 1000000, 0, "en-GB") + " sq-m"
                : formatNumber(treeCanopySqKmNeeded, 2, "en-GB") + " sq-km"}{" "}
              of canopy expansion{" "}
            </span>{" "}
            will be needed to get all {neighborhoodType}s to a score of{" "}
            <span className={textCX}>{targetScore}</span>{" "}
            {`(this is equivalent to ${formatNumber(
              (treeCanopySqKmNeeded * 1000000) / 55.74,
              0,
              "en-GB"
            )} medium trees)`}
            . See the significant benefits to the community this will create.
            {benefitTooltipContent.get(1) && (
              <HelpTooltip className={helpCX}>
                <span className={tooltipCX}>{benefitTooltipContent.get(1)}</span>
              </HelpTooltip>
            )}
          </div>
          <BenefitsSummaryItem
            label="Total canopy added"
            value={
              formatNumber(
                getPercentTreeCanopyAdded(neighborhoods, treeCanopySqKmNeeded),
                2,
                "en-GB"
              ) + "%"
            }
            hint={benefitTooltipContent.get(3)}
          />
          <BenefitsSummaryItem
            label="Annual ecosystem service value"
            value={`£${formatNumber(totalEcosystemServiceValue, 0, "en-GB")}`}
            hint={benefitTooltipContent.get(2)}
          />
        </div>
      )}
      {benefitsPanelData && (
        <BenefitsPanel
          data={benefitsPanelData}
          classes={benefitsPanelClasses}
          layout={benefitsPanelLayout}
        />
      )}
    </div>
  )
}

export const Benefits = ({ targetScore, neighborhoods, neighborhoodType }: { targetScore: number, neighborhoods: NeighborhoodLike[], neighborhoodType: string }) => {
  const loadingCx = "p-2 flex items-center justify-center gap-x-2 py-4 text-gray-500"

  return (
    <Suspense
      fallback={
        <div className={loadingCx}>
          <SymbolIcon />
          Loading…
        </div>
      }
    >
      <BenefitsSection
        targetScore={targetScore}
        neighborhoods={neighborhoods}
        benefitTooltipContent={BENEFITS_PANNEL_TOOLTIP_CONTENT}
        neighborhoodType={neighborhoodType}
      />
    </Suspense>
  )
}
