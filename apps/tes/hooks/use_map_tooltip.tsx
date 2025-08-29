import mapboxgl from "mapbox-gl"
import { Facet } from "data/facets"
import type {
  Area,
  AreaOnScenario,
  Blockgroup,
  BlockgroupOnScenario,
  Municipality,
  Scenario,
} from "db"
import { useRef, useEffect } from "react"
import {
  AGGREGATED_MUNICIPALITY_LAYER_NAME,
  BLOCKGROUP_LAYER_NAME,
  BLOCKGROUP_LEVEL_NAME,
  MUNICIPALITY_LAYER_NAME,
  PARCEL_LAYER_NAME,
  RIGHT_OF_WAY_LAYER_NAME,
} from "app/constants"
import { getShadeTime, isShadeFacet } from "app/features/national-map/national-map.utils"
import { useTranslation } from "react-i18next"

const LAYER_LIST = [
  AGGREGATED_MUNICIPALITY_LAYER_NAME,
  MUNICIPALITY_LAYER_NAME,
  BLOCKGROUP_LAYER_NAME,
  PARCEL_LAYER_NAME,
  RIGHT_OF_WAY_LAYER_NAME,
]

const tooltipClasses = {
  container: "flex flex-col items-center rounded-md px-2",
  title: "text-lg text-brand-green-dark font-semibold text-center",
  value: "text-5xl font-black text-brand-green-dark pb-2",
  label: "text-md text-brand-green-dark font-semibold",
  caption: "text-xs text-gray-400 font-medium leading-tight pt-1",
}

