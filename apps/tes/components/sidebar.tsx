import React, { useState, useCallback, Suspense, useContext } from "react"
import mapboxgl from "mapbox-gl"
import { useQuery } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useAtomValue } from "jotai"
import Logo from "public/tree-equity-score-analyzer.png"
import { formatNumber } from "app/utils/formatting_utils"
import { squareKilometersToSquareFeet } from "app/utils/conversion_utils"
import {
  AGGREGATED_MUNICIPALITY_LAYER_NAME,
  AGGREGATED_MUNICIPALITY_LEVEL_NAME,
  BLOCKGROUP_LAYER_NAME,
  BLOCKGROUP_LEVEL_NAME,
  BlockgroupWithSupplemental,
  LEVELS,
  MUNICIPALITY_LAYER_NAME,
  MUNICIPALITY_LEVEL_NAME,
  PARCEL_LAYER_NAME,
  PARCEL_LEVEL_NAME,
  RIGHT_OF_WAY_LAYER_NAME,
} from "app/constants"
import RadarChart from "./radar_chart"
import classed from "classed-components"
import clsx from "clsx"
import BarChart from "./bar_chart"
import { CityContext } from "app/features/regional-map/regional-map.state"
import type { City } from "app/features/regional-map/regional-map.types"
import { City as CityModel } from "@prisma/client"
import type { Blockgroup, Area } from "db"
import Help from "./help"
import { Facet, percentage } from "data/facets"
import { Legend } from "app/features/legend"
import { LevelName } from "app/constants"
import { hoveredFeatureAtom, selectedFeatureAtom } from "app/state"
import { BaseMapStyle } from "hooks/use_base_map"
import getFeature from "app/features/queries/getFeature"
import { TesLogo } from "./tes_logo"
import { formatNumberWithPostfix } from "app/utils/formatting_utils"
import { SymbolIcon } from "@radix-ui/react-icons"
import { squareKilometersToSquareMeters } from "utils"
import { useTranslation } from "react-i18next"
import { useCurrentLanguage } from "app/features/i18n/i18n.hooks"

const ZoomButton = classed.button(({ active = false }: { active?: boolean }) =>
  clsx([
    {
      "bg-gray-200 text-black": active,
      "text-brand-green-dark hover:bg-gray-50 hover:text-gray-700": !active,
    },
    "transition-all py-3 text-xs font-bold",
  ])
)

const NationalDirections = () => {
  const { t } = useTranslation(["map"])
  return (
    <div className="p-4 h-full flex flex-col justify-between text-gray-800">
      <div className="pt-3">
        <ol className="[counter-reset:list-number] relative">
          <li className="ml-8 mb-2 before:inline-block [counter-increment:list-number] before:content-[counter(list-number)] before:absolute before:left-1 before:text-black before:w-6 before:bg-brand-green-light before:rounded-full before:text-center before:font-extrabold">
            <p className="font-bold text-sm pt-1">{t("map:explanation_score_header")}</p>
            <ul className="list-disc ml-4 text-xs font-semibold pb-2 pt-1">
              <li>{t("map:explanation_score_text")}</li>
            </ul>
          </li>
          <li className="ml-8 mb-2 before:inline-block [counter-increment:list-number] before:content-[counter(list-number)] before:absolute before:left-1 before:text-black before:w-6 before:bg-brand-green-light before:rounded-full before:text-center before:font-extrabold">
            <p className="font-bold text-sm pt-1">{t("map:explanation_story_header")}</p>
            <ul className="list-disc ml-4 text-xs font-semibold pb-1 pt-1">
              <li className="pb-1">{t("map:explanation_story_text1")}</li>
              <li className="pb-1">{t("map:explanation_story_text2")}</li>
              <li>{t("map:explanation_story_text3")}</li>
            </ul>
          </li>
          <li className="ml-8 mb-2 before:inline-block [counter-increment:list-number] before:content-[counter(list-number)] before:absolute before:left-1 before:text-black before:w-6 before:bg-brand-green-light before:rounded-full before:text-center before:font-extrabold">
            <p className="font-bold text-sm pt-1">{t("map:explanation_case_header")}</p>
            <ul className="list-disc ml-4 text-xs font-semibold pb-1 pt-1">
              <li className="pb-1">{t("map:explanation_case_text1")}</li>
              <li className="pb-1">{t("map:explanation_case_text2")}.</li>
              <li className="pb-1">{t("map:explanation_case_text3")}</li>
            </ul>
          </li>
        </ol>
      </div>

      <div className="mt-4">
        <Logos />
      </div>
    </div>
  )
}

