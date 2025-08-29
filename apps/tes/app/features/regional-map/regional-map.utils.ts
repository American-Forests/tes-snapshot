// import { env } from "lib/env"
import mapboxgl from "mapbox-gl"
import {
  PARCEL_ZOOM,
  PARCEL_LAYER_NAME,
  BLOCKGROUP_LAYER_NAME,
  RIGHT_OF_WAY_LAYER_NAME,
  PARCEL_OUTLINE_LAYER_NAME,
  BLOCKGROUP_OUTLINE_LAYER_NAME,
  RIGHT_OF_WAY_OUTLINE_LAYER_NAME,
  MUNICIPALITY_OUTLINE_LAYER_NAME,
  BLOCKGROUP_ZOOM,
  MUNICIPALITY_LAYER_NAME,
  DEFAULT_ACTIVE_FACET,
  DEFAULT_PARCEL_ACTIVE_FACET,
  DEFAULT_MUNICIPALITY_ACTIVE_FACET,
  BLOCKGROUP_OUTLINE_HOVER_LAYER_NAME,
  PARCEL_OUTLINE_HOVER_LAYER_NAME,
  RIGHT_OF_WAY_OUTLINE_HOVER_LAYER_NAME,
  TILESERVER_URL,
  MUNICIPALITY_ZOOM,
  AGGREGATED_MUNICIPALITY_LAYER_NAME,
} from "app/constants"
import { getFillExpression, getOpacityExpression } from "app/utils/paint_utils"
import { Facet } from "data/facets"
import { HIDE_TREES_LAYER_FROM_LOCATION } from "app/features/regional-map/regional-map.constants"

