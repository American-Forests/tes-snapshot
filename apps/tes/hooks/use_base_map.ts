import { useEffect, useState } from "react"
import mapboxgl from "mapbox-gl"
import { facetsAtom } from "app/state"
import { useAtomValue } from "jotai"
import type { City } from "app/features/regional-map/regional-map.types"
import { Facet } from "data/facets"

export const MUTED_MAP_STYLE = "mapbox://styles/tesa-app/ckf7dsrw807la1amt1fjwh7l5"
export const SATELLITE_MAP_STYLE = "mapbox://styles/tesa-app/cl1y3sjid001o14mwv9bes7wg"
export type BaseMapStyle = typeof MUTED_MAP_STYLE | typeof SATELLITE_MAP_STYLE

export default function useBaseMap(
  map: mapboxgl.Map | null,
  facetsLoaded: boolean,
  city: City,
  addMapLayers: ({
    map,
    facets,
    isSatellite,
    cityId,
    treesTilesetId,
  }: {
    map: mapboxgl.Map
    isSatellite: boolean
    facets: Facet[]
    cityId: string
    treesTilesetId?: string
  }) => void,
) {
  const [baseMapStyle, setBaseMapStyle] = useState<BaseMapStyle>(MUTED_MAP_STYLE)
  const [baseMapStyleIsLoaded, setBaseMapStyleIsLoaded] = useState<boolean>(false)
  const facets = useAtomValue(facetsAtom)

  useEffect(() => {
    if (!map) return
    if (!facetsLoaded) return
    setBaseMapStyleIsLoaded(false)
    map.setStyle(baseMapStyle, { diff: false })
    map.once("style.load", () => {
      setBaseMapStyleIsLoaded(true)
      addMapLayers({
        map,
        isSatellite: baseMapStyle === SATELLITE_MAP_STYLE,
        facets,
        cityId: city.id,
        treesTilesetId: city.treesTilesetId,
      })
    })
  }, [baseMapStyle, facetsLoaded])

  return { baseMapStyle, setBaseMapStyle, baseMapStyleIsLoaded, setBaseMapStyleIsLoaded }
}