const TESADirections = () => (
  <div className="p-4 h-full flex flex-col justify-between text-gray-800">
    <div className="pt-3">
      <ol className="[counter-reset:list-number] relative">
        <li className="ml-8 mb-2 before:inline-block [counter-increment:list-number] before:content-[counter(list-number)] before:absolute before:left-1 before:text-black before:w-6 before:bg-brand-green-light before:rounded-full before:text-center before:font-extrabold">
          <p className="font-bold text-sm pt-1">
            Find areas of the most need using Tree Equity Score and other data.
          </p>
          <ul className="list-disc ml-4 text-xs font-semibold pb-2 pt-1">
            <li>Search a location or address, or browse the map.</li>
          </ul>
        </li>
        <li className="ml-8 mb-2 before:inline-block [counter-increment:list-number] before:content-[counter(list-number)] before:absolute before:left-1 before:text-black before:w-6 before:bg-brand-green-light before:rounded-full before:text-center before:font-extrabold">
          <p className="font-bold text-sm pt-1">
            Uncover the hidden story behind where trees are in your community.
          </p>
          <ul className="list-disc ml-4 text-xs font-semibold pb-1 pt-1">
            <li className="pb-1">
              Click or tap the shaded areas on the map to discover more information.
            </li>
            <li className="pb-1">Toggle map layers to explore patterns.</li>
            <li>Identify areas with the greatest need for investment.</li>
          </ul>
        </li>
        <li className="ml-8 mb-2 before:inline-block [counter-increment:list-number] before:content-[counter(list-number)] before:absolute before:left-1 before:text-black before:w-6 before:bg-brand-green-light before:rounded-full before:text-center before:font-extrabold">
          <p className="font-bold text-sm pt-1">Start planning.</p>
          <ul className="list-disc ml-4 text-xs font-semibold pb-1 pt-1">
            <li className="pb-1">Set Tree Equity Score targets and compute the trees needed.</li>
            <li className="pb-1">
              Evaluate existing tree cover and available space on each property.
            </li>
            <li>
              Build a planting and protection scenario site-by-site to work toward your target.
            </li>
          </ul>
        </li>
        <li className="ml-8 mb-2 before:inline-block [counter-increment:list-number] before:content-[counter(list-number)] before:absolute before:left-1 before:text-black before:w-6 before:bg-brand-green-light before:rounded-full before:text-center before:font-extrabold">
          <p className="font-bold text-sm pt-1">Make the case with data and reports.</p>
          <ul className="list-disc ml-4 text-xs font-semibold pt-1">
            <li className="pb-1">
              Compute the benefits of your tree planting and protection projects.
            </li>
            <li className="pb-1">Create and share scenario reports.</li>
          </ul>
        </li>
      </ol>
    </div>

    <div className="mt-4">
      <Logos />
    </div>
  </div>
)

/* defaults to congressional district, but for Toronto, gets neighbourhood and id */
function getDistricts(city: City | null, featureData: BlockgroupWithSupplemental) {
  return city && city.id === "toronto"
    ? `${featureData.neighborhood} | ${featureData.neighborhood_id}`
    : featureData.congressional_district
}

function Num({ val, label }: { val: number | null; label: string }) {
  return (
    <div>
      <div className="text-xl text-brand-green text-center">
        {val === null ? "N/A" : percentage(val)}
      </div>
      <div className="text-brand-green text-xs text-center">{label}</div>
    </div>
  )
}

/**
 * formatted jsx for displaying municipality info in sidebar
 */
function municipalityPanel() {
  return null
}

