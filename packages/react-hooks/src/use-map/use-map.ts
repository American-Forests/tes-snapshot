import { useEffect, useState } from "react"
import mapboxgl from "mapbox-gl"
import type { LngLat, MapboxEvent } from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

import type { TesLayer } from "tes-types"
import type { Map } from "mapbox-gl"
export type LayersConfig = {
  tileServerUrl: string
  sources: string[]
  layers: TesLayer[]
  promoteId?: string
  sourcesZoom?: Record<string, { minZoom: number; maxZoom: number }>
}

export type MapOptions = {
  interactive?: boolean
  hash?: boolean
  bounds?: [number, number, number, number]
  padding?: number
  onIdle?: (ev: MapboxEvent<undefined>) => void
  navigationControl?: boolean
  onBoundsChanged?: () => void
  dragRotate?: boolean
  minZoom?: number
  maxZoom?: number
  center?: LngLat
}

export function useMap({
  mapDiv,
  mapboxglAccessToken,
  layersConfig,
  options,
}: {
  mapDiv: React.MutableRefObject<HTMLDivElement | null>
  mapboxglAccessToken: string
  layersConfig: LayersConfig
  options?: MapOptions
}) {
  mapboxgl.accessToken = mapboxglAccessToken

  const [map, setMap] = useState<Map | null>(null)

  const addMapLayers = ({
    map,
    layersConfig,
    isSateliteBasemap,
  }: {
    map: Map
    layersConfig: LayersConfig
    isSateliteBasemap: boolean
  }) => {
    const beforePoi = isSateliteBasemap ? undefined : "poi-label"
    const formatTileServerUrl = (layer: string): string => {
      return `${layersConfig.tileServerUrl}/${layer}/{z}/{x}/{y}.pbf`
    }

    // add sources
    layersConfig?.sources?.forEach((source) => {
      map.addSource(source, {
        type: "vector",
        tiles: [formatTileServerUrl(source)],
        promoteId: layersConfig.promoteId,
        ...(layersConfig.sourcesZoom && {
          minzoom: layersConfig.sourcesZoom?.[source]?.minZoom,
          maxzoom: layersConfig.sourcesZoom?.[source]?.maxZoom,
        }),
      })
    })

    // add layers
    layersConfig.layers.forEach((layer) => {
      map.addLayer(
        {
          source: layer.source,
          "source-layer": "data",
          id: layer.id,
          type: layer.type,
          paint: layer.paint,
          ...(layer.layout && { layout: layer.layout }),
          ...(layer.maxzoom && { maxzoom: layer.maxzoom }),
          ...(layer.minzoom && { minzoom: layer.minzoom }),
          ...(layer.filter && { filter: layer.filter }),
        } as mapboxgl.FillLayer | mapboxgl.LineLayer,
        beforePoi
      )
    })
  }

  useEffect(() => {
    if (!mapDiv.current) return
    if (map) return

    const newMap = new mapboxgl.Map({
      container: mapDiv.current,
      style: "mapbox://styles/tesa-app/ckf7dsrw807la1amt1fjwh7l5",
      bounds: options?.bounds,
      hash: options?.hash ?? true,
      interactive: options?.interactive ?? true,
      preserveDrawingBuffer: true,
      maxPitch: 0,
      dragRotate: options?.dragRotate ?? false,
      minZoom: options?.minZoom,
      maxZoom: options?.maxZoom,
      center: options?.center,
    })

    /**
     * add controls
     */
    if (options?.navigationControl) {
      newMap.addControl(new mapboxgl.NavigationControl(), "top-left")
    }

    if (options?.onBoundsChanged) {
      newMap.on("moveend", () => {
        options.onBoundsChanged!()
      })
    }

    newMap.on("load", () => {
      options && options.onIdle && newMap.on("idle", options.onIdle)
      newMap.getCanvas().style.cursor = "default"
      newMap.resize()
      setMap(newMap)
    })

    newMap.on("style.load", () => {
      const newStyle = newMap.getStyle()
      addMapLayers({
        map: newMap,
        layersConfig,
        isSateliteBasemap:
          newStyle.metadata?.["mapbox:origin"].includes("satellite"),
      })
    })
  }, [map, mapDiv])

  return { map }
}
