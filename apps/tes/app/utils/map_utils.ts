import {
  LevelName,
  PARCEL_ZOOM,
  BLOCKGROUP_ZOOM,
  MUNICIPALITY_LEVEL_NAME,
  BLOCKGROUP_LEVEL_NAME,
  PARCEL_LEVEL_NAME,
  MUNICIPALITY_ZOOM,
  AGGREGATED_MUNICIPALITY_LEVEL_NAME,
} from "app/constants"

export function numberToZoom(zoom: number, isNational: boolean): LevelName {
  if (zoom < MUNICIPALITY_ZOOM) {
    return AGGREGATED_MUNICIPALITY_LEVEL_NAME
  } else if (zoom < BLOCKGROUP_ZOOM) {
    return MUNICIPALITY_LEVEL_NAME
  } else if (isNational) {
    return BLOCKGROUP_LEVEL_NAME
  } else if (zoom >= BLOCKGROUP_ZOOM && zoom < PARCEL_ZOOM) {
    return BLOCKGROUP_LEVEL_NAME
  } else {
    return PARCEL_LEVEL_NAME
  }
}

export function setInitialZoom(map: mapboxgl.Map) {
  if (map.getZoom() < PARCEL_ZOOM) {
    map.zoomTo(PARCEL_ZOOM)
  }
}
