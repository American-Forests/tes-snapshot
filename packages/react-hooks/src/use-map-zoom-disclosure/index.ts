import { useEffect } from "react"
import type { Map } from "mapbox-gl"
export const useMapZoomDisclosure = ({
  map,
  zoomLayersSteps,
}: {
  map: Map | null
  zoomLayersSteps: { id: string; nextStep: number }[]
}) => {
  useEffect(() => {
    if (map) {
      zoomLayersSteps.forEach((layer) => {
        map.on("click", layer.id, (e) => {
          map.flyTo({
            center: e.lngLat,
            zoom: layer.nextStep,
            essential: true,
          })
        })
      })
    }
  }, [map])
}
