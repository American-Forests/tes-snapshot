import type { Map } from "mapbox-gl"
import { useState } from "react"

export const useMapZoomLevel = ({
  map,
}: {
  map: Map | null
}): number | null => {
  const [zoomLevel, setZoomLevel] = useState<number | null>(null)
  if (map) {
    map.on("zoomend", () => {
      setZoomLevel(map.getZoom())
    })
  }
  return zoomLevel
}
