import { Facet } from "app/features/facets/facets.constants"
import { Expression } from "mapbox-gl"

export const getFillExpression = (facet: Facet): Expression => {
  const fillExp: Expression = ["interpolate", ["linear"], ["get", facet.attr]]
  facet.data.style!.fill.forEach((gradientFill, i) => {
    const gradientStop = facet.data.style!.stops[i] as number
    fillExp.push(gradientStop)
    fillExp.push(gradientFill)
  })
  return fillExp
}