const BlockgroupPanel = ({
  featureData,
  onMouseOver,
  onMouseOut,
  hovering,
  isNational,
}: {
  featureData: BlockgroupWithSupplemental
  onMouseOver: (facet: Facet) => void
  onMouseOut: () => void
  hovering: Facet | null
  isNational: boolean
}) => {
  const { t } = useTranslation(["facets", "common", "map"])
  const city = useContext(CityContext)

  const getPriority = (tes: number) => {
    if (tes === 100) return "common:priority_none"
    else if (tes < 100 && tes >= 90) return "common:priority_low"
    else if (tes < 90 && tes >= 80) return "common:priority_moderate"
    else if (tes < 80 && tes >= 70) return "common:priority_high"
    return "common:priority_highest"
  }

  return (
    <>
      <div className="bg-white">
        <div className="grid">
          <div className="flex flex-col items-center pt-6 pb-3">
            <p className="font-bold text-sm text-brand-green-dark">
              {`${t("common:census")} `}
              {city && city.locale && city.locale === "en-CA"
                ? `${t("common:canadian_tract")} `
                : `${t("common:blockgroup")} `}
              {featureData.id}
            </p>
            <div className="flex flex-row justify-center items-center pb-1">
              <p
                className={`${
                  (featureData.clipped_bg_population || featureData.total_population) < 20
                    ? "text-[15px] text-[#E94D4D]"
                    : "text-[13px] text-brand-green-dark"
                } font-semibold mr-1`}
              >
                {`${t("common:population")} `}
                {(featureData.clipped_bg_population || featureData.total_population).toLocaleString(
                  "en"
                )}
              </p>
              <Help>
                <p>
                  {city?.locale === "en-CA"
                    ? `${t("map:population_sources_CA_tooltip")}`
                    : `${t("map:population_sources_US_tooltip")}`}
                </p>
              </Help>
            </div>
            <p className="text-gray-600 font-semibold text-sm">
              {featureData.incorporated_place_name
                ? featureData.incorporated_place_name
                : featureData.county}
              , {featureData.state?.toUpperCase()}
            </p>
            {/**
             * TODO: make congressional district nullable / have a better way of not displaying this info
             */}
            <p className="text-gray-600 text-xs font-semibold">{getDistricts(city, featureData)}</p>
          </div>
          <div className="grid grid-cols-2 pb-3 pt-6">
            <div className="flex flex-col items-center pl-5 border-r">
              <p className="text-5xl font-black text-brand-green-dark">
                {Math.floor(featureData.tree_equity_score)}
              </p>
              <p className="flex items-center text-sm font-semibold text-brand-green-dark">
                <span className="mr-1">{`${t("facets:tree_equity_score.name")}`}</span>
                <Help>
                  <p>{`${t("facets:tree_equity_score.description")}`}</p>
                </Help>
              </p>
            </div>
            <div className="flex flex-col items-start justify-center pl-4">
              <div>
                {isNational &&
                  featureData.incorporated_place_name &&
                  featureData.rank &&
                  featureData.rank_group_size && (
                    <p className="text-gray-600 text-xs font-semibold pt-2 pr-2">
                      {t("map:sidebar.national_rank", {
                        rank: formatNumberWithPostfix(featureData.rank),
                        total: featureData.rank_group_size,
                        place: featureData.incorporated_place_name,
                      })}
                    </p>
                  )}
                <div className="flex flex-row items-center">
                  <p className="text-gray-600 mr-1 pt-2 text-sm font-semibold">
                    {`${t("common:priority")} `}
                    <span className="text-[#F36D53] uppercase">
                      {t(getPriority(featureData.tree_equity_score))}
                    </span>
                  </p>
                  <Help className="mt-2">
                    <p>{`${t("map:priority_tooltip")}`}</p>
                  </Help>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-2 pb-8">
          <BarChart properties={featureData as Blockgroup} />
        </div>

        <div className="">
          <div className="flex items-center justify-center pt-1 font-semibold text-gray-700 text-sm">
            {t("map:sidebar.score_indicators")}
          </div>
          <div
            style={{
              color: "#F36D53",
            }}
            className="flex items-center justify-center text-xs font-semibold"
          >
            <span className="mr-1">{t("map:sidebar.priority_index")}</span>
            <Help>
              <span>
                {t("map:sidebar.priority_tooltip")}
              </span>
            </Help>
          </div>
        </div>
        <div className="flex flex-col items-center pb-2">
          <RadarChart
            properties={featureData as Blockgroup}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            hovered={hovering}
          />
        </div>
      </div>
    </>
  )
}

