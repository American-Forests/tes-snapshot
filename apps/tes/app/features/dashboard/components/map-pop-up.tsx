import { MapboxGeoJSONFeature } from "mapbox-gl"
import { AGGREGATED_MUNICIPALITY_LAYER_NAME, BLOCKGROUP_LAYER_SOURCE, MUNICIPALITY_LAYER_SOURCE } from "../dashboard.constants"

export const MapPopUp = ({feature, tesLabel, compositeLabel}: {feature: MapboxGeoJSONFeature, tesLabel: string, compositeLabel: string}) => {
    const { properties, layer } = feature
    if (layer.id === AGGREGATED_MUNICIPALITY_LAYER_NAME) {
      return `<div class="text-center">
        <div class="text-gray-500 text-subtitle">${properties?.incorporated_place_name}</div>
      </div>`
    }
    if (layer.id === MUNICIPALITY_LAYER_SOURCE) {
      return `<div class="text-center">
        <div class="text-3xl font-bold text-brand-green-dark">${properties?.incorporated_place_mean_tree_equity_score}</div>
        <div class="text-sm text-brand-green-dark">${compositeLabel}</div>
        <div class="text-xs text-gray-500">${properties!.incorporated_place_name}, ${properties!.state}</div>
      </div>`
    }
    if (layer.id === BLOCKGROUP_LAYER_SOURCE) {
      return `<div class="text-center">
        <div class="text-3xl font-bold text-brand-green-dark">${properties?.tree_equity_score}</div>
        <div class="text-brand-green-dark text-annotation">${tesLabel}</div>
        <div class="text-gray-500 text-annotation">BG ${properties!.id}</div>
      </div>`
    }

    return null
  }