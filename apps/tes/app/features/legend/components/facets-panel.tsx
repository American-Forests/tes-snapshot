import { CheckCircledIcon } from "@radix-ui/react-icons"
import { Facet, facetGroups } from "data/facets"
import { LevelName } from "app/constants"
import { facetsAtom } from "app/state"
import { BaseMapStyle, MUTED_MAP_STYLE, SATELLITE_MAP_STYLE } from "hooks/use_base_map"
import { useAtomValue } from "jotai"
import React, { useCallback, type Dispatch, type SetStateAction } from "react"
import { LegendBackHeader } from "./legend-back-header"
import { FacetTooltip } from "./facet-tooltip"
import { FacetName } from "./facet-name"
import { City } from "@prisma/client"
import { useTranslation } from "react-i18next"

function FacetOption({
  facet,
  active,
  onClick,
  city,
}: {
  facet: Facet
  active: boolean
  onClick: () => void
  city?: City
}) {
  return (
    <button
      key={facet?.field?.field}
      className={`transition-all flex items-center justify-between gap-x-1 group text-sm cursor-pointer rounded-full py-0.5 px-1 ${
        active
          ? "text-white bg-brand-green-dark"
          : "text-gray-700 hover:text-white hover:bg-brand-green"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <CheckCircledIcon
          className={`text-white transition-all inline mr-2 group-hover:text-brand-green`}
        />
        <FacetName facetKey={facet?.field?.field} />
      </div>
      <FacetTooltip facetKey={facet?.field?.field} active={active} city={city} />
    </button>
  )
}

const FacetWithSublayersOption = ({
  facet,
  active,
  onClick,
  activeFacet,
  city,
}: {
  facet: Facet
  active: boolean
  onClick: (facet: Facet) => void
  activeFacet: Facet | null
  city?: City
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const handleShowSublayers = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  return (
    <div className="relative">
      <button
        className={`w-full transition-all flex items-center justify-between gap-x-1 group text-sm cursor-pointer rounded-t-md py-0.5 px-1 ${
          active ? "text-gray-700" : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
        }`}
        onClick={handleShowSublayers}
      >
        <div className="flex items-center">
          <svg
            className="w-4 h-4 mr-2 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={active ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"}
            />
          </svg>
          <FacetName facetKey={facet.title} />
        </div>

        <FacetTooltip facetKey={facet.title} city={city} hasSublayers={true} />
      </button>

      {isOpen && (
        <div className="w-full bg-white">
          {facet.sublayers?.map((sublayer: Facet) => {
            const isSelected = activeFacet?.field.field === sublayer.field.field
            return (
              <button
                key={sublayer.field.field}
                className={`transition-all flex items-center w-[95%] mb-1 justify-self-end  text-sm cursor-pointer rounded-full py-0.5 px-1 ${
                  isSelected
                    ? "text-white bg-brand-green-dark rounded-full"
                    : "text-gray-700 hover:text-white hover:bg-brand-green"
                }`}
                onClick={() => {
                  onClick(sublayer)
                }}
              >
                <CheckCircledIcon
                  className={`${
                    isSelected ? "text-white" : "opacity-0"
                  } transition-all inline mr-2`}
                />
                <FacetName facetKey={sublayer.field.field} />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function BaseMapOption(props: {
  title: string
  style: BaseMapStyle
  setBaseMapStyle: Dispatch<SetStateAction<BaseMapStyle>>
  currentBaseMapStyle: BaseMapStyle
}) {
  const { title, style, setBaseMapStyle, currentBaseMapStyle } = props
  return (
    <>
      <button
        className={`transition-all flex items-center gap-x-1 group text-sm cursor-pointer rounded-full py-0.5 px-1 ${
          style === currentBaseMapStyle
            ? "text-white bg-brand-green-dark"
            : "text-gray-500 hover:bg-brand-green hover:text-white"
        }`}
        onClick={() => setBaseMapStyle(style)}
      >
        <svg className={`w-4 h-4 text-white`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {title}
      </button>
    </>
  )
}

export const FacetsPanel = ({
  activeFacet,
  currentLevel,
  baseMapStyle,
  onModeChange,
  setActiveFacet,
  setBaseMapStyle,
  city,
}: {
  activeFacet: Facet
  currentLevel: LevelName
  baseMapStyle: BaseMapStyle
  setActiveFacet: React.Dispatch<React.SetStateAction<Facet | null>>
  setBaseMapStyle: React.Dispatch<React.SetStateAction<BaseMapStyle>>
  onModeChange: React.Dispatch<React.SetStateAction<"facets" | "filters" | null>>
  city?: City
}) => {
  const facets = useAtomValue(facetsAtom)
const {t} = useTranslation(["map"])
  return (
    <div className="w-full pb-3">
      <LegendBackHeader title={t("common:layers")} onClick={() => onModeChange(null)} />
      <div className="p-3 space-y-4">
        {facetGroups.map((facetGroup) => {
          if (facetGroup.title === "Hide") return null
          return (
            <div key={facetGroup.title}>
              {facets.filter(
                (facet) =>
                  facet.group === facetGroup &&
                  facet.field?.type === (currentLevel == "Parcel" ? "Area" : currentLevel)
              ).length > 0 && (
                <div className="pb-1 text-xs text-gray-600 uppercase font-semibold">
                  {t(`${facetGroup.title}`)}
                </div>
              )}
              <div className="flex flex-col items-stretch space-y-1">
                {facets
                  .filter(
                    (facet) =>
                      facet.group?.title === facetGroup.title &&
                      facet.field?.type === (currentLevel == "Parcel" ? "Area" : currentLevel)
                  )
                  .map((facet) => {
                    const active = facet.field?.field === activeFacet?.field.field
                    return facet.sublayers && facet.sublayers.length > 0 ? (
                      <FacetWithSublayersOption
                        key={facet.field.field}
                        facet={facet as Facet}
                        active={active}
                        activeFacet={activeFacet}
                        city={city}
                        onClick={(facet: Facet) => {
                          if (active) setActiveFacet(null)
                          else setActiveFacet(facet)
                        }}
                      />
                    ) : (
                      <FacetOption
                        key={facet.field.field}
                        facet={facet as Facet}
                        active={active}
                        city={city}
                        onClick={() => {
                          if (active) setActiveFacet(null)
                          else setActiveFacet(facet as Facet)
                        }}
                      />
                    )
                  })}
              </div>
            </div>
          )
        })}
        <div>
          <div className="pb-1 text-xs text-gray-600 uppercase font-semibold">{t("map:legend.base_map")}</div>
          <div className="flex flex-col items-stretch space-y-1">
            <BaseMapOption
              title={t("map:legend.default")}
              style={MUTED_MAP_STYLE}
              setBaseMapStyle={setBaseMapStyle}
              currentBaseMapStyle={baseMapStyle}
            />
            <BaseMapOption
              title={t("map:legend.satellite")}
              style={SATELLITE_MAP_STYLE}
              setBaseMapStyle={setBaseMapStyle}
              currentBaseMapStyle={baseMapStyle}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
