import React, { Suspense, useState, useRef, useEffect } from "react"
import { MapOptions, useMap } from "hooks/use_map"
import { CITIES } from "app/features/regional-map/regional-map.constants"
import usePaint from "hooks/use_paint"
import useFacets from "hooks/use_facets"
import useActiveFacet from "hooks/use_active_facet"
import { useAtomValue } from "jotai"
import { facetsAtom, hasUsedGeocoderAtom } from "app/state"
import {
  AGGREGATED_MUNICIPALITY_LAYER_NAME,
  BLOCKGROUP_LAYER_NAME,
  BLOCKGROUP_ZOOM,
  MUNICIPALITY_LAYER_NAME,
  MUNICIPALITY_ZOOM,
  NATIONAL_EXTENT,
} from "app/constants"
import SideBar, { MapHeader } from "components/sidebar"
import addNationalExplorerMapLayers from "lib/add_national_explorer_map_layers"
import useFilters from "hooks/use_filters"
import useMapTooltip from "hooks/use_map_tooltip"
import { HelpWidget } from "app/features/help-widget"
import NavMenu from "components/nav_menu"
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon"
import GeoCoder from "components/geocoder"
import { useMediaQuery } from "@material-ui/core"
import { ReportFinderTrigger } from "./components/report-finder-trigger"
import { useTranslation } from "react-i18next"
import { useCurrentLanguage } from "app/features/i18n/i18n.hooks"

const OPTIONS: Omit<MapOptions, "extent"> = {
  rememberPosition: true,
  zoomControl: true,
}

export default function NationalMap() {
  const mapDiv = useRef<HTMLDivElement>(null)
  const nationalLocation = CITIES.find((city) => city.id === "national")!
  const facetsLoaded = useFacets(nationalLocation)
  const facets = useAtomValue(facetsAtom)!
  const isMobile = useMediaQuery("(max-width: 640px)")
  const [gettingStartedVisible, setGettingStartedVisible] = useState(true)
  const { t } = useTranslation(["common"])
  const { map, currentLevel, baseMapStyleIsLoaded, baseMapStyle, setBaseMapStyle } = useMap({
    mapDiv,
    scenario: undefined,
    options: {
      ...OPTIONS,
      extent: NATIONAL_EXTENT,
    },
    facetsLoaded: facetsLoaded,
    city: nationalLocation,
    addMapLayers: addNationalExplorerMapLayers,
  })

  const { activeFacet, setActiveFacet } = useActiveFacet({
    map: map,
    defaultValue: facets[0]!,
    zoomLevel: currentLevel,
    baseMapStyleIsLoaded,
    facetsLoaded,
  })

  usePaint({
    map,
    scenario: undefined,
    baseMapStyle,
    baseMapStyleIsLoaded,
    layers: [BLOCKGROUP_LAYER_NAME, MUNICIPALITY_LAYER_NAME],
  })

  useFilters({ map, baseMapStyleIsLoaded, currentLevel })
  useMapTooltip({ map: map!, facet: activeFacet })
  useCurrentLanguage()

  const hasUsedGeocoder = useAtomValue(hasUsedGeocoderAtom)

  const [hasZoomed, setHasZoomed] = useState(false)

  useEffect(() => {
    if (hasZoomed || hasUsedGeocoder) setGettingStartedVisible(false)
  }, [hasZoomed, hasUsedGeocoder])

  /** zoom into next layers if clicking on aggregated municipality or municipality */
  useEffect(() => {
    if (!map) return
    map.on("click", AGGREGATED_MUNICIPALITY_LAYER_NAME, (e) => {
      map.flyTo({
        center: e.lngLat,
        zoom: MUNICIPALITY_ZOOM,
        essential: true,
      })
    })

    map.on("click", MUNICIPALITY_LAYER_NAME, (e) => {
      map.flyTo({
        center: e.lngLat,
        zoom: BLOCKGROUP_ZOOM,
        essential: true,
      })
    })

    map.on("zoom", () => {
      setHasZoomed(true)
    })
  }, [map])

  return (
    <>
      <div className="min-h-screen sm:h-screen inset-0 flex flex-col sm:flex-row">
        {!isMobile && (
          <div
            className="divide-y divide-gray-300
                   flex flex-col overflow-y-auto sm:w-96
                   bg-[#FCFDFE] sm:border-r border-gray-400 sm:shadow-md transition-all"
          >
            <MapHeader city={nationalLocation} />
            <Suspense fallback={null}>
              <GeoCoder map={map} city={nationalLocation} />
            </Suspense>
            <SideBar
              map={map}
              city={nationalLocation}
              activeFacet={activeFacet}
              setActiveFacet={setActiveFacet}
              baseMapStyle={baseMapStyle}
              setBaseMapStyle={setBaseMapStyle}
              currentLevel={currentLevel}
            />
          </div>
        )}

        {isMobile && (
          <div>
            <MapHeader city={nationalLocation} />
            <Suspense fallback={null}>
              <GeoCoder map={map} city={nationalLocation} />
            </Suspense>
          </div>
        )}

        <div ref={mapDiv} className="sm:flex-auto h-[50vh] sm:h-auto">
          <HelpWidget className="absolute bottom-10 z-10 hidden lg:block" />

          <div className="absolute inset-0 w-full z-10 flex flex-row justify-center pointer-events-none">
            {/** Get Started Modal should disappear if the user zooms, interacts with the map, or uses the geocoder */}
            {gettingStartedVisible && (
              <div className="pointer-events-auto w-fit h-fit hidden xl:block">
                <GetStartedModal />
              </div>
            )}

            <div className="absolute top-3 right-2 h-[36px] flex flex-row pointer-events-auto">
              <div className="bg-white rounded-full shadow-md px-2 mr-2 flex items-center relative">
                <ReportFinderTrigger currentLevel={currentLevel} />
              </div>
              <div className="bg-white rounded-full shadow-md px-2 flex items-center">
                <NavMenu displayText={t("common:menu")} />
              </div>
            </div>
          </div>
        </div>

        {isMobile && (
          <div className="h-full">
            <SideBar
              map={map}
              city={nationalLocation}
              activeFacet={activeFacet}
              setActiveFacet={setActiveFacet}
              baseMapStyle={baseMapStyle}
              setBaseMapStyle={setBaseMapStyle}
              currentLevel={currentLevel}
            />
          </div>
        )}
      </div>
    </>
  )
}

function GetStartedModal() {
  const { t } = useTranslation(["map"])
  const [open, setOpen] = useState(true)

  return (
    <>
      {open && (
        <div className="bg-white rounded-lg shadow-xl w-fit mt-2 h-fit relative z-11">
          <button
            onClick={() => {
              setOpen(false)
            }}
            className="top-2 right-2 w-4 h-4 absolute hover:fill-gray-800"
          >
            <XMarkIcon className=" fill-gray-600 hover:fill-gray-800" />
          </button>

          <div className="flex flex-col items-center justify-between p-6">
            <div className="text-brand-green-dark font-bold uppercase text-caption">
              {t("map:get_started")}
            </div>

            <div className="text-gray-600 text-base flex flex-col items-center justify-center">
              <p>{t("map:get_started_zoom")}</p>
              <p>{t("map:get_started_explore")}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
