import { useEffect, useState } from "react"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { twMerge } from "tailwind-merge"

import {
  planningSelectedTabAtom,
  tableDataAtom,
  targetScoreAtom,
  targetScoreExistingCanopyAtom,
  targetScoreExistingCanopyDebouncedAtom,
  targetScoreNewCanopyAtom,
  targetScoreNewCanopyDebouncedAtom,
} from "app/features/dashboard/dashboard.state"

import { Benefits } from "./benefits"
import { Slider } from "./slider"
import { TabSection } from "./tabs"
import { PlanningCanopyScenario } from "app/features/dashboard/dashboard.types"
import { AdvancedPlanningTools } from "app/features/dashboard/components"
import { ReportProps } from "app/features/dashboard"
import {
  DEFAULT_TARGET_SCORE_NEW_CANOPY,
  LOCALITY_PLANNING_TOOL_TYPE,
  BLOCKGROUP_PLANNING_TOOL_TYPE,
} from "../../dashboard.constants"

import { DISTRICT_REPORT_TYPE, LOCALITY_REPORT_TYPE } from "app/features/report-finder/constants"
import type {
  AdvancedPlanningToolType
} from "../advanced-planning-tool/data-table/types"
import { useTranslation } from "react-i18next"



export const EquityScore: React.FC<ReportProps> = ({ reportData }) => {
  const { t } = useTranslation(["location-insights"])
  const { blockgroups, meta } = reportData
  const cx = "xl:w-4/5 w-full m-auto"
  const setTargetScoreNewCanopyDebounced = useSetAtom(targetScoreNewCanopyDebouncedAtom)
  const setTargetScoreExistingCanopyDebounced = useSetAtom(targetScoreExistingCanopyDebouncedAtom)
  const setTargetScoreNewCanopy = useSetAtom(targetScoreNewCanopyAtom)
  const setTargetScoreExistingCanopy = useSetAtom(targetScoreExistingCanopyAtom)
  const tableData = useAtomValue(tableDataAtom)
  const [blockgroupsBelowTarget, setBlockgroupsBelowTarget] = useState(blockgroups)
  const [selectedTab, setSelectedTab] = useAtom(planningSelectedTabAtom)
  const planningToolType: AdvancedPlanningToolType =
    meta.type === LOCALITY_REPORT_TYPE || meta.type === DISTRICT_REPORT_TYPE
      ? BLOCKGROUP_PLANNING_TOOL_TYPE
      : LOCALITY_PLANNING_TOOL_TYPE

  const targetScore = useAtomValue(targetScoreAtom)
  const handleSliderChangeCommited = (
    _: React.ChangeEvent<unknown>,
    newValue: number | number[]
  ) => {
    const update =
      selectedTab === "new"
        ? setTargetScoreNewCanopyDebounced
        : setTargetScoreExistingCanopyDebounced
    update(newValue as number)
  }

  const handleSliderChange = (_: React.ChangeEvent<unknown>, newValue: number | number[]) => {
    const updateDebounced =
      selectedTab === "new"
        ? setTargetScoreNewCanopyDebounced
        : setTargetScoreExistingCanopyDebounced
    updateDebounced(newValue as number)

    const update = selectedTab === "new" ? setTargetScoreNewCanopy : setTargetScoreExistingCanopy
    update(newValue as number)
  }

  const handleTabChange = (slug: string) => {
    setTargetScoreNewCanopy(DEFAULT_TARGET_SCORE_NEW_CANOPY)
    setTargetScoreExistingCanopy(0)
    setSelectedTab(slug as PlanningCanopyScenario)
  }

  useEffect(() => {
    if (!blockgroups) return
    const filteredBlockgroups = blockgroups.filter((n) => n.tree_equity_score < targetScore)
    setBlockgroupsBelowTarget(filteredBlockgroups)
  }, [blockgroups, targetScore])

  const numberOfBlockgroupsBelowTarget = blockgroupsBelowTarget.length
  const totalBlockgroups = blockgroups.length
  const sliderTitle = selectedTab === "new"
    ? t("location-insights:planning.slider_instructions")
    : t("location-insights:planning.existing_benefits")


  const sliderSubtitle = selectedTab === "new" ? t("location-insights:planning.slider_new_subtitle", {
    numberOfBlockgroupsBelowTarget,
    totalBlockgroups,
    localities: planningToolType !== BLOCKGROUP_PLANNING_TOOL_TYPE ? `in ${tableData.length} localities` : "",
    targetScore
  }) : t("location-insights:planning.slider_existing_subtitle", {
    numberOfBlockgroupsBelowTarget,
    totalBlockgroups,
    localityType: planningToolType === BLOCKGROUP_PLANNING_TOOL_TYPE ? "blockgroups" : "municipalities",
    targetScore
  })
  

  return (
    <section>
      <div
        className={twMerge(
          cx,
          "sticky xl:-top-36 md:-top-40 -top-52 z-40 xl:w-4/5 w-full shadow-[0_20px_20px_-20px_rgba(0,0,0,0.125)] md:px-10 px-5 bg-white"
        )}
      >
        <TabSection onChange={handleTabChange} />
        {blockgroupsBelowTarget && blockgroups && (
          <Slider
            title={sliderTitle}
            subtitle={sliderSubtitle}
            {...{
              targetScore,
              handleSliderChange,
              handleSliderChangeCommited,
            }}
          />
        )}
      </div>
      <div className={cx}>
        <Benefits
          {...{
            targetScore,
            blockgroups,
            reportType: reportData.meta.type,
            title: reportData.meta.title,
          }}
          colClassName={"md:h-[500px]"}
        />
      </div>
      <div className={cx}>
        <AdvancedPlanningTools
          title={reportData.meta.title}
          planningToolType={planningToolType}
          blockgroups={blockgroups}
          extraBlockgroups={reportData.extraBlockgroups}
          blockgroupsBelowTarget={blockgroupsBelowTarget}
        />
      </div>
    </section>
  )
}
