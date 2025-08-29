import mapboxgl, { MapboxGeoJSONFeature } from "mapbox-gl"
// import { env } from "lib/env"
import { useEffect, useState, useContext } from "react"
import { CityContext } from "app/features/regional-map/regional-map.state"
import useFacets from "hooks/use_facets"
import { useAtomValue } from "jotai"
import { facetsAtom } from "app/state"
import {
  SCENARIO_BLOCKGROUP_LINE_COLOR,
  BLOCKGROUP_LAYER_NAME,
  DEFAULT_SCENARIO_MAP_LAYER,
  TILESERVER_URL,
} from "app/constants"
import { Facet, range } from "data/facets"

export const ACCESS_TOKEN =
  "pk.eyJ1IjoidGVzYS1hcHAiLCJhIjoiY2trYml0ZWxyMGNkeTJ4cXF1dW01NnRtNSJ9.VAxuU7nwx-Fx3QlsKHw18w"

mapboxgl.accessToken = ACCESS_TOKEN

const MUTED_MAP_STYLE = "mapbox://styles/tesa-app/ckf7dsrw807la1amt1fjwh7l5"

export interface MapOptions {
  rememberPosition?: boolean
  hash?: boolean
  static?: boolean
  zoomControl?: boolean
  extent: [number, number, number, number]
  slugFilter?: string
  disableZoomOnScroll?: boolean
}

export function useScenarioMap(
  mapDiv: React.MutableRefObject<HTMLDivElement | null>,
  features: MapboxGeoJSONFeature[],
  options: MapOptions,
) {
  const [map, setMap] = useState<mapboxgl.Map | null>(null)
  const city = useContext(CityContext)!
  useFacets(city)
  const facets = useAtomValue(facetsAtom)!
  const facet: Facet = facets.find((f) => f.field.field === DEFAULT_SCENARIO_MAP_LAYER)!
  const facetData = facet.data as range

  useEffect(() => {
    if (!(mapDiv.current && !map)) return
    if (map) return
    const { extent } = options

    const newMap = new mapboxgl.Map({
      container: mapDiv.current,
      style: MUTED_MAP_STYLE,
      dragRotate: false,
      maxPitch: 0,
      bounds: extent,
      preserveDrawingBuffer: true,
      interactive: true,
      hash: options.hash,
      scrollZoom: !options.disableZoomOnScroll,
    })

    newMap.once("load", () => {
      newMap.addSource("scenario-features", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features,
        },
      })

      newMap.addSource("blockgroup", {
        type: "vector",
        tiles: [`${TILESERVER_URL}/${city.id}_blockgroup/{z}/{x}/{y}.pbf`],
        minzoom: 0,
      })

      newMap.addLayer({
        id: "scenario-features",
        type: "line",
        source: "scenario-features",
        paint: {
          "line-color": SCENARIO_BLOCKGROUP_LINE_COLOR,
          "line-width": 2,
        },
      })

      newMap.addLayer({
        source: "blockgroup",
        "source-layer": "data",
        id: BLOCKGROUP_LAYER_NAME,
        type: "fill",
      })

      newMap.setPaintProperty(BLOCKGROUP_LAYER_NAME, "fill-opacity", 0.5)
      newMap.setPaintProperty(BLOCKGROUP_LAYER_NAME, "fill-color", [
        "interpolate",
        ["linear"],
        ["get", DEFAULT_SCENARIO_MAP_LAYER],
        facetData.gradient[1],
        facet?.style?.fill[0],
        facetData.gradient[facetData.gradient.length - 2],
        facet?.style?.fill[1],
      ])

      newMap.getCanvas().style.cursor = "default"
      newMap.resize()
      setMap(newMap)
    })
  }, [map, mapDiv, options, features])

  return { map }
}
