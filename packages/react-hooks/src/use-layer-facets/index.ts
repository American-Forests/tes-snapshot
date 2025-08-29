import { useEffect } from "react"
import type { Map } from "mapbox-gl"
import { getFillExpression, getOpacityExpression } from "utils"
import type { Facet } from "tes-types"

export const useLayerFacets = ({
  map,
  layer,
  facet,
}: {
  map: mapboxgl.Map | null
  layer: string
  facet: any
}) => {
  useEffect(() => {
    if (!map) return
    const repaintLayer = (layer: string, facet: Facet) => {
      const { data } = facet
      const { style } = data
      if (style) {
        map.setPaintProperty(layer, "fill-color", getFillExpression(facet))
        if (style.opacity) {
          map.setPaintProperty(
            layer,
            "fill-opacity",
            getOpacityExpression(facet)
          )
        }
      }
    }
    repaintLayer(layer, facet)
    // this is used to update facets on basemap change
    map.on("style.load", () => {
      repaintLayer(layer, facet)
    })
  }, [map, facet])
}
