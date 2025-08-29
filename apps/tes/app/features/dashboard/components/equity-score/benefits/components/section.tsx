import { useQuery } from "@blitzjs/rpc"
import { useEffect, useState } from "react"
import type { Blockgroup } from "@prisma/client"
import { twMerge } from "tailwind-merge"

import type { BenefitsData } from "ui"
import { BenefitsComponent as UIBenefitsPanel } from "ui"

import {
  getFipsList,
  sumSingleTargetTreeCanopyAcresByFips,
  getEcosystemBenefits,
} from "app/utils/report_utils"

import { getAcresNeeded } from "app/utils/scenario_utils"

import getITree from "app/itree/queries/getITree"
import { ECOSYSTEM_BENEFITS_LIST } from "app/features/dashboard/dashboard.constants"
import type { ReportType } from "app/features/report-finder/types"

import { useBenefitsPanelData } from "app/features/dashboard/hooks"
import { TopStats } from "./top-stats"
import { planningSelectedTabAtom } from "app/features/dashboard/dashboard.state"
import { useAtomValue } from "jotai"
import { add } from "utils"
import { useTranslation } from "react-i18next"

export const BenefitsSection = ({
  targetScore,
  blockgroups,
  benefitTooltipContent,
  className,
  colClassName,
  reportType,
  title,
}: {
  targetScore: number
  blockgroups: Blockgroup[]
  benefitTooltipContent: Map<number, string>
  className?: string
  colClassName?: string
  reportType: ReportType
  title: string
}) => {
  const { t } = useTranslation(["common", "location-insights"])
  const fipsList = getFipsList(blockgroups)
  const [iTreeData] = useQuery(getITree, { fips_list: fipsList })

  /**
   * calculate ecosystem benefits to reach the target specified by the user
   * */
  const [ecosystemBenefits, setEcosystemBenefits] = useState<Map<string, number> | undefined>(
    undefined
  )
  const [canopyAcresNeeded, setCanopyAcresNeeded] = useState<number>(0)
  const selectedTab = useAtomValue(planningSelectedTabAtom)
  const benefitsPanelData = useBenefitsPanelData(ecosystemBenefits)

  useEffect(() => {
    if (!blockgroups || !iTreeData) return

    const fipsToTreeCanopyAcresMap = sumSingleTargetTreeCanopyAcresByFips(
      blockgroups,
      targetScore,
      selectedTab === "existing"
    )

    const benefits = getEcosystemBenefits({
      fipsToTreeCanopyAcresMap,
      iTreeData,
      benefitsList: ECOSYSTEM_BENEFITS_LIST,
    })

    setEcosystemBenefits(benefits)
    // sum the acres needed to reach the target score
    const acresNeeded = blockgroups.map((bg) => getAcresNeeded(bg, targetScore)).reduce(add)
    setCanopyAcresNeeded(acresNeeded)
  }, [blockgroups, iTreeData, targetScore])

  const data: BenefitsData | undefined = benefitsPanelData
    ? {
        carbon: {
          data: [[benefitsPanelData.carbon]],
          classNames: {
            columns: twMerge("col-span-4 md:col-span-2 3xl:col-span-1", colClassName),
            cards: "bg-brand-gray-pale",
          },
        },
        water: {
          data: [[benefitsPanelData.water.slice(0, 2), benefitsPanelData.water.slice(2, 3)]],
          classNames: {
            columns: twMerge("col-span-4 md:col-span-2 3xl:col-span-1", colClassName),
            cards: "bg-brand-blue-pale",
          },
        },
        air: {
          data: [
            [benefitsPanelData.air.slice(0, 2), benefitsPanelData.air.slice(2, 3)],
            [
              benefitsPanelData.air.slice(3, 4),
              benefitsPanelData.air.slice(4, 5),
              benefitsPanelData.air.slice(5, 6),
            ],
          ],
          classNames: {
            columns: twMerge("col-span-4 md:col-span-4 3xl:col-span-2", colClassName),
            cards: "bg-brand-green-pale",
          },
        },
      }
    : undefined

  const BENEFITS_TITLES = {
    carbon: t("common:carbon"),
    water: t("common:water"),
    air: t("common:air"),
  }

  return (
    <div className="bg-[#FBFDFD] pb-4">
      <div className={twMerge("pt-6", className)}>
        {/* top stats */}
        <TopStats
          {...{
            locationName: title,
            canopyAcresNeeded,
            ecosystemBenefits,
            targetScore,
            benefitTooltipContent,
            blockgroups,
            reportType,
          }}
        />
        {/* benefits panel */}
        {data && (
          <UIBenefitsPanel
            data={data}
            titles={BENEFITS_TITLES}
            className="grid-cols-4 m-auto w-11/12 2xl:px-12 md:px-6 px-0"
          />
        )}
        <p className="text-right m-auto w-full md:w-11/12 text-annotation leading-none text-gray-500 md:-mt-2 mt-1 md:px-12 px-6">
          {t("location-insights:benefits.sources")}
        </p>
      </div>
    </div>
  )
}
