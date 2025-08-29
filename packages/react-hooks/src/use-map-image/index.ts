import { RefObject, useEffect, useState } from "react"

export const useMapImage = ({
  mapRef,
  mapLoaded,
}: {
  mapRef: RefObject<HTMLDivElement> | null
  mapLoaded: boolean
}) => {
  const [mapImage, setMapImage] = useState<string | null>(null)

  useEffect(() => {
    if (mapLoaded && !mapImage) {
      const mapCanvas = mapRef?.current!.querySelector(
        ".mapboxgl-canvas"
      ) as HTMLCanvasElement
      const image = mapCanvas ? mapCanvas.toDataURL("image/png") : null
      setMapImage(image!)
    }
  }, [mapImage, mapLoaded])
  return { mapImage }
}
