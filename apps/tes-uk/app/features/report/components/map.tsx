import { useQuery } from "@blitzjs/rpc"
import { useState, useEffect, useRef } from "react"
import { twMerge } from "tailwind-merge"
import { LayersConfig, useMap, useMapFilterFeatures } from "react-hooks"
import {
  LOCALITY_LIKE_LINE_LAYER,
  LAYERS_GENERATORS,
  LAYERS_SOURCES,
  NEIGHBORHOOD_LIKE_LAYER,
  NEIGHBORHOOD_LIKE_LINE_LAYER,
} from "app/features/map/map.constants"
import getExtent from "app/queries/get-extent"
import { pick } from "utils"
import type { ReportProps } from "../index"

type MapProps = {
  reportData: ReportProps["reportData"]
  mapRef: React.RefObject<HTMLDivElement>
  onIdle: () => void
}

const Map = ({ reportData, mapRef, onIdle }: MapProps) => {
  const neighborhoodIds = reportData?.neighborhoods?.map(pick("id")) as Array<string>
  const [bounds] = useQuery(getExtent, { neighborhoodIds })

  const ref = useRef<HTMLDivElement>(null)
  const mapDiv = mapRef || ref
  // remove LocalityLike outline
  const LAYERS = LAYERS_GENERATORS.filter(({ id }) => id !== LOCALITY_LIKE_LINE_LAYER)
  const layersConfig: LayersConfig = {
    tileServerUrl: process.env.NEXT_PUBLIC_TILESERVER_URL!,
    layers: LAYERS,
    sources: LAYERS_SOURCES,
  }

  const { map } = useMap({
    mapDiv,
    mapboxglAccessToken: process.env.NEXT_PUBLIC_MAPBOXGL_ACCESS_TOKEN!,
    layersConfig,
    options: { bounds, hash: false, interactive: false, onIdle },
  })

  useMapFilterFeatures({
    map,
    featuresIds: neighborhoodIds,
    layers: [NEIGHBORHOOD_LIKE_LAYER, NEIGHBORHOOD_LIKE_LINE_LAYER],
  })

  return <div ref={mapDiv} className="w-full h-[800px]"></div>
}

const Title = ({ title }: { title: string }) => {
  const titleCx = "text-xl text-gray-700 font-semibold pb-4"
  return <p className={titleCx}>{title} Tree Equity Score Map</p>
}

export const ReportMap = ({ reportData, title }: { reportData: ReportProps["reportData"], title: string }) => {
  const [mapImage, setMapImage] = useState<string | null>(null)
  const [mapLoaded, setMapLoaded] = useState<boolean>(false)
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapLoaded) return
    if (mapImage) return // prevent generating the image
    const mapCanvas = mapRef.current!.querySelector(".mapboxgl-canvas") as HTMLCanvasElement
    const image = mapCanvas ? mapCanvas.toDataURL("image/png") : null
    setMapImage(image!)
  }, [mapImage, mapLoaded])

  const cx = "bg-white xl:w-4/5 w-full m-auto px-2 sm:px-10 pb-2 sm:pb-10 pt-6"
  const onIdle = () => setMapLoaded(true)

  return (
    <>
      <section className={twMerge(cx, "print:hidden")}>
        <Title title={title} />
        <Map reportData={reportData} mapRef={mapRef} onIdle={onIdle} />
      </section>
      <section className={twMerge(cx, "print:block hidden")}>
        <Title title={title} />
        <img
          src={`${mapImage}`}
          className="hidden print:block print:w-full print:mt-4 print:h-[500px]"
        />
      </section>
    </>
  )
}
