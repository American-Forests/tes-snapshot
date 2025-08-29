import type { Blockgroup } from "db"
import { Suspense, useEffect } from "react"
import { useTranslation } from "react-i18next"

import {
  DEFAULT_PLANNING_SECTION_TAB,
  DEFAULT_TARGET_SCORE_EXISTING_CANOPY,
  DEFAULT_TARGET_SCORE_NEW_CANOPY,
} from "./dashboard.constants"
import { ReportType } from "app/features/report-finder/types"
import {
  Header,
  Overview,
  EquityScore,
  Map,
  BlockgroupCardStack,
  Charts,
  HeatMap,
} from "./components"
import { useSetAtom } from "jotai"
import {
  planningSelectedTabAtom,
  targetScoreExistingCanopyAtom,
  targetScoreNewCanopyAtom,
} from "./dashboard.state"
import { ReleaseBanner } from "./components/release-banner"
import type { BlockgroupWithCenter } from "app/constants"

export type ReportProps = {
  reportData: {
    meta: {
      title: string
      slug: string
      shortTitle?: string
      type: ReportType
      compositeScore?: number
    }
    blockgroups: Blockgroup[] | BlockgroupWithCenter[]
    /**
     * Extra block groups that are not technically in the report area but whose
     * data is needed in order to correctly caculate composite score changes for
     * Localities in County and State reports.
     */
    extraBlockgroups?: Blockgroup[]
  }
}

export const Report: React.FC<ReportProps> = ({ reportData }) => {
  const sectionCx = "xl:w-4/5 w-full m-auto bg-white"
  const setTargetScoreNewCanopy = useSetAtom(targetScoreNewCanopyAtom)
  const setTargetScoreExistingCanopy = useSetAtom(targetScoreExistingCanopyAtom)
  const setSelectedTab = useSetAtom(planningSelectedTabAtom)
  const { t, i18n } = useTranslation(["location-insights"])

  useEffect(() => {
    setTargetScoreNewCanopy(DEFAULT_TARGET_SCORE_NEW_CANOPY)
    setTargetScoreExistingCanopy(DEFAULT_TARGET_SCORE_EXISTING_CANOPY)
    setSelectedTab(DEFAULT_PLANNING_SECTION_TAB)
  }, [])

  return (
    <>
      <div>
        <div className="bg-gray-100/60">
        {i18n.language === "en" && <ReleaseBanner />}
          <Header
            title={reportData.meta.title}
            reportType={reportData.meta.type}
            blockgroups={reportData.blockgroups}
            key={`${reportData.meta.title}-header`}
          />
          <Overview
            blockgroups={reportData.blockgroups}
            compositeScore={reportData.meta.compositeScore}
            locationName={reportData.meta.shortTitle ?? reportData.meta.title}
            key={`${reportData.meta.title}-overview`}
          />
          <EquityScore reportData={reportData} />
          <Charts
            title={reportData.meta.title}
            blockgroups={reportData.blockgroups}
            shortTitle={reportData.meta.shortTitle ?? reportData.meta.title}
            key={`${reportData.meta.title}-charts`}
          />
          <HeatMap
            className={sectionCx}
            title={reportData.meta.title}
            blockgroups={reportData.blockgroups}
            key={`${reportData.meta.title}-heatmap`}
          />
          <section className={sectionCx}>
            <Map blockgroups={reportData.blockgroups} key={`${reportData.meta.title}-map`} />
          </section>
          <section className={sectionCx}>
            <Suspense fallback={<span></span>}>
              <BlockgroupCardStack
                title={reportData.meta.title}
                blockgroups={reportData.blockgroups}
                compositeScore={reportData.meta.compositeScore}
                key={`${reportData.meta.title}-blockgroup-cardstack`}
              />
            </Suspense>
          </section>
          <section className="xl:w-4/5 w-full m-auto bg-white pb-3">
            <div className="m-auto text-center text-xs text-gray-600">
              <p>
                {t("location-insights:footer.copyright")}{" "}
                <img src="/af-logo.svg" className="w-24 inline -ml-2" />
              </p>
              <p className="-mt-2">
                {t("location-insights:footer.made_possible")}{" "}
                <img className="inline h-5" src="/google.png" />{" "}
                {t("location-insights:footer.ecosystem_services")}{" "}
                <img className="inline h-5" src="/itree.png" />
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