export function addMapLayers(params: {
  map: mapboxgl.Map
  isSatellite: boolean
  facets: Facet[]
  cityId: string
  treesTilesetId?: string
  municipalitySlugs?: string[]
}) {
  const { map, isSatellite, facets, cityId, treesTilesetId, municipalitySlugs } = params

  const defaultParcelFacet = facets.find(
    (f) => f.field.type == "Area" && f.field.field === DEFAULT_PARCEL_ACTIVE_FACET,
  )!

  const defaultBlockgroupFacet = facets.find(
    (f) => f.field.type == "Block Group" && f.field.field === DEFAULT_ACTIVE_FACET,
  )!

  const defaultMunicipalityFacet = facets.find(
    (f) => f.field.type == "Municipality" && f.field.field === DEFAULT_MUNICIPALITY_ACTIVE_FACET,
  )!

  const formatTileserverUrl = (layer: string): string => {
    return `${TILESERVER_URL}/${layer}/{z}/{x}/{y}.pbf`
  }

  const municipalityFilter = municipalitySlugs
    ? ["in", ["get", "slug"], ["literal", municipalitySlugs]]
    : undefined

  if (treesTilesetId && !HIDE_TREES_LAYER_FROM_LOCATION.includes(cityId)) {
    map.addSource("tree_canopy", {
      type: "vector",
      url: `mapbox://${treesTilesetId}`,
    })
  } else if(!HIDE_TREES_LAYER_FROM_LOCATION.includes(cityId)){
    map.addSource("tree_canopy", {
      type: "vector",
      tiles: [formatTileserverUrl(`${cityId}_tree`)],
      minzoom: PARCEL_ZOOM,
      maxzoom: PARCEL_ZOOM
    })
  }

  map.addSource("right_of_way", {
    type: "vector",
    tiles: [formatTileserverUrl(`${cityId}_row`)],
    minzoom: PARCEL_ZOOM,
    maxzoom: PARCEL_ZOOM
  })

  map.addSource("parcel", {
    type: "vector",
    tiles: [formatTileserverUrl(`${cityId}_parcel`)],
    minzoom: PARCEL_ZOOM,
    maxzoom: PARCEL_ZOOM
  })

  map.addSource("blockgroup", {
    type: "vector",
    tiles: [formatTileserverUrl(`${cityId}_blockgroup`)],
    minzoom: BLOCKGROUP_ZOOM,
    maxzoom: 11,
  })

  map.addSource("municipality", {
    type: "vector",
    tiles: [formatTileserverUrl(`${cityId == 'toronto' ? 'toronto' : 'national'}_municipality`)],
    minzoom: 2,
    maxzoom: 8,
  })

  const beforeLayer = isSatellite ? undefined : "admin-0-boundary-disputed"
  const beforePoi = isSatellite ? undefined : "poi-label"

  map.addLayer(
    {
      source: "parcel",
      "source-layer": "data",
      id: PARCEL_LAYER_NAME,
      type: "fill",
      minzoom: PARCEL_ZOOM,
      paint: {
        "fill-color": getFillExpression(defaultParcelFacet),
        "fill-opacity": getOpacityExpression(defaultParcelFacet),
      },
    },
    beforePoi,
  )

  map.addLayer(
    {
      source: "right_of_way",
      "source-layer": "data",
      id: RIGHT_OF_WAY_LAYER_NAME,
      type: "fill",
      minzoom: PARCEL_ZOOM,
      paint: {
        "fill-color": getFillExpression(defaultParcelFacet),
        "fill-opacity": getOpacityExpression(defaultParcelFacet),
      },
    },
    beforeLayer,
  )

  if(!HIDE_TREES_LAYER_FROM_LOCATION.includes(cityId)){
  map.addLayer({
    source: "tree_canopy",
    "source-layer": treesTilesetId ? "treesgeojsonl" : "data",
    id: "tree_canopy",
    type: "fill",
    minzoom: PARCEL_ZOOM,
    paint: {
      "fill-color": "#3F9A94",
        "fill-opacity": 0.15,
      },
    })
  }

  map.addLayer({
    source: "tree_canopy",
    "source-layer": treesTilesetId ? "treesgeojsonl" : "data",
    id: "tree_canopy-outlines",
    type: "line",
    minzoom: PARCEL_ZOOM,
    paint: {
      "line-color": "#3F9A81",
      "line-width": 0.8,
    },
  })

  map.addLayer(
    {
      source: "blockgroup",
      "source-layer": "data",
      id: BLOCKGROUP_LAYER_NAME,
      type: "fill",
      minzoom: 0,
      maxzoom: PARCEL_ZOOM,
      paint: {
        "fill-color": getFillExpression(defaultBlockgroupFacet),
        "fill-opacity": getOpacityExpression(defaultBlockgroupFacet),
      },
    },
    beforePoi,
  )

  map.addLayer(
    {
      source: "right_of_way",
      "source-layer": "data",
      id: RIGHT_OF_WAY_OUTLINE_LAYER_NAME,
      type: "line",
      minzoom: PARCEL_ZOOM,
    },
    beforePoi,
  )

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
      ...(municipalityFilter && { filter: municipalityFilter }),
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
      ...(municipalityFilter && { filter: municipalityFilter }),
    },
    beforePoi,
  )

  map.addLayer(
    {
      source: "parcel",
      "source-layer": "data",
      id: PARCEL_OUTLINE_LAYER_NAME,
      type: "line",
      minzoom: PARCEL_ZOOM,
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
      maxzoom: 24,
      ...(municipalityFilter && { filter: municipalityFilter }),
    },
    beforePoi,
  )

  map.addLayer({
    source: "blockgroup",
    "source-layer": "data",
    id: BLOCKGROUP_OUTLINE_HOVER_LAYER_NAME,
    type: "line",
    minzoom: BLOCKGROUP_ZOOM,
  })

  map.addLayer({
    source: "right_of_way",
    "source-layer": "data",
    id: RIGHT_OF_WAY_OUTLINE_HOVER_LAYER_NAME,
    type: "line",
    minzoom: PARCEL_ZOOM,
  })

  map.addLayer({
    source: "parcel",
    "source-layer": "data",
    id: PARCEL_OUTLINE_HOVER_LAYER_NAME,
    type: "line",
    minzoom: PARCEL_ZOOM,
  })
}
