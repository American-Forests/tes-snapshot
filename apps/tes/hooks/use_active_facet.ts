import { Facet } from "data/facets"
import { useEffect, useState, useRef } from "react"
import {
  LevelName,
  PARCEL_LAYER_NAME,
  BLOCKGROUP_LAYER_NAME,
  RIGHT_OF_WAY_LAYER_NAME,
  DEFAULT_ACTIVE_FACET,
  DEFAULT_PARCEL_ACTIVE_FACET,
  MUNICIPALITY_LEVEL_NAME,
  PARCEL_LEVEL_NAME,
  DEFAULT_MUNICIPALITY_ACTIVE_FACET,
  MUNICIPALITY_LAYER_NAME,
  BLOCKGROUP_LEVEL_NAME,
  MAX_FILL_OPACITY,
} from "app/constants"
import type { Dispatch, SetStateAction } from "react"
import { useAtomValue } from "jotai"
import { facetsAtom } from "app/state"
import mapboxgl from "mapbox-gl"
import { getFillExpression, getOpacityExpression } from "app/utils/paint_utils"

export default function useActiveFacet(params: {
  map: mapboxgl.Map | null
  defaultValue: Facet | null
  zoomLevel?: LevelName
  baseMapStyleIsLoaded: boolean
  facetsLoaded: boolean
}): {
  activeFacet: Facet | null
  setActiveFacet: Dispatch<SetStateAction<Facet | null>>
} {
  const { map, defaultValue, zoomLevel, baseMapStyleIsLoaded, facetsLoaded } = params
  const facets = useAtomValue(facetsAtom)!
  const lastFacet = useRef<Facet | null>(defaultValue)
  const [activeFacet, setActiveFacet] = useState<Facet | null>(defaultValue)
  const [lastSelectedBlockgroupFacet, setLastSelectedBlockgroupFacet] = useState<Facet | null>(null)

  useEffect(() => {
    if (!map) return
    if (!baseMapStyleIsLoaded) return
    if (!facetsLoaded) return

    const repaintLayer = (layerId: string, facet: Facet) => {
      const { style } = facet
      if (style) {
        const opacity = style.opacity ? getOpacityExpression(facet) : MAX_FILL_OPACITY
        map.setPaintProperty(layerId, "fill-color", getFillExpression(facet))
        map.setPaintProperty(layerId, "fill-opacity", opacity)
      }
    }

    function setPaint() {
      if (!map) return
      if (!activeFacet) {
        // clear map if no facet is set
        for (const l of [
          BLOCKGROUP_LAYER_NAME,
          PARCEL_LAYER_NAME,
          RIGHT_OF_WAY_LAYER_NAME,
          MUNICIPALITY_LAYER_NAME,
        ]) {
          if (!map.getLayer(l)) return
          map.setPaintProperty(l, "fill-opacity", 0)
        }
        return
      }

      const { field } = activeFacet

      if (field.type === "Area") {
        repaintLayer(PARCEL_LAYER_NAME, activeFacet)
        repaintLayer(RIGHT_OF_WAY_LAYER_NAME, activeFacet)
      } else if (field.type === MUNICIPALITY_LEVEL_NAME) {
        repaintLayer(MUNICIPALITY_LAYER_NAME, activeFacet)
      } else {
        repaintLayer(BLOCKGROUP_LAYER_NAME, activeFacet)
        setLastSelectedBlockgroupFacet(activeFacet)
      }
    }

    setPaint()

    lastFacet.current = activeFacet
  }, [map, activeFacet, baseMapStyleIsLoaded, facets, facetsLoaded])

  useEffect(() => {
    if (!facetsLoaded) return
    if (zoomLevel === PARCEL_LEVEL_NAME) {
      setActiveFacet(facets.find((f) => f.field.field === DEFAULT_PARCEL_ACTIVE_FACET)!)
    } else if (zoomLevel === MUNICIPALITY_LEVEL_NAME) {
      setActiveFacet(facets.find((f) => f.field.field === DEFAULT_MUNICIPALITY_ACTIVE_FACET)!)
    } else if (zoomLevel === BLOCKGROUP_LEVEL_NAME) {
      if (!lastSelectedBlockgroupFacet) {
        setActiveFacet(facets.find((f) => f.field.field === DEFAULT_ACTIVE_FACET)!)
      } else {
        setActiveFacet(lastSelectedBlockgroupFacet)
      }
    } else {
      setActiveFacet(null)
    }
  }, [zoomLevel, facets, facetsLoaded])

  return { activeFacet, setActiveFacet }
}
