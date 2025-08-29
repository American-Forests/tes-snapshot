import { MAX_FILL_OPACITY } from "app/constants"
import { Facet } from "data/facets"
import mapboxgl from "mapbox-gl"

export function getFillExpression(facet: Facet): mapboxgl.Expression | undefined {
  const { field, data, style } = facet
  if (!style) return

  // Base case to handle null/undefined values
  const baseExpression: mapboxgl.Expression = [
    "case",
    [
      "all",
      ["has", field.field], // check if property exists
      ["!=", ["get", field.field], null], // check if value is not null
    ],
  ]

  if (data.type === "range") {
    const fillExp: mapboxgl.Expression = ["interpolate", ["linear"], ["get", field.field]]
    style.fill.forEach((d, i) => {
      fillExp.push(data.gradient[i + 1])
      fillExp.push(d)
    })
    // Add the interpolate expression as the "true" case and transparent as the "false" case
    baseExpression.push(fillExp, "transparent")
    return baseExpression
  } else if (data.type === "enum") {
    const variablesAndFill: (string | number)[] = []
    style.fill.forEach((fill, i) => {
      const variable = data.values[i]
      variablesAndFill.push(variable || "")
      variablesAndFill.push(fill)
    })
    const matchExp: mapboxgl.Expression = [
      "match",
      ["get", field.field],
      ...variablesAndFill,
      "transparent",
    ]
    // Add the match expression as the "true" case and transparent as the "false" case
    baseExpression.push(matchExp, "transparent")
    return baseExpression
  }
}

export function getOpacityExpression(facet: Facet): number | mapboxgl.Expression {
  const { field, data, style } = facet

  // Base case to handle null/undefined values
  const baseExpression: mapboxgl.Expression = [
    "case",
    [
      "all",
      ["has", field.field], // check if property exists
      ["!=", ["get", field.field], null], // check if value is not null
    ],
  ]

  if (data.type === "range" && style && style.opacity) {
    const opacityExp: mapboxgl.Expression = ["interpolate", ["linear"], ["get", field.field]]
    style.opacity?.forEach((d, i) => {
      opacityExp.push(data.gradient[i + 1])
      opacityExp.push(d * MAX_FILL_OPACITY)
    })
    // Add the interpolate expression as the "true" case and 0 as the "false" case
    baseExpression.push(opacityExp, 0)
    return baseExpression
  } else if (data.type === "enum" && style && style.opacity) {
    const variablesAndOpacity: (string | number)[] = []
    style.opacity.forEach((opacity, i) => {
      const variable = data.values[i]
      variablesAndOpacity.push(variable || "")
      variablesAndOpacity.push(opacity * MAX_FILL_OPACITY)
    })
    const matchExp: mapboxgl.Expression = ["match", ["get", field.field], ...variablesAndOpacity, 0]
    // Add the match expression as the "true" case and 0 as the "false" case
    baseExpression.push(matchExp, 0)
    return baseExpression
  }
  return MAX_FILL_OPACITY
}
