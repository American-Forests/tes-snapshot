import { useEffect, useRef, useState } from "react"
import { setFeatureState, cleanFeatureState, throttle } from "utils"
import type { LayersConfig } from "../use-map/use-map"
import type { MapboxGeoJSONFeature, Map, MapLayerMouseEvent } from "mapbox-gl"

type Feature = mapboxgl.MapboxGeoJSONFeature | null

type AllInteractionsType =
  | "INTERACTIONS_ON_CLICK"
  | "INTERACTIONS_ON_MOUSE_MOVE"
  | "INTERACTIONS_ON_HOVER"
  | "INTERACTIONS_ON_MOUSE_LEAVE"

type InteractionTypes = Record<
  "ON_CLICK" | "ON_HOVER" | "ON_MOUSE_MOVE" | "ON_MOUSE_LEAVE",
  AllInteractionsType
>

export const INTERACTIONS: InteractionTypes = {
  ON_CLICK: "INTERACTIONS_ON_CLICK",
  ON_MOUSE_MOVE: "INTERACTIONS_ON_MOUSE_MOVE",
  ON_HOVER: "INTERACTIONS_ON_HOVER",
  ON_MOUSE_LEAVE: "INTERACTIONS_ON_MOUSE_LEAVE",
}

export const ALL_INTERACTIONS = [
  INTERACTIONS.ON_CLICK,
  INTERACTIONS.ON_MOUSE_MOVE,
  INTERACTIONS.ON_HOVER,
  INTERACTIONS.ON_MOUSE_LEAVE,
]

export type MapState = {
  clickedFeature: MapboxGeoJSONFeature | null;
  hoveredFeature: MapboxGeoJSONFeature | null;
  disabledFeature: MapboxGeoJSONFeature | null;
  allDisabledFeatures: (MapboxGeoJSONFeature | null)[];
}