const AreaPanel = ({ featureData }: { featureData: Area }) => {
  const { t } = useTranslation(["common"])
  const isParcel = featureData.type === "PARCEL"
  const city = useContext(CityContext)
  if (!("type" in featureData)) return null
  return (
    <div>
      <div className="flex flex-col items-center pt-5 pb-3 border-r border-gray-200">
        <div className="text-3xl font-black md:text-5xl text-brand-green">
          {formatNumber(featureData.tree_canopy * 100)}%
        </div>
        <div className="flex items-center text-md text-brand-green">
          <span className="mr-1">Tree Canopy</span>
        </div>
      </div>
      <div className="font-semibold pt-4 text-center px-4">
        {isParcel ? t("common:parcel") : t("common:right_of_way")} | {featureData.address}
      </div>
      {city ? (
        <AreaDetails featureData={featureData} locale={city.locale} />
      ) : (
        <AreaDetails featureData={featureData} />
      )}
    </div>
  )
}

/**
 * @param featureData
 * @returns formatted jsx for displaying parcel/row info in sidebar
 */
function AreaDetails({ featureData, locale }: { featureData: Area; locale?: string }) {
  const { t } = useTranslation(["map"])
  return (
    <div className="px-4 py-4">
      <div className="font-bold uppercase text-xs text-center pb-2">Area</div>
      <div className="text-s text-center pb-2">
        {formatNumber(
          locale && locale === "en-CA"
            ? squareKilometersToSquareMeters(featureData.area_sqkm)
            : squareKilometersToSquareFeet(featureData.area_sqkm)
        )}{" "}
        {locale && locale === "en-CA" ? "m" : "ft"}
        <sup>2</sup>
      </div>
      <div className="font-bold uppercase text-brand-green text-xs text-center pb-2">
        {t("map:sidebar.potential_tree_canopy")}
      </div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-4">
        <Num val={featureData.potential_vegetation} label="Low Vegetation/Barren" />
        <Num val={featureData.potential_paved} label="Paved Surfaces" />
      </div>
      <div className="font-bold uppercase text-brand-green text-xs text-center pt-6 pb-2">
        {t("map:sidebar.unsuitable_surface")}
      </div>
      <div className="grid grid-cols-1 gap-x-2 gap-y-4">
        <Num val={featureData.unsuitable_surface} label="Roads, Structures, Other" />
      </div>
    </div>
  )
}

function PanelInfo({
  currentLevel,
  feature,
  onMouseOver,
  onMouseOut,
  hovering,
  isNational,
}: {
  currentLevel: LevelName
  feature: mapboxgl.MapboxGeoJSONFeature
  onMouseOver: (facet: Facet) => void
  onMouseOut: () => void
  hovering: Facet | null
  isNational: boolean
}) {
  const [featureData] = useQuery(
    getFeature,
    {
      id: feature.properties?.id,
      layerId: feature.layer.id as
        | typeof BLOCKGROUP_LAYER_NAME
        | typeof PARCEL_LAYER_NAME
        | typeof RIGHT_OF_WAY_LAYER_NAME,
    },
    {
      enabled:
        feature.layer.id !== MUNICIPALITY_LAYER_NAME &&
        feature.layer.id !== AGGREGATED_MUNICIPALITY_LAYER_NAME,
    }
  )

  return (
    <div>
      {currentLevel === MUNICIPALITY_LEVEL_NAME && municipalityPanel()}
      {featureData &&
        feature.layer.id === BLOCKGROUP_LAYER_NAME &&
        currentLevel === BLOCKGROUP_LEVEL_NAME && (
          <BlockgroupPanel
            featureData={featureData as BlockgroupWithSupplemental}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            hovering={hovering}
            isNational={isNational}
          />
        )}
      {featureData &&
        (feature.layer.id === PARCEL_LAYER_NAME || feature.layer.id === RIGHT_OF_WAY_LAYER_NAME) &&
        currentLevel === PARCEL_LEVEL_NAME && <AreaPanel featureData={featureData as Area} />}
    </div>
  )
}

function Directions({ isNational }: { isNational: boolean }) {
  return isNational ? <NationalDirections /> : <TESADirections />
}