function tooltip({
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
  return `<div class='${tooltipClasses.container}'>
  ${title ? `<div class="${tooltipClasses.title}">${title}</div>` : ``}
  ${value ? `<div class="${tooltipClasses.value}">${value}</div>` : ``}
  ${label ? `<div class="${tooltipClasses.label} pt-1">${label}</div>` : ``}
  ${caption ? `<div class="${tooltipClasses.caption}">${caption}</div>` : ``}
  </div>`
}

const shadeFacetTooltip = ({
  facet,
  data,
  formattedValue,
  treeShade,
  buildingShade,
  scenario,
  facetName,
  translatorFunction,
}: {
  treeShade: number
  buildingShade: number
  data: number | string | boolean | null
  formattedValue: number | string | boolean | null
  facet: Facet
  scenario?: Scenario
  facetName: string
  translatorFunction: (key: string) => string
}) => {
  if (!data) return tooltip({ value: "NA", label: facetName })
  return `<div class='${tooltipClasses.container}'>
    <div class='${tooltipClasses.title}'>${facetName} ${translatorFunction(
    "common:total_shade"
  )}</div>
    <div class='${tooltipClasses.value}'>${formattedValue}</div>
    <p class='${tooltipClasses.label}'>
      ${translatorFunction("common:buildings")}: ${facet.formatter(buildingShade)}
    </p>
    <p class='${tooltipClasses.label}'>
      ${translatorFunction("common:trees_and_other")}: ${facet.formatter(treeShade)}
    </p>
    <div class='${tooltipClasses.caption}'>
      ${scenario ? `${translatorFunction("click_to_add")}` : ""}
    </div>
  </div>`
}

export default function useMapTooltip({
  map,
  facet,
  scenario,
}: {
  map: mapboxgl.Map
  facet: Facet | null
  scenario?:
    | (Scenario & {
        areas: (AreaOnScenario & { area: Area })[]
        blockgroups: (BlockgroupOnScenario & { blockgroup: Blockgroup })[]
      })
    | undefined
}) {
  const hoverPopup = useRef<mapboxgl.Popup | null>(null)

  const { t } = useTranslation(["facets", "map", "common"])

  useEffect(() => {
    if (!map) return

    const onMouseLeave = () => {
      map.getCanvas().style.cursor = "default"
      if (hoverPopup.current) {
        hoverPopup.current.remove()
      }
    }

    const onMouseMove = (
      e: mapboxgl.MapMouseEvent & {
        features?: mapboxgl.MapboxGeoJSONFeature[] | undefined
      }
    ) => {
      if (e.features && e.features.length == 0) return
      map.getCanvas().style.cursor = "pointer"
      const feature = e.features && e.features[0]!

      if (!hoverPopup.current) {
        hoverPopup.current = new mapboxgl.Popup({
          closeOnClick: false,
          closeButton: false,
          offset: [0, -2],
        })
      }

      function getTooltipContent(
        feature: mapboxgl.MapboxGeoJSONFeature | undefined,
        facet: Facet | null
      ) {
        if (!feature || !facet) return null

        const facetName = t(`facets:${facet.field.field}.name`)
        const blockgroupFeatureAndFacetMatch =
          feature.layer.id === BLOCKGROUP_LAYER_NAME && facet.field?.type === BLOCKGROUP_LEVEL_NAME

        if (blockgroupFeatureAndFacetMatch) {
          const properties = feature.properties as Blockgroup
          const data = properties[facet.field.field as keyof Blockgroup]
          const formattedValue = facet.formatter ? facet.formatter(data as number) : data

          if (isShadeFacet(facet)) {
            const shadeTime = getShadeTime(facet)
            const buildingShade = properties[`building_${shadeTime}` as keyof Blockgroup] as number
            const treeShade = properties[`trees_${shadeTime}` as keyof Blockgroup] as number
            return shadeFacetTooltip({
              facetName,
              facet,
              data,
              formattedValue,
              buildingShade,
              treeShade,
              translatorFunction: t,
            })
          }

          return tooltip({
            value: formattedValue + "",
            label: facetName,
            caption: scenario ? `${t("common:click_to_add")}` : undefined,
          })
        }

        const areaFeatureAndFacetMatch =
          (feature.layer.id === PARCEL_LAYER_NAME ||
            feature.layer.id === RIGHT_OF_WAY_LAYER_NAME) &&
          facet.field?.type === "Area"

        if (areaFeatureAndFacetMatch) {
          const properties = feature.properties as Area
          const data = properties[facet.field.field as keyof Area]
          const facetName = t(`facets:${facet.field.field}.name`)
          const formattedValue = facet.formatter ? facet.formatter(data as number) : data
          if (isShadeFacet(facet)) {
            const shadeTime = getShadeTime(facet)
            const buildingShade = properties[`building_${shadeTime}` as keyof Area] as number
            const treeShade = properties[`trees_${shadeTime}` as keyof Area] as number
            return shadeFacetTooltip({
              facetName,
              facet,
              data,
              formattedValue,
              buildingShade,
              treeShade,
              translatorFunction: t,
            })
          }
          return tooltip({
            value: formattedValue + "",
            label: facetName,
            caption: scenario ? `${t("common:click_to_add")}` : undefined,
          })
        }

        /**
         * aggregated municipality and municipality tooltips
         */

        if (feature.layer.id === MUNICIPALITY_LAYER_NAME) {
          const properties = feature.properties as Municipality
          return tooltip({
            title:
              properties["incorporated_place_name" as keyof Municipality] +
              ", " +
              (properties["state" as keyof Municipality] as string).toUpperCase(),
            value:
              (properties["incorporated_place_mean_tree_equity_score" as keyof Municipality]
                ? properties["incorporated_place_mean_tree_equity_score" as keyof Municipality]
                : "") + "",
            label: `${t("map:composite_score_tooltip_name")}`,
            caption: `<div class="flex flex-col items-center justify-center"><p>${t(
              "map:composite_score_tooltip1"
            )}</p><p class=" p-0">${t("map:composite_score_tooltip2")}</p></div>`,
          })
        }

        if (feature.layer.id === AGGREGATED_MUNICIPALITY_LAYER_NAME) {
          const properties = feature.properties as Municipality
          return tooltip({
            title:
              properties["incorporated_place_name" as keyof Municipality] +
              ", " +
              (properties["state" as keyof Municipality] as string).toUpperCase(),
          })
        }
        return null
      }

      const content = getTooltipContent(feature, facet)

      if (content) {
        hoverPopup.current.setLngLat(e.lngLat).setHTML(content).addTo(map)
      }
    }

    LAYER_LIST.forEach((source) => {
      map.on("mousemove", source, onMouseMove)
      map.on("mouseleave", source, onMouseLeave)
    })

    return () => {
      LAYER_LIST.forEach((source) => {
        map.off("mousemove", source, onMouseMove)
        map.off("mouseleave", source, onMouseLeave)
      })
    }
  }, [map, facet, scenario])
}
