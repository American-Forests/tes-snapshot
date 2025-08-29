import { floorPercentage, percentage } from "data/facets"
import type { Blockgroup } from "db"
import Help from "./help"
import { useContext } from "react"
import { CityContext } from "app/features/regional-map/regional-map.state"
import { useTranslation } from "react-i18next"

/**
 * This is more a "progress bar" chart than a bar chart,
 * to be honest. It is displayed in the pinned popup.
 */
export default function BarChart({ properties }: { properties: Blockgroup }) {
  const { t } = useTranslation(["map"])
  const { tree_equity_score, tree_canopy, tree_canopy_goal } = properties
  const city = useContext(CityContext)
  const achieved = tree_equity_score === 100

  if (achieved) {
    return (
      <div className="flex justify-center text-center text-brand-green-dark font-semibold text-base pt-4">
        <p>
          <svg
            className="mr-1 -mt-1 inline"
            width="13"
            height="13"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.312 12.875c.725 0 1.313-.588 1.313-1.312V1.938c0-.725-.588-1.313-1.313-1.313H1.687C.963.625.375 1.213.375 1.938v9.625c0 .724.588 1.312 1.312 1.312h9.625zm0-1.312H1.687V1.938h9.625v9.625zm-5.7-1.929l4.72-4.681a.328.328 0 00.002-.464l-.617-.621a.328.328 0 00-.464-.002L5.388 7.7 3.753 6.052a.328.328 0 00-.464-.002l-.62.616a.328.328 0 00-.003.464L5.15 9.632c.127.129.335.13.464.002z"
              fill="#33966d"
            />
          </svg>
          {t("map:sidebar.canopy_goal_achived", { percentage: floorPercentage(tree_canopy) })}
          <br />
          <p className="text-gray-600 text-xs font-semibold pb-6">
            {t("map:sidebar.canopy_cover_goal", { percentage: percentage(tree_canopy_goal) })}
          </p>
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-start pt-4">
      <div className="flex justify-center text-base text-gray-600 font-semibold items-center">
        <span className="pr-1">
          {`${t("map:sidebar.current_canopy_cover")} ${floorPercentage(tree_canopy)}`}
        </span>
        <Help>
          <p>{`${t("map:sidebar.current_canopy_cover_tooltip")}`}</p>
        </Help>
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
            width: `${floorPercentage(tree_canopy / tree_canopy_goal)}`,
          }}
        ></div>
      </div>

      <div
        className="flex justify-center pt-1 text-xs font-semibold"
        style={{
          color: "#F36D53",
        }}
      >
        <div>
          <span className="pr-1 capitalize">
            {t("map:sidebar.canopy_cover_goal", { percentage: percentage(tree_canopy_goal) })}
          </span>
          <Help className="-mt-1">
            <span>
              {t("map:sidebar.canopy_cover_tooltip", {
                blockgroup:
                  city?.id === "toronto"
                    ? t("common:neighbourhood")
                    : city
                    ? t("common:neighborhood")
                    : t("common:blockgroup"),
              })}
            </span>
          </Help>
        </div>
      </div>
    </div>
  )
}
