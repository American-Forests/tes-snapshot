import type { LocalityLike, NeighborhoodLike } from "db"
import { HelpTooltip, RadarChart, SidebarNeighborhoodData, SidebarTreeEquityData } from "ui"
import { getPriorityLabel, getRadarChartData, percentage } from "app/features/sidebar/sidebar.utils"
import { SIDEBAR_HINTS, SidebarHints } from "app/features/sidebar/sidebar.constants"
import { twMerge } from "tailwind-merge"
import { floatToPercentage, localeWithDecimals } from "utils"

export const IntroSidebar = () => {
  const lisItemCx = "ml-8 mb-4 text-sm"
  const unorderedListCx = "list-disc ml-4 text-xs font-semibold pt-1"
  const numberedBulletsCx =
    "before:inline-block [counter-increment:list-number] before:content-[counter(list-number)] before:absolute before:left-1 before:text-black before:w-5 before:h-5 before:bg-brand-green-light before:rounded-full before:text-center before:font-extrabold"
  return (
    <div className="px-4 h-full flex flex-col text-gray-800">
      <div className="pt-3">
        <p className="pb-3 font-semibold text-sm">
          Tree Equity Score sets a national standard in each UK country to help make the case for
          investment in areas with greatest need.
        </p>
        <ol className="[counter-reset:list-number] relative">
          <li className={twMerge(lisItemCx, numberedBulletsCx)}>
            <p className="font-bold">Find your score.</p>
            <ul className={unorderedListCx}>
              <li>
                Search your address or browse the map of over 34,000 Tree Equity Scores for England,
                Wales, Scotland and Northern Ireland.
              </li>
            </ul>
          </li>
          <li className={twMerge(lisItemCx, numberedBulletsCx)}>
            <p className="font-bold">Uncover where trees are in your community.</p>
            <ul className={unorderedListCx}>
              <li className="pb-1">Click anywhere on the map to uncover more information.</li>
              <li className="pb-1">Toggle map layers to see patterns.</li>
              <li>Use convenient map filters to prioritize areas with the greatest need.</li>
            </ul>
          </li>

          <li className={twMerge(lisItemCx, numberedBulletsCx)}>
            <p className="font-bold">
              Locate data to support allocation of resources and inform local authority and
              community efforts.
            </p>
            <ul className={unorderedListCx}>
              <li className="pb-1">Compare neighbourhood data points.</li>
              <li className="pb-1">
                Find summary reports for any local authority, constituency or country.
              </li>
              <li className="pb-1">
                Communicate what it takes to raise Tree Equity Scores for a local authority,
                constituency or country.
              </li>
              <li className="pb-1">
                Communicate the critical health, economic and environmental benefits to the
                community.
              </li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  )
}

export const CanopyCoverProgressBar = ({
  featureData,
  helpTooltips,
}: {
  featureData: NeighborhoodLike | null
  helpTooltips: SidebarHints
}) => {
  return featureData ? (
    <div className="flex flex-col items-center justify-start py-4">
      <div className="flex justify-center text-base text-gray-600 font-semibold items-center">
        <span className="pr-1">Current canopy cover: {percentage(featureData.tree_canopy)}</span>
        <HelpTooltip>
          <p>{helpTooltips.tree_canopy}</p>
        </HelpTooltip>
      </div>
      <div
        style={{
          maxWidth: 250,
          borderColor: "#F36D53",
        }}
        className="relative w-full h-4 overflow-hidden border rounded-full"
      >
        <div
          className="absolute top-0 left-0 h-4 transition-all"
          style={{
            background: "#F36D53",
            width: `${percentage(featureData.tree_canopy / featureData.tree_canopy_goal)}`,
          }}
        ></div>
      </div>

      <div
        className="flex justify-center pt-1 text-sm font-semibold"
        style={{
          color: "#F36D53",
        }}
      >
        <div>
          <span className="pr-1">
            Canopy cover goal: {percentage(featureData.tree_canopy_goal)}
          </span>
          <HelpTooltip className="-mt-1">
            <span>{helpTooltips.tree_canopy_goal}</span>
          </HelpTooltip>
        </div>
      </div>
    </div>
  ) : null
}

export const PriorityIndexTitle = ({ priorityIndexHint }: { priorityIndexHint: string }) => (
  <section>
    <div className="flex items-center justify-center pt-1 font-semibold text-gray-700 text-sm">
      Score indicators
    </div>
    <div
      style={{
        color: "#F36D53",
      }}
      className="flex items-center justify-center text-sm font-semibold"
    >
      <span className="mr-1">Priority Index</span>
      <HelpTooltip>
        <span>{priorityIndexHint}</span>
      </HelpTooltip>
    </div>
  </section>
)

export const SidebarFeatureDataPanel = ({
  neighborhoodLikeData,
  localityData,
}: {
  neighborhoodLikeData: NeighborhoodLike
  localityData: LocalityLike
}) => {
  if (!neighborhoodLikeData) return null
  const chartData = getRadarChartData(neighborhoodLikeData)
  const {
    type,
    id,
    population,
    area,
    tree_equity_score,
    urban_area_proportion,
    rank,
    rank_group_size,
  } = neighborhoodLikeData

  const urbanArea = urban_area_proportion >= 0.1 ? floatToPercentage(urban_area_proportion) : "<1%"

  return (
    <>
      <SidebarNeighborhoodData
        populationHint={SIDEBAR_HINTS.population}
        urbanHint={SIDEBAR_HINTS.percent_urban}
        title={`${type} ID ${id}`}
        population={population}
        urbanArea={localeWithDecimals(area, 2)}
        areaType={type}
        urbanPercentage={urbanArea}
        location={`${localityData?.name}, ${localityData?.country}`}
      />
      <SidebarTreeEquityData
        priorityHint={SIDEBAR_HINTS.tree_equity_score_priority}
        priorityLabel={getPriorityLabel(tree_equity_score)}
        treeEquityScore={tree_equity_score}
        treeEquityScoreHint={SIDEBAR_HINTS.tree_equity_score}
        rank={rank}
        rankSize={rank_group_size}
        rankRegion={localityData.name}
        areaType={type}
      />
      <CanopyCoverProgressBar featureData={neighborhoodLikeData} helpTooltips={SIDEBAR_HINTS} />
      <PriorityIndexTitle priorityIndexHint={SIDEBAR_HINTS.priority_index} />
      <div className="flex flex-row justify-center">
        <RadarChart width={380} height={250} radius={60} data={chartData} />
      </div>
    </>
  )
}
