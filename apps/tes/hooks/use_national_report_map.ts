import mapboxgl from "mapbox-gl"
import { useEffect, useState } from "react"
import useFacets from "./use_facets"
import { CITIES } from "app/features/regional-map/regional-map.constants"
import { useAtomValue } from "jotai"
import { facetsAtom } from "app/state"
import { Facet } from "data/facets"
import {
  BLOCKGROUP_LAYER_NAME,
  BLOCKGROUP_LINE_COLOR,
  BLOCKGROUP_OUTLINE_LAYER_NAME,
  DEFAULT_SCENARIO_MAP_LAYER,
  MUNICIPALITY_LAYER_NAME,
  MUNICIPALITY_LINE_COLOR,
  MUNICIPALITY_OUTLINE_LAYER_NAME,
  MUNICIPALITY_ZOOM,
  TILESERVER_URL,
} from "app/constants"
// import { env } from "lib/env"
import { MUTED_MAP_STYLE } from "./use_base_map"
import { getFillExpression } from "app/utils/paint_utils"
import { BBox } from "@turf/helpers"

export const ACCESS_TOKEN =
  "pk.eyJ1IjoidGVzYS1hcHAiLCJhIjoiY2trYml0ZWxyMGNkeTJ4cXF1dW01NnRtNSJ9.VAxuU7nwx-Fx3QlsKHw18w"

mapboxgl.accessToken = ACCESS_TOKEN

export function useNationalReportMap({
  mapDiv,
  extent,
  showMunicipalityLayer,
}: {
  mapDiv: React.MutableRefObject<HTMLDivElement | null>
  extent: BBox
  showMunicipalityLayer?: boolean
}): mapboxgl.Map | null {
  const [map, setMap] = useState<mapboxgl.Map | null>(null)
  const nationalLocation = CITIES.find((city) => city.id === "national")!
  useFacets(nationalLocation)
  const facets = useAtomValue(facetsAtom)

  const [blockgroupFacet, setBlockgroupFacet] = useState<Facet>()
  const [municipalityFacet, setMunicipalityFacet] = useState<Facet>()

  useEffect(() => {
    if (!facets) return
    setBlockgroupFacet(facets.find((f) => f.field.field === DEFAULT_SCENARIO_MAP_LAYER))
    setMunicipalityFacet(
      facets.find((f) => f.field.field === "incorporated_place_mean_tree_equity_score"),
    )
  }, [facets])

  useEffect(() => {
    if (!mapDiv.current) return
    if (map) return
    if (!blockgroupFacet || !municipalityFacet) return

    const newMap = new mapboxgl.Map({
      container: mapDiv.current,
      style: MUTED_MAP_STYLE,
      dragRotate: false,
      maxPitch: 0,
      preserveDrawingBuffer: true,
      interactive: false,
      hash: false,
      scrollZoom: false,
      bounds: [
        [extent[0], extent[1]],
        [extent[2], extent[3]],
      ],
    })

    const beforePoi = "poi-label"

    // TODO: add filter to just incorporated place, congressional district, state when data is available
    newMap.once("load", () => {
      showMunicipalityLayer &&
        newMap.addSource("municipality", {
          type: "vector",
          tiles: [`${TILESERVER_URL}/national_municipality/{z}/{x}/{y}.pbf`],
          minzoom: 0,
        })

      newMap.addSource("blockgroup", {
        type: "vector",
        tiles: [`${TILESERVER_URL}/national_blockgroup/{z}/{x}/{y}.pbf`],
        minzoom: 0,
      })

      showMunicipalityLayer &&
        newMap.addLayer(
          {
            source: "municipality",
            "source-layer": "data",
            id: MUNICIPALITY_LAYER_NAME,
            type: "fill",
            minzoom: 0,
            maxzoom: 7,
          },
          beforePoi,
        )

      newMap.addLayer(
        {
          source: "blockgroup",
          "source-layer": "data",
          id: BLOCKGROUP_LAYER_NAME,
          type: "fill",
        },
        beforePoi,
      )

      newMap.addLayer(
        {
          source: "blockgroup",
          "source-layer": "data",
          id: BLOCKGROUP_OUTLINE_LAYER_NAME,
          type: "line",
        },
        beforePoi,
      )

      showMunicipalityLayer &&
        newMap.addLayer(
          {
            source: "municipality",
            "source-layer": "data",
            id: MUNICIPALITY_OUTLINE_LAYER_NAME,
            type: "line",
            minzoom: MUNICIPALITY_ZOOM,
            maxzoom: 24,
          },
          beforePoi,
        )

      /** municipality styling */
      if (showMunicipalityLayer) {
        newMap.setPaintProperty(
          MUNICIPALITY_LAYER_NAME,
          "fill-color",
          getFillExpression(municipalityFacet),
        )
        newMap.setPaintProperty(MUNICIPALITY_LAYER_NAME, "fill-opacity", 0.75)
        newMap.setPaintProperty(
          MUNICIPALITY_OUTLINE_LAYER_NAME,
          "line-color",
          MUNICIPALITY_LINE_COLOR,
        )
        newMap.setPaintProperty(MUNICIPALITY_OUTLINE_LAYER_NAME, "line-width", 1)
      }

      /** blockgroup styling */
      newMap.setPaintProperty(
        BLOCKGROUP_LAYER_NAME,
        "fill-color",
        getFillExpression(blockgroupFacet),
      )
      newMap.setPaintProperty(BLOCKGROUP_LAYER_NAME, "fill-opacity", 0.75)
      newMap.setPaintProperty(BLOCKGROUP_OUTLINE_LAYER_NAME, "line-color", BLOCKGROUP_LINE_COLOR)
      newMap.setPaintProperty(BLOCKGROUP_OUTLINE_LAYER_NAME, "line-width", 0.5)

      newMap.getCanvas().style.cursor = "default"
      newMap.resize()
      setMap(newMap)
    })
  }, [mapDiv, map, municipalityFacet, blockgroupFacet])

  return map
}
