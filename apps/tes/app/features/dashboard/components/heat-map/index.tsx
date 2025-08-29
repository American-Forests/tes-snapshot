import { twMerge } from "tailwind-merge"
import { useTranslation } from "react-i18next"
import { HeatMap as HeatMapUI } from "./heat-map-chart"

import { HEAT_MAP_COLUMNS_STOPS } from "../../dashboard.constants"
import { getHeatmapBlockgroupsData } from "../../utils"
import type { Blockgroup } from "@prisma/client"

export const HeatMap = ({
  title,
  blockgroups,
  className,
}: {
  title: string
  blockgroups: Blockgroup[]
  className?: string
}) => {
  const { t } = useTranslation(["location-insights", "facets"])
  const heatMapData = getHeatmapBlockgroupsData(blockgroups)
  const heatmapWrapperCx =
    "mx-auto flex flex-col items-start justify-start lg:flex-row-reverse lg:px-10 md:px-32 sm:px-10 px-4"
  const heatmapExplanationCx =
    "flex flex-col justify-start pt-7 text-brand-green-darker lg:h-[28rem] lg:max-w-[30rem] lg:justify-between lg:pl-10"
  const dividerCx = "my-4 w-full border-t border-gray-200"

  return (
    <section className={twMerge(className, heatmapWrapperCx, "bg-white pb-12 -mt-8")}>
      <div className={heatmapExplanationCx}>
        <div>
          <h3 className="pb-0 text-caption font-bold text-brand-green-darker uppercase">{title}</h3>
          <h4 className="py-1 text-3xl font-bold text-brand-green-darker">
            {t("location-insights:heatmap.title")}
          </h4>
          <p className="pb-3 text-lg lg:pt-6 text-gray-700">
            {t("location-insights:heatmap.subtitle")}
          </p>
        </div>
        <div>
          <div className={dividerCx} />
          <h4 className="pb-0 text-sm font-bold text-brand-green-darker uppercase">
            {t("location-insights:heatmap.explanation_title")}
          </h4>
          <p className="text-brand-gray-dark text-caption">
            {t("location-insights:heatmap.explanation")}
          </p>
        </div>
      </div>
      <HeatMapUI
        items={heatMapData}
        stops={HEAT_MAP_COLUMNS_STOPS}
        title={t("facets:tree_equity_score.name")}
      />
    </section>
  )
}
