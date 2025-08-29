import React, { useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import { Facet, FacetStyle, range } from "data/facets"
import { LevelName, MAX_FILL_OPACITY, MUNICIPALITY_LEVEL_NAME } from "app/constants"
import { ChevronDownIcon, LayersIcon } from "@radix-ui/react-icons"
import { styledButton2 } from "components/elements"
import { City } from "@prisma/client"
import { BaseMapStyle } from "hooks/use_base_map"
import { ContinuousKey, DiscreteKey, ContinuousKeyProps, DiscreteKeyProps } from "ui"
import { FiltersPanel } from "./components/filters-panel"
import { FacetsPanel } from "./components/facets-panel"
import { useTranslation } from "react-i18next"

function getLengendRange(data: range): [number, number] {
  return [data.gradient[0]!, data.gradient[data.gradient.length - 1]!]
}

function getContinuousGradient(style: FacetStyle, data: range) {
  const [legendStart, legendEnd] = getLengendRange(data)
  const dataGradient = [...data.gradient]
  const gradientStops = dataGradient
    .splice(1, data.gradient.length - 2)
    .map((d, i) => {
      return `${style.fill[i]} ${((d - legendStart) / (legendEnd - legendStart)) * 100}%`
    })
    .join(",")
  const gradient = `linear-gradient(to right, ${gradientStops})`
  return gradient
}

function Ramp({ activeFacet }: { activeFacet: Facet }) {
  if (activeFacet) {
    const { data, formatter, style } = activeFacet
    const getStartLabel = (legendStart: number, activeFacet: Facet) => {
      const startLabel = formatter ? formatter(legendStart) : "" + legendStart
      if (activeFacet.field?.field === "tree_equity_score") {
        return "<" + startLabel
      }
      return startLabel
    }
    const getEndLabel = (legendEnd: number, activeFacet: Facet) => {
      const endLabel = formatter ? formatter(legendEnd) : "" + legendEnd
      if (activeFacet.field?.field.includes("shade")) {
        return ">" + endLabel
      }
      return endLabel
    }

    const getLegendTitle = (activeFacet: Facet) => {
      const { t } = useTranslation(["facets"])
      if (activeFacet.field?.field.includes("shade")) {
        return `${t(`facets:${activeFacet.field.field}.name`)} ${t("common:total_shade")}`
      }
      return t(`facets:${activeFacet.field.field}.name`)
    }
    if (data.type === "range" && style) {
      const [legendStart, legendEnd] = getLengendRange(data)
      const continuousKeyProps: ContinuousKeyProps = {
        title: getLegendTitle(activeFacet),
        startLabel: getStartLabel(legendStart, activeFacet),
        endLabel: getEndLabel(legendEnd, activeFacet),
        gradient: getContinuousGradient(style, data),
      }

      return <ContinuousKey {...continuousKeyProps} />
    } else if (data.type === "enum" && style) {
      const discreteKeyProps: DiscreteKeyProps = {
        title: activeFacet.title,
        type: data.type,
        labels: data.values.map((d) => d + ""),
        colors: style.fill,
        opacities: style.opacity?.map((opacity) => opacity * MAX_FILL_OPACITY),
      }

      return <DiscreteKey {...discreteKeyProps} />
    } else return null
  } else {
    return null
  }
}

function LayerAndFilterControls({
  activeFacet,
  setActiveFacet,
  currentLevel,
  baseMapStyle,
  setBaseMapStyle,
  city,
}: {
  activeFacet: Facet
  setActiveFacet: Dispatch<SetStateAction<Facet | null>>
  currentLevel: LevelName
  baseMapStyle: BaseMapStyle
  setBaseMapStyle: Dispatch<SetStateAction<BaseMapStyle>>
  city?: City
}) {
  const [mode, setMode] = useState<"facets" | "filters" | null>(null)
  const { t } = useTranslation(["common"])

  return (
    <>
      {mode === "facets" ? (
        <FacetsPanel
          onModeChange={setMode}
          activeFacet={activeFacet}
          currentLevel={currentLevel}
          baseMapStyle={baseMapStyle}
          setActiveFacet={setActiveFacet}
          setBaseMapStyle={setBaseMapStyle}
          city={city}
        />
      ) : mode === "filters" ? (
        <FiltersPanel currentLevel={currentLevel} onModeChange={setMode} city={city} />
      ) : (
        <div className="w-full">
          <div className="grid grid-cols-2 items-center gap-x-2 px-4 py-3">
            <button
              className={styledButton2({ variant: "outline" })}
              onClick={() => setMode("facets")}
            >
              <LayersIcon />
              {t("common:layers")}
              <ChevronDownIcon />
            </button>
            <button
              className={styledButton2({ variant: "outline" })}
              onClick={() => setMode("filters")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transform rotate-90"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
              {t("common:filters")}
              <ChevronDownIcon />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export function Legend({
  activeFacet,
  setActiveFacet,
  currentLevel,
  baseMapStyle,
  setBaseMapStyle,
  city,
}: {
  activeFacet: Facet
  setActiveFacet: Dispatch<SetStateAction<Facet | null>>
  currentLevel: LevelName
  city: City
  baseMapStyle: BaseMapStyle
  setBaseMapStyle: Dispatch<SetStateAction<BaseMapStyle>>
}) {
  return (
    <div className="divide-y divide-gray-300 bg-white transition-all border-t border-t-gray-300">
      {currentLevel !== MUNICIPALITY_LEVEL_NAME && (
        <LayerAndFilterControls
          activeFacet={activeFacet}
          setActiveFacet={setActiveFacet}
          currentLevel={currentLevel}
          baseMapStyle={baseMapStyle}
          setBaseMapStyle={setBaseMapStyle}
          city={city}
        />
      )}
      <Ramp activeFacet={activeFacet} />
    </div>
  )
}
