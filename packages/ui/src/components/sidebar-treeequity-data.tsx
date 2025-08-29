import { HelpTooltip } from "./help-tooltip"
import { getOrdinal } from "utils"

export const SidebarTreeEquityData = ({
  priorityHint,
  priorityLabel,
  treeEquityScore,
  treeEquityScoreHint,
  rank,
  rankSize,
  rankRegion,
  areaType,
}: {
  priorityHint: string
  priorityLabel: string
  treeEquityScore: number
  treeEquityScoreHint: string
  rank: number | null
  rankSize: number | null
  rankRegion: string | null
  areaType: string
}) => (
  <div className="grid grid-cols-2 pb-3">
    <div className="flex flex-col items-center pl-5 border-r">
      <p className="text-5xl font-black text-brand-green-dark">
        {Math.floor(treeEquityScore)}
      </p>
      <p className="flex items-center text-sm font-semibold text-brand-green-dark">
        <span className="mr-1">Tree Equity Score</span>
        <HelpTooltip>{<p>{treeEquityScoreHint}</p>}</HelpTooltip>
      </p>
    </div>
    <div className="flex flex-col items-start justify-center pl-4">
      <div>
        <p className="text-gray-600 text-xs font-semibold pt-2 pr-2">
          {`Ranked ${rank && getOrdinal(rank)} of ${rankSize} ${areaType}s`}
        </p>
        <p className="text-gray-600 text-xs font- pr-2">{`in ${rankRegion}`}</p>
        <div className="flex flex-row items-center">
          <p className="text-gray-600 mr-1 pt-2 text-sm font-semibold">
            Priority: <span className="text-[#F36D53]">{priorityLabel}</span>
          </p>
          <HelpTooltip className="mt-2">
            <p>{priorityHint}</p>
          </HelpTooltip>
        </div>
      </div>
    </div>
  </div>
)
