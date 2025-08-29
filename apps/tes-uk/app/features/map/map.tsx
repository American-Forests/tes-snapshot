import { useEffect, useRef } from "react"

import {
  useMap,
  LayersConfig,
  useMapInteractions,
  useMapZoomDisclosure,
  useMapZoomLevel,
  useMapTooltip,
} from "react-hooks"
import mapboxgl from "mapbox-gl"
import {
  DATA_LAYERS,
  LAYERS_GENERATORS,
  LAYERS_SOURCES,
  UK_BBOX,
  ZOOM_LAYERS_STEPS,
} from "app/features/map/map.constants"
import { useSetAtom, useAtomValue } from "jotai"

import { useLocalStorage } from "react-hooks"

import { mapAtom, clickedFeatureAtom, hoveredFeatureAtom, mapZoomLevelAtom } from "./map.state"
import { activeNeighborhoodFacetAtom } from "app/features/facets/facets.state"
import { getHoverPopupContent } from "../popups"
import HelpWidget from "app/features/help-widget/help-widget"
import Menu from "app/features/menu/menu"

export const Map = () => {
  const mapDiv = useRef<HTMLDivElement>(null)
  const activeFacet = useAtomValue(activeNeighborhoodFacetAtom)
  const setMapAtom = useSetAtom(mapAtom)
  const setClickedFeatureAtom = useSetAtom(clickedFeatureAtom)
  const setHoveredFeatureAtom = useSetAtom(hoveredFeatureAtom)
  const setMapZoomLevelAtom = useSetAtom(mapZoomLevelAtom)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setMapBounds] = useLocalStorage<boolean>("mapBounds")

  const saveBounds = () => {
    setMapBounds(location.hash.split("#")[1])
  }

  useEffect(() => {
    saveBounds()
  }, [])

  const layersConfig: LayersConfig = {
    tileServerUrl: process.env.NEXT_PUBLIC_TILESERVER_URL!,
    layers: LAYERS_GENERATORS,
    sources: LAYERS_SOURCES,
  }

  const { map } = useMap({
    mapDiv: mapDiv,
    mapboxglAccessToken: process.env.NEXT_PUBLIC_MAPBOXGL_ACCESS_TOKEN!,
    layersConfig,
    options: {
      bounds: UK_BBOX,
      navigationControl: true,
      onBoundsChanged: saveBounds,
    },
  })

  // TODO check why useMapInteractions is not found
  // on map page first load
  if (useMapInteractions) {
    const { clickedFeature, hoveredFeature } = useMapInteractions({
      map,
      layers: LAYERS_GENERATORS,
    })
    setClickedFeatureAtom(clickedFeature as mapboxgl.MapboxGeoJSONFeature)
    setHoveredFeatureAtom(hoveredFeature as mapboxgl.MapboxGeoJSONFeature)
  }

  useMapTooltip({ map, layers: DATA_LAYERS, activeFacet: activeFacet, getHoverPopupContent })
  useMapZoomDisclosure({ map, zoomLayersSteps: ZOOM_LAYERS_STEPS })
  setMapAtom(map as mapboxgl.Map)
  const zoomLevel = useMapZoomLevel({ map })
  useEffect(() => {
    setMapZoomLevelAtom(zoomLevel)
  }, [zoomLevel])

  return (
    <div className="sm:flex-auto h-[50vh] sm:h-auto mapboxgl-map" ref={mapDiv}>
      <HelpWidget className="absolute bottom-10 z-10 hidden lg:block" />
      <Menu />
    </div>
  )
}
