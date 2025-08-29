import type { MapboxGeoJSONFeature, Map } from "mapbox-gl"
import type { MapFeatureState } from "tes-types"

export const setFeatureState = ({
  map,
  feature,
  state,
}: {
  map: Map
  feature: MapboxGeoJSONFeature
  state: MapFeatureState
}) => {
  map.setFeatureState(
    {
      source: feature.layer["source"] as string,
      sourceLayer: feature.layer["source-layer"] as string,
      id: feature.id,
    },
    { [state]: true }
  )
}

export const cleanFeatureState = ({
  map,
  feature,
  state,
}: {
  map: Map
  feature: MapboxGeoJSONFeature
  state: MapFeatureState
}) => {
  map.setFeatureState(
    {
      source: feature.layer["source"] as string,
      sourceLayer: feature.layer["source-layer"] as string,
      id: feature.id,
    },
    { [state]: false }
  )
}

export const getFeatureState = ({
  map,
  feature,
}: {
  map: Map
  feature: MapboxGeoJSONFeature
}) => map.getFeatureState(feature)
