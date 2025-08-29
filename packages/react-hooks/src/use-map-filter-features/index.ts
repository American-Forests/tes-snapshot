import { useEffect } from "react"
import { Map, Expression } from "mapbox-gl"

type propTypes = {
  map: Map | null
  featuresIds: string[]
  layers: string[]
}

export const useMapFilterFeatures = ({
  map,
  featuresIds,
  layers,
}: propTypes) => {
  useEffect(() => {
    if (map && layers.length) {
      const filterExpression: Expression = [
        "match",
        ["get", "id"],
        featuresIds,
        true,
        false,
      ]
      layers.forEach((layer) => {
        map.setFilter(layer, filterExpression)
      })
    }
  }, [map, layers, featuresIds])
}
