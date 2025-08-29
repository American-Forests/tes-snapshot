import { useEffect, useState } from "react"
import { useQuery } from "@blitzjs/rpc"
import getNeighborhoodLike from "app/queries/get-neighborhood-like"
import { useAtomValue } from "jotai"
import { clickedFeatureAtom } from "app/features/map/map.state"
import { NEIGHBORHOOD_LIKE_SOURCE } from "app/features/map/map.constants"
import { HelpTooltip } from "ui"
import MapClickReportOptions from "./components/map-click-report-options"

export const ReportFinder = ({ className }: { className?: string }) => {
  const clickedFeature = useAtomValue(clickedFeatureAtom)
  const [clickedFeatureId, setClickedFeatureId] = useState<string | null>(null)
  const [neighborhood] = useQuery(
    getNeighborhoodLike,
    { id: clickedFeatureId! },
    { enabled: !!clickedFeatureId }
  )

  useEffect(() => {
    if (!clickedFeature) {
      setClickedFeatureId(null)
      return
    }

    if (
      clickedFeature.source === NEIGHBORHOOD_LIKE_SOURCE &&
      clickedFeature.properties &&
      clickedFeature.properties.id
    ) {
      setClickedFeatureId(clickedFeature.properties.id)
    }
  }, [clickedFeature])

  return (
    <div className={className ? className : ""}>
      <div className="bg-white rounded-md w-[180px] md:w-[220px] p-2 flex flex-col shadow-lg items-center h-fit">
        <div className="flex flex-row justify-between mb-2 items-center w-full">
          <p className="text-md md:text-lg text-brand-green-dark pl-2">Find a report...</p>
          <HelpTooltip className="-ml-8">
            <p>
              Dynamic reports can assist you in effectively communicating what it takes to raise
              Tree Equity Scores at a regional level. Access valuable summary metrics and
              interactive visualizations to gain insights for your area of interest. Use
              computational tools to assess scenarios and highlight the numerous benefits that can
              be gained by raising Tree Equity Scores within your community. <br />
              <br />
              Dynamic reports are available at three administrative scales: local authority (e.g., a
              town, city or county), constituency and country..
            </p>
          </HelpTooltip>
        </div>
        <MapClickReportOptions neighborhood={neighborhood} />
      </div>
    </div>
  )
}
