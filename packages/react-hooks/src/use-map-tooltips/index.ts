import { useRef, useEffect, useCallback } from "react"
import { Popup } from "mapbox-gl"
import type { Map, MapboxGeoJSONFeature, MapLayerMouseEvent, Popup as PopupType } from "mapbox-gl"
import { TesLayer } from "tes-types"

export function useMapTooltip({
  map,
  activeFacet,
  layers,
  getHoverPopupContent,
}: {
  map: Map | null
  activeFacet: any
  layers: TesLayer["id"][]
  getHoverPopupContent: (feature: MapboxGeoJSONFeature, facet: any) => string | null
}) {
  const hoverPopup = useRef<PopupType | null>(null)
  const getContent = useCallback(
    (feature: MapboxGeoJSONFeature) => getHoverPopupContent(feature, activeFacet),
    [activeFacet]
  )
  useEffect(() => {
    if (!map) return

    const onMouseLeave = () => {
      if (hoverPopup.current) {
        hoverPopup.current.remove()
      }
    }

    const onMouseMove = (e: MapLayerMouseEvent) => {
      if (e.features && e.features.length == 0) return
      const feature = e.features && e.features[0]!

      if (!hoverPopup.current) {
        hoverPopup.current = new Popup({
          closeOnClick: false,
          closeButton: false,
          offset: [0, -8],
        })
      }
  
      const content = feature && getContent(feature)

      if (content) {
        hoverPopup.current.setLngLat(e.lngLat).setHTML(content).addTo(map)
      }
    }

    layers.forEach((source) => {
      map.on("mousemove", source, onMouseMove)
      map.on("mouseleave", source, onMouseLeave)
    })

    return () => {
      layers.forEach((source) => {
        map.off("mousemove", source, onMouseMove)
        map.off("mouseleave", source, onMouseLeave)
      })
    }
  }, [map, activeFacet])
}
