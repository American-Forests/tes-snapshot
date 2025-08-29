import {
  LOCALITY_LIKE_SOURCE,
  AGGREGATED_LOCALITY_LIKE_SOURCE,
  LOCALITY_LIKE_LAYER,
} from "app/features/map/map.constants"
import { DEFAULT_LOCALITY_LIKE_FACET, FACETS } from "../facets/facets.constants"
import { Facet } from "tes-types"

function getTooltipString({
  title,
  value,
  label,
  caption,
}: {
  title?: string
  value?: string
  label?: string
  caption?: string
}) {
  return `<div class='flex flex-col items-center rounded-md px-2'>
  ${
    title
      ? `<div class="text-lg text-brand-green-dark font-semibold text-center leading-tight">${title}</div>`
      : ``
  }
  ${
    value ? `<div class="text-5xl font-black text-brand-green-dark text-center">${value}</div>` : ``
  }
  ${
    label
      ? `<div class="text-md text-brand-green-dark font-semibold pt-1 leading-tight text-center">${label}</div>`
      : ``
  }
  ${
    caption
      ? `<div class="text-xs text-gray-400 font-medium leading-tight pt-1 text-center">${caption}</div>`
      : ``
  }
  </div>`
}
function getContent(feature: mapboxgl.MapboxGeoJSONFeature | undefined, facet?: Facet) {
  if (feature?.source === AGGREGATED_LOCALITY_LIKE_SOURCE) {
    const title = `${feature.properties?.name}, ${feature.properties?.country}`
    const content = getTooltipString({
      title,
    })
    return content
  }
  if (feature?.source === LOCALITY_LIKE_SOURCE) {
    const label = facet?.name
    const title = `${feature.properties?.name}, ${feature.properties?.country}`
    const data =
      feature.properties && facet && feature.properties[facet.tooltipAttribute || facet.attr]
    const content = facet?.getTooltipString
      ? facet.getTooltipString(facet, feature) // fully custom tooltip
      : getTooltipString({
          title,
          label,
          value: facet?.tooltipFormatter ? facet.tooltipFormatter(data as number) : data,
        })
    return content
  }
  const label = facet?.name
  const data =
    feature?.properties && facet && feature.properties[facet.tooltipAttribute || facet.attr]
  const value = facet?.tooltipFormatter ? facet.tooltipFormatter(data as number) : data
  const content =
    feature && facet?.getTooltipString
      ? facet.getTooltipString(facet, feature) // fully custom tooltip
      : getTooltipString({
          label,
          value,
        })
  return content
}
export const getHoverPopupContent = (
  feature: mapboxgl.MapboxGeoJSONFeature,
  facet: Facet
): string => {
  const localityDefaultFacet = FACETS.filter((f) => f.layer === LOCALITY_LIKE_LAYER).find(
    (f) => f.attr === DEFAULT_LOCALITY_LIKE_FACET
  )
  const activeFacet = feature?.source === LOCALITY_LIKE_SOURCE ? localityDefaultFacet : facet
  if (feature?.source === AGGREGATED_LOCALITY_LIKE_SOURCE) {
    return getContent(feature)
  }
  return getContent(feature, activeFacet)
}