function Logos() {
  return (
    <div className="flex flex-col items-center">
      <img className="w-52" src="/af-logo.svg" alt="American Forests" />
      <div className="flex flex-row justify-between w-full">
        <img className="inline h-10" src="/google.png" />
        <img className="inline h-8" src="/itree.png" />
        <img className="inline h-8" src="/uvm.png" />
      </div>
    </div>
  )
}

export function MapHeader({ city }: { city: City }) {
  const [language] = useCurrentLanguage()
  const isNational = city.id === "national"
  const { t } = useTranslation(["common", "map"])
  return (
    <div className="px-4 flex items-center">
      {isNational ? (
        <Link legacyBehavior href={language === "es" ? "/es" : "/"}>
          <a className="cursor-pointer">
            <TesLogo className="w-16 sm:w-28 px-2 py-3" />
          </a>
        </Link>
      ) : (
        <Link legacyBehavior href={Routes.Map({ city: city.id })}>
          <a>
            <img className="w-32 py-2" src={Logo.src} alt="Tree Equity Score Analyzer" />
          </a>
        </Link>
      )}
      <div className="ml-2 flex border-l py-2 border-gray-300 items-center pl-3 text-gray-700 text-sm sm:text-md font-bold">
        {isNational ? t(`common:${city.title}`) : city.title}
      </div>
    </div>
  )
}

export default function SideBar(props: {
  map: mapboxgl.Map | null
  city: City
  currentLevel: LevelName
  activeFacet: Facet | null
  setActiveFacet: React.Dispatch<React.SetStateAction<Facet | null>>
  baseMapStyle: BaseMapStyle
  setBaseMapStyle: React.Dispatch<React.SetStateAction<BaseMapStyle>>
  zoomTabs?: boolean
}) {
  const {
    map,
    city,
    currentLevel,
    activeFacet,
    setActiveFacet,
    baseMapStyle,
    setBaseMapStyle,
    zoomTabs,
  } = props

  const [hovering, setHovering] = useState<Facet | null>(null)
  const selectedFeature = useAtomValue(selectedFeatureAtom)
  const hoveredFeature = useAtomValue(hoveredFeatureAtom)
  const isNational = city.id === "national"

  const feature = selectedFeature ?? hoveredFeature

  const onMouseOver = useCallback((i: Facet) => {
    setHovering(i)
  }, [])

  const onMouseOut = useCallback(() => {
    setHovering(null)
  }, [])

  return (
    <div className="h-full flex flex-col bg-white">
      {currentLevel !== AGGREGATED_MUNICIPALITY_LEVEL_NAME && (
        <div className="sm:sticky bottom-0 sm:order-1 z-10">
          <Legend
            currentLevel={currentLevel}
            setActiveFacet={setActiveFacet}
            activeFacet={activeFacet!}
            city={city.id as CityModel}
            baseMapStyle={baseMapStyle}
            setBaseMapStyle={setBaseMapStyle}
          />
        </div>
      )}
      <div className="sm:sticky top-0 bg-white divide-y divide-gray-300">
        {zoomTabs && (
          <div className="grid grid-cols-3 divide-x divide-gray-300 text-sm">
            {LEVELS.map(({ name, zoom }) => (
              <ZoomButton
                key={name}
                onClick={() => map!.zoomTo(zoom)}
                active={currentLevel === name}
              >
                {name}
              </ZoomButton>
            ))}
          </div>
        )}
      </div>
      <div className="flex-auto h-full">
        {(currentLevel === AGGREGATED_MUNICIPALITY_LEVEL_NAME ||
          currentLevel === MUNICIPALITY_LEVEL_NAME ||
          !feature) && <Directions isNational={isNational} />}
        {feature && (
          <Suspense
            fallback={
              <div className="p-2 h-full flex items-center justify-center gap-x-2 py-4 text-gray-500">
                <SymbolIcon />
                Loading…
              </div>
            }
          >
            <PanelInfo
              currentLevel={currentLevel}
              onMouseOver={onMouseOver}
              onMouseOut={onMouseOut}
              hovering={hovering}
              feature={feature}
              isNational={isNational}
            />
          </Suspense>
        )}
      </div>
    </div>
  )
}
