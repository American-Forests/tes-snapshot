import type { Map, Expression } from "mapbox-gl"
import type { Facet, ColorValueHex } from "tes-types"

const MAX_FILL_OPACITY = 0.75
export const getFillExpression = (facet: Facet): Expression => {
  const { data, attr } = facet
  const { style, type, values } = data
  if (type === "range") {
    // RANGE
    const fillExp: Expression = ["interpolate", ["linear"], ["get", attr]]
    style!.fill.forEach((gradientFill: ColorValueHex, i: number) => {
      const gradientStop = style!.stops[i] as number
      fillExp.push(gradientStop)
      fillExp.push(gradientFill)
    })
    return fillExp
  } else if (type === "quantile") {
    // QUANTILES
    const variablesAndFill: (string | number)[] = []
    style!.fill.forEach((gradientFill: ColorValueHex, i: number) => {
      const variable = values[i] as number
      variablesAndFill.push(gradientFill)
      variablesAndFill.push(variable)
    })
    const fillExp: Expression = [
      "step",
      ["get", attr],
      ...variablesAndFill,
      style!.fill[style!.fill.length - 1],
    ]
    return fillExp
  } else if (type === "enum") {
    //ENUM
    const variablesAndFill: (string | number)[] = []
    style!.fill.forEach((fill, i) => {
      const variable = values[i]
      variablesAndFill.push(variable || "")
      variablesAndFill.push(fill)
    })
    const fillExp: Expression = [
      "match",
      ["get", attr],
      ...variablesAndFill,
      "transparent",
    ]
    return fillExp
  }
  // DEFAULT DEBUGGER GRADIENT
  return ["interpolate", "linear", ["get", attr], "#FFF", "#000"]
}

export const getOpacityExpression = (
  facet: Facet,
  maxOpacity?: number
): Expression => {
  const fillExp: Expression = ["interpolate", ["linear"], ["get", facet.attr]]
  const opacityMultiplier = maxOpacity || MAX_FILL_OPACITY
  facet.data.style!.opacity?.forEach((gradientOpacity: number, i: number) => {
    const gradientStop = facet.data.style!.stops[i] as number
    fillExp.push(gradientStop)
    fillExp.push(gradientOpacity * opacityMultiplier)
  })
  return fillExp
}

export const toggleLayer = ({
  map,
  layerId,
  layerOpacity,
}: {
  map: Map
  layerId: string
  layerOpacity: number
}) => {
  const currentVisibilityState = map.getLayoutProperty(layerId, "visibility")
  const isLayerVisible = currentVisibilityState === "visible"
  if (!isLayerVisible) {
    // update visibility for first layer display
    map.setLayoutProperty(layerId, "visibility", "visible")
  } else {
    // on subsequent toggles update fill-opacity
    // this avoids loading layer data each toggle
    const visible = map.getPaintProperty(layerId, "fill-opacity")
    map.setPaintProperty(layerId, "fill-opacity", visible ? 0 : layerOpacity)
  }
}
