"use client"
import { useQuery } from "@blitzjs/rpc"
import { useAtom, useSetAtom } from "jotai"
import { useEffect, useRef } from "react"

import {
  useMap,
  LayersConfig,
  INTERACTIONS,
  ALL_INTERACTIONS,
  useMapState,
  useMapStyles,
  useMapImage,
  useMapTooltip,
  useMapZoomDisclosure,
} from "react-hooks"
import {
  AGGREGATED_MUNICIPALITY_LAYER_NAME,
  MAP_LAYERS,
  MUNICIPALITY_LAYER_SOURCE,
  TES_BLOCKGROUP_FACET,
} from "../dashboard.constants"
import { clickedFeatureAtom, mapAtom } from "../dashboard.state"
import type { MapboxGeoJSONFeature } from "mapbox-gl"
import { Blockgroup } from "db"
import getExtent from "app/blockgroups/queries/getExtent"
import { TesLayer } from "tes-types"
import { getFilterForLayer } from "../utils"
import { TILESERVER_URL } from "app/constants"
import { MapPopUp } from "./map-pop-up"
import { BLOCKGROUP_ZOOM, MUNICIPALITY_ZOOM } from "app/constants"
import { useTranslation } from "react-i18next"

export const Map = ({ blockgroups }: { blockgroups: Blockgroup[] }) => {
  const mapDiv = useRef<HTMLDivElement>(null)
  const [bounds] = useQuery(getExtent, {
    blockgroupIds: blockgroups.map((bg) => bg.id),
  })
  const [mapOnState, setMapOnState] = useAtom(mapAtom)
  const setClickedFeature = useSetAtom(clickedFeatureAtom)
  const mapLayersWithFilters = MAP_LAYERS.map((layer) => {
    return {
      ...layer,
      filter: getFilterForLayer(layer.source, blockgroups),
    } as TesLayer
  })
  
  const layersConfig: LayersConfig = {
    tileServerUrl: TILESERVER_URL,
    layers: mapLayersWithFilters,
    sources: ["national_municipality", "national_blockgroup"],
    sourcesZoom: {
      national_blockgroup: { minZoom: 10, maxZoom: 11 },
      national_municipality: { minZoom: 2, maxZoom: 8 },
    },
  }

  const { map } = useMap({
    mapDiv: mapDiv,
    mapboxglAccessToken: process.env.NEXT_PUBLIC_MAPBOXGL_ACCESS_TOKEN!,
    layersConfig,
    options: {
      hash: false,
      bounds: bounds as [number, number, number, number],
      padding: 3,
      navigationControl: true,
      dragRotate: false,
    },
  })

  const state = useMapState({
    map,
    layers: mapLayersWithFilters,
  })

  useMapStyles({
    layers: mapLayersWithFilters,
    map,
    state,
    interactions: ALL_INTERACTIONS.filter((i) => i !== INTERACTIONS.ON_CLICK),
  })

  useEffect(() => {
    if (map && !mapOnState) {
      setMapOnState(map as mapboxgl.Map)
      // Avoid map scroll zooming
      map.scrollZoom.disable()
    }
  }, [map, mapOnState])

  useEffect(() => {
    if (state.clickedFeature) {
      setClickedFeature(state.clickedFeature as MapboxGeoJSONFeature)
    }
  }, [state.clickedFeature])

  useEffect(() => {
    return () => setClickedFeature(null)
  }, [])

  const { mapImage } = useMapImage({
    mapRef: mapDiv,
    mapLoaded: Boolean(map),
  })
  const { t } = useTranslation(["facets", "map"])
  const tesLabel = t("facets:tree_equity_score.name")
  const compositeLabel = t("map:composite_score_tooltip_name")

  useMapTooltip({
    map,
    activeFacet: TES_BLOCKGROUP_FACET,
    layers: MAP_LAYERS.map((layer) => layer.id),
    getHoverPopupContent: (feature) => MapPopUp({feature, tesLabel, compositeLabel}),
  })

  useMapZoomDisclosure({
    map,
    zoomLayersSteps: [
      {
        id: AGGREGATED_MUNICIPALITY_LAYER_NAME,
        nextStep: MUNICIPALITY_ZOOM,
      },
      { id: MUNICIPALITY_LAYER_SOURCE, nextStep: BLOCKGROUP_ZOOM },
    ],
  })

  return (
    <>
      <div className="bg-[#F9FCFC] pb-10 pt-5 -mb-16 border-t border-gray-200">
        <header className="flex flex-col text-center w-full pt-8">
          <h1 className="text-base font-extrabold uppercase text-brand-green-darker">
            {t("location-insights:compare.title")}
          </h1>
          <h2 className="text-base font-medium text-gray-700 tracking-wide mt-3 pb-4">
            {t("location-insights:compare.subtitle")}
          </h2>
        </header>
        <div
          className="print:hidden sm:flex-auto 2xl:w-4/5 xl:w-11/12 w-full m-auto h-[46vh] rounded-t-xl border-x border-t border-gray-300 mapboxgl-map"
          ref={mapDiv}
        />
        <img
          src={`${mapImage}`}
          className="hidden print:block print:w-full print:mt-4 print:h-[500px]"
        />
      </div>
    </>
  )
}