export function useMapState({
  layers,
  map,
}: {
  layers: LayersConfig["layers"]
  map: Map | null
}): MapState {
  const [clickedFeature, setClickedFeature] =
    useState<MapboxGeoJSONFeature | null>(null)
  const [hoveredFeature, setHoveredFeature] =
    useState<MapboxGeoJSONFeature | null>(null)
  const [disabledFeature, setDisabledFeature] =
    useState<MapboxGeoJSONFeature | null>(null)
  const [allDisabledFeatures, setAllDisabledFeatures] = useState<
    Array<MapboxGeoJSONFeature | null>
  >([])

  const [layerHoverEvent, setLayerHoverEvent] =
    useState<MapLayerMouseEvent | null>(null)
  const [globalHoverEvent, setGlobalHoverEvent] =
    useState<MapLayerMouseEvent | null>(null)

  const hoveredFeatureRef = useRef<Feature>(null)
  const clickedFeatureRef = useRef<Feature>(null)

  const onClick = (e: MapLayerMouseEvent) => {
    if (map) {
      if (!e.features?.length) return
      const feature = e.features[0]!
      if (!clickedFeatureRef.current) {
        // eslint-disable-next-line
        // @ts-ignore MapboxGeoJSONFeature | null ± MapboxGeoJSONFeature mismatch
        clickedFeatureRef.current = feature
        setClickedFeature(feature)
      } else if (feature.id !== clickedFeatureRef.current.id) {
        setDisabledFeature(clickedFeatureRef.current)
        // eslint-disable-next-line
        // @ts-ignore MapboxGeoJSONFeature | null ± MapboxGeoJSONFeature mismatch
        clickedFeatureRef.current = feature
        setClickedFeature(feature)
      } else if (feature.id === clickedFeatureRef.current.id) {
        setDisabledFeature(clickedFeatureRef.current)
        clickedFeatureRef.current = null
        setClickedFeature(null)
      }
    }
  }

  const onMouseMove = (e: MapLayerMouseEvent) => {
    if (map) {
      if (!e.features?.length) return
      const feature = e.features[0]!
      // Avoid applying hover styles on currently selected features
      if (feature.id === clickedFeatureRef.current?.id) return
      // We just need to update the state when hovering over a different feature
      if (
        !hoveredFeatureRef.current ||
        hoveredFeatureRef.current.id != feature.id
      ) {
        setDisabledFeature(hoveredFeatureRef.current)
        // eslint-disable-next-line
        // @ts-ignore MapboxGeoJSONFeature | null ± MapboxGeoJSONFeature mismatch
        hoveredFeatureRef.current = feature
        setHoveredFeature(feature)
      }
    }
    setLayerHoverEvent(e)
  }

  const onGlobalMouseMove = throttle(setGlobalHoverEvent, 100)

  const onMouseLeave = () => {
    if (map) {
      if (hoveredFeatureRef.current) {
        setDisabledFeature(hoveredFeatureRef.current)
        setHoveredFeature(null)
        hoveredFeatureRef.current = null
      }
    }
  }

  useEffect(() => {
    if (map && layers) {
      const clickableLayers = layers
        .filter((layer) => layer.clickable)
        .map((layer) => layer.id)
      clickableLayers && map.on("click", clickableLayers, onClick)

      const hoverableLayers = layers
        .filter((layer) => layer.hoverable)
        .map((layer) => layer.id)
      hoverableLayers && map.on("mousemove", hoverableLayers, onMouseMove)
      hoverableLayers && map.on("mousemove", onGlobalMouseMove)
      hoverableLayers && map.on("mouseleave", hoverableLayers, onMouseLeave)

      return () => {
        clickableLayers && map.off("click", clickableLayers, onClick)
        hoverableLayers && map.off("mousemove", hoverableLayers, onMouseMove)
        hoverableLayers && map.off("mousemove", onGlobalMouseMove)
        hoverableLayers && onGlobalMouseMove.clear()
        hoverableLayers && map.off("mouseleave", hoverableLayers, onMouseLeave)
      }
    }
  }, [map, layers, setHoveredFeature])

  useEffect(() => {
    if (map && layers && layerHoverEvent && globalHoverEvent) {
      const inLayer =
        layerHoverEvent.point.x === globalHoverEvent.point.x &&
        layerHoverEvent.point.y === globalHoverEvent.point.y
      const hoverableLayers = layers
        .filter((layer) => layer.hoverable)
        .map((layer) => layer.id)
      if (!inLayer) {
        setAllDisabledFeatures(
          map.queryRenderedFeatures(undefined, { layers: hoverableLayers })
        )
      } else {
        setAllDisabledFeatures([])
      }
    }
  }, [globalHoverEvent, layerHoverEvent])

  return {
    clickedFeature,
    hoveredFeature,
    disabledFeature,
    allDisabledFeatures,
  }
}

export function useMapStyles({
  layers,
  map,
  state,
  interactions = ALL_INTERACTIONS,
}: {
  layers: LayersConfig["layers"]
  map: Map | null
  state: MapState
  interactions?: AllInteractionsType[]
}) {
  useEffect(() => {
    const {
      clickedFeature,
      hoveredFeature,
      disabledFeature,
      allDisabledFeatures,
    } = state
    const hasOnClick = interactions.includes(INTERACTIONS.ON_CLICK)
    const hasOnHover = interactions.includes(INTERACTIONS.ON_HOVER)

    hasOnHover &&
      hoveredFeature &&
      setFeatureState({
        map: map!,
        feature: hoveredFeature!,
        state: "hover",
      })
    hasOnHover &&
      disabledFeature &&
      cleanFeatureState({
        map: map!,
        feature: disabledFeature,
        state: "hover",
      })
    hasOnHover &&
      allDisabledFeatures &&
      allDisabledFeatures.forEach((feature) => {
        cleanFeatureState({
          map: map!,
          feature: feature!,
          state: "hover",
        })
      })

    hasOnClick &&
      disabledFeature &&
      cleanFeatureState({
        map: map!,
        feature: disabledFeature,
        state: "selected",
      })
    hasOnClick &&
      clickedFeature &&
      setFeatureState({
        map: map!,
        feature: clickedFeature!,
        state: "selected",
      })
  }, [map, layers, state])
}

export function useMapInteractions({
  layers,
  map,
}: {
  layers: LayersConfig["layers"]
  map: Map | null
}) {
  const state = useMapState({
    map,
    layers,
  })

  useMapStyles({
    map,
    layers,
    state,
  })

  return state
}
