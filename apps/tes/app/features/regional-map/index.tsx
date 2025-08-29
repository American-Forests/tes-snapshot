import React, { Suspense, useRef, useContext } from "react"
import { MapOptions, useMap } from "hooks/use_map"
import { ScenariosDropdown } from "../../../components/scenario_dropdown"
import { SymbolIcon } from "@radix-ui/react-icons"
import useActiveFacet from "hooks/use_active_facet"
import useFilters from "hooks/use_filters"
import { Toaster } from "react-hot-toast"
import { useQuery } from "@blitzjs/rpc"
import getScenario from "app/scenarios/queries/getScenario"
import { CityContext, MapContext } from "app/features/regional-map/regional-map.state"
import useMapTooltip from "hooks/use_map_tooltip"
import usePaint from "hooks/use_paint"
import useFacets from "hooks/use_facets"
import SideBar, { MapHeader } from "../../../components/sidebar"
import { scenarioIdDecode } from "app/utils/formatting_utils"
import { facetsAtom } from "app/state"
import { useAtomValue } from "jotai"
import {addMapLayers} from "app/features/regional-map/regional-map.utils"
import { useMediaQuery } from "@material-ui/core"
import GeoCoder from "../../../components/geocoder"
import NavMenu from "../../../components/nav_menu"
import { useRouter } from "next/router"
import { SHADE_TESAS } from "app/constants"
import { useParam } from "@blitzjs/next"
import { useTranslation } from "react-i18next"


const OPTIONS: Omit<MapOptions, "extent"> = {
  rememberPosition: true,
  hash: false,
  zoomControl: true,
}

export default function TesaMap({ children }: { children: React.ReactNode }) {
  const city = useContext(CityContext)!
  const facetsLoaded = useFacets(city)
  const facets = useAtomValue(facetsAtom)!
  const isMobile = useMediaQuery("(max-width: 640px)")
  const { t } = useTranslation(["common"])
  const mapDiv = useRef<HTMLDivElement>(null)
  const { scenarioId } = useRouter().query as Record<string, string | undefined>

  const [scenario] = useQuery(
    getScenario,
    { id: scenarioIdDecode(scenarioId) },
    { enabled: !!scenarioId }
  )

  const { map, currentLevel, baseMapStyleIsLoaded, baseMapStyle, setBaseMapStyle } = useMap({
    mapDiv,
    scenario,
    options: {
      ...OPTIONS,
      extent: city.initialExtent,
    },
    facetsLoaded,
    city,
    addMapLayers: addMapLayers,
  })
  const { activeFacet, setActiveFacet } = useActiveFacet({
    map: map,
    defaultValue: facets[0]!,
    zoomLevel: currentLevel,
    baseMapStyleIsLoaded,
    facetsLoaded,
  })
  const cityId = String(useParam("city"))

  usePaint({ map, scenario, baseMapStyle, baseMapStyleIsLoaded })
  useMapTooltip({ map: map!, facet: activeFacet!, scenario })
  useFilters({ map, baseMapStyleIsLoaded, currentLevel })

  return (
    <>
      {/* 30px is the height of the release banner */}
      <div
        className="min-h-screen sm:h-screen inset-0 flex flex-col sm:flex-row"
      >
        {!isMobile && (
          <div
            className="divide-y divide-gray-300
                   flex flex-col overflow-y-auto sm:w-96
                   bg-[#FCFDFE] sm:border-r border-gray-400 sm:shadow-md transition-all"
          >
            <MapHeader city={city} />
            <Suspense fallback={null}>
              <GeoCoder map={map} city={city} />
            </Suspense>
            <SideBar
              map={map}
              city={city}
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
            <MapHeader city={city} />
            <Suspense fallback={null}>
              <GeoCoder map={map} city={city} />
            </Suspense>
          </div>
        )}

        <div ref={mapDiv} className="sm:flex-auto h-[50vh] sm:h-auto" />

        <div className="sm:absolute top-[5.5rem] right-4 w-96 max-h-[90vh] overflow-y-auto pb-5">
          <div className="bg-white shadow-md pointer-events-auto">
            <MapContext.Provider value={map}>
              <Suspense
                fallback={
                  <div className="p-2 flex items-center justify-center gap-x-2 py-4 text-gray-500">
                    <SymbolIcon />
                    Loading…
                  </div>
                }
              >
                {children}
              </Suspense>
            </MapContext.Provider>
          </div>
        </div>

        <div className="absolute inset-0 w-full z-10 flex flex-row justify-center pointer-events-none">
          <div
            className={`absolute ${cityId && SHADE_TESAS.includes(cityId) ? 'top-10' : 'top-2'} right-2 h-[36px] flex flex-row pointer-events-auto`}
          >
            <MapContext.Provider value={map}>
              <Suspense fallback={null}>
                <div className="bg-white rounded-full shadow-md px-2 mr-2 flex items-center">
                  <ScenariosDropdown />
                </div>
                <div className="bg-white rounded-full shadow-md px-2 flex items-center">
                  <NavMenu displayText={t("common:menu")} />
                </div>
              </Suspense>
            </MapContext.Provider>
          </div>
        </div>

        {isMobile && (
          <div className="h-full">
            <SideBar
              map={map}
              city={city}
              activeFacet={activeFacet}
              setActiveFacet={setActiveFacet}
              baseMapStyle={baseMapStyle}
              setBaseMapStyle={setBaseMapStyle}
              currentLevel={currentLevel}
            />
          </div>
        )}
        <Toaster />
      </div>
    </>
  )
}
