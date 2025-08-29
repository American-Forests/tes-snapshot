// import { env } from "lib/env"
import mapboxgl from "mapbox-gl"
import {
  AGGREGATED_MUNICIPALITY_LAYER_NAME,
  BLOCKGROUP_LAYER_NAME,
  BLOCKGROUP_OUTLINE_HOVER_LAYER_NAME,
  BLOCKGROUP_OUTLINE_LAYER_NAME,
  BLOCKGROUP_ZOOM,
  DEFAULT_ACTIVE_FACET,
  DEFAULT_MUNICIPALITY_ACTIVE_FACET,
  MUNICIPALITY_LAYER_NAME,
  MUNICIPALITY_OUTLINE_LAYER_NAME,
  TILESERVER_URL,
} from "app/constants"
import { getFillExpression, getOpacityExpression } from "app/utils/paint_utils"
import { Facet } from "data/facets"
import { MUNICIPALITY_ZOOM } from "app/constants"

export default function addNationalExplorerMapLayers(params: {
  map: mapboxgl.Map
  isSatellite: boolean
  facets: Facet[]
  cityId: string
}) {
  const { map, isSatellite, facets } = params

  const defaultMunicipalityFacet = facets.find(
    (f) => f.field.type == "Municipality" && f.field.field === DEFAULT_MUNICIPALITY_ACTIVE_FACET,
  )!

  const defaultBlockgroupFacet = facets.find(
    (f) => f.field.type == "Block Group" && f.field.field === DEFAULT_ACTIVE_FACET,
  )!

  const beforePoi = isSatellite ? undefined : "poi-label"

  const formatTileserverUrl = (layer: string): string => {
    return `${TILESERVER_URL}/${layer}/{z}/{x}/{y}.pbf`
  }

  /**
   * in the sources, minzoom and maxzoom need to match those of the tileset. if the maxzoom isn't set
   * the tiles won't overzoom correctly.
   */
  map.addSource("municipality", {
    type: "vector",
    tiles: [formatTileserverUrl("national_municipality")],
    minzoom: 2,
    maxzoom: 8,
  })

  map.addSource("blockgroup", {
    type: "vector",
    tiles: [formatTileserverUrl("national_blockgroup")],
    minzoom: 9,
    maxzoom: 11,
  })

  map.addLayer(
    {
      source: "municipality",
      "source-layer": "data",
      id: AGGREGATED_MUNICIPALITY_LAYER_NAME,
      type: "fill",
      minzoom: 2,
      maxzoom: MUNICIPALITY_ZOOM,
      paint: {
        "fill-color": "#33966D",
      },
    },
    beforePoi,
  )

  map.addLayer(
    {
      source: "municipality",
      "source-layer": "data",
      id: MUNICIPALITY_LAYER_NAME,
      type: "fill",
      minzoom: MUNICIPALITY_ZOOM,
      maxzoom: BLOCKGROUP_ZOOM,
      paint: {
        "fill-color": getFillExpression(defaultMunicipalityFacet),
        "fill-opacity": getOpacityExpression(defaultMunicipalityFacet),
      },
    },
    beforePoi,
  )

  map.addLayer(
    {
      source: "blockgroup",
      "source-layer": "data",
      id: BLOCKGROUP_LAYER_NAME,
      type: "fill",
      minzoom: BLOCKGROUP_ZOOM,
      paint: {
        "fill-color": getFillExpression(defaultBlockgroupFacet),
        "fill-opacity": getOpacityExpression(defaultBlockgroupFacet),
      },
    },
    beforePoi,
  )

  map.addLayer(
    {
      source: "blockgroup",
      "source-layer": "data",
      id: BLOCKGROUP_OUTLINE_LAYER_NAME,
      type: "line",
      minzoom: BLOCKGROUP_ZOOM,
    },
    beforePoi,
  )

  map.addLayer(
    {
      source: "municipality",
      "source-layer": "data",
      id: MUNICIPALITY_OUTLINE_LAYER_NAME,
      type: "line",
      minzoom: MUNICIPALITY_ZOOM,
    },
    beforePoi,
  )

  map.addLayer(
    {
      source: "blockgroup",
      "source-layer": "data",
      id: BLOCKGROUP_OUTLINE_HOVER_LAYER_NAME,
      type: "line",
      minzoom: BLOCKGROUP_ZOOM,
    },
    beforePoi,
  )
}
