import { useQuery } from "@blitzjs/rpc"
import { useCallback, useEffect, useRef, useState } from "react"
import {
  useMap,
  LayersConfig,
  useMapTooltip,
  useMapState,
  ALL_INTERACTIONS,
  INTERACTIONS,
  useMapStyles,
  useMapZoomDisclosure,
} from "react-hooks"
import {
  TABLE_MAP_LAYERS,
  TES_BLOCKGROUP_FACET,
  TES_MUNICIPALITY_FACET,
  MUNICIPALITY_LAYER_SOURCE,
  AGGREGATED_MUNICIPALITY_LAYER_NAME,
} from "../../dashboard.constants"
import getExtent from "app/blockgroups/queries/getExtent"
import { mapTableAtom, targetScoreAtom } from "../../dashboard.state"
import { useAtom, useAtomValue } from "jotai"
import { Blockgroup } from "db"
import {
  AdvancedPlanningToolType,
  BlockgroupTableRowData,
  BLOCKGROUP_PLANNING_TOOL_TYPE,
  LocalityTableRowData,
} from "./data-table/types"
import { getFilterForLayer } from "../../utils"
import { difference } from "lodash"
import { TILESERVER_URL } from "app/constants"
import { MapPopUp } from "../map-pop-up"
import { BLOCKGROUP_ZOOM, MUNICIPALITY_ZOOM } from "app/constants"
import { useTranslation } from "react-i18next"

export const TableMap = ({
  blockgroups,
  type,
  tableData,
}: {
  blockgroups: Blockgroup[]
  type: AdvancedPlanningToolType
  tableData: BlockgroupTableRowData[] | LocalityTableRowData[]
}) => {
  const mapDiv = useRef<HTMLDivElement>(null)
  const [mapOnState, setMapOnState] = useAtom(mapTableAtom)
  const [mapZoom, setMapZoom] = useState(0)
  const targetScore = useAtomValue(targetScoreAtom)
  const [bounds] = useQuery(getExtent, {
    blockgroupIds: blockgroups.map((f: Blockgroup) => f.id),
  })
  const mapLayersWithFilters = TABLE_MAP_LAYERS.map((layer) => {
    return {
      ...layer,
      filter: getFilterForLayer(layer.source, blockgroups),
    }
  })

  const layersConfig: LayersConfig = {
    tileServerUrl: TILESERVER_URL,
    layers: mapLayersWithFilters,
    sources: ["national_blockgroup", "national_municipality"],
    sourcesZoom: {
      national_blockgroup: { minZoom: 10, maxZoom: 11 },
      national_municipality: { minZoom: 2, maxZoom: 8 },
    },
    promoteId: "id",
  }

  const { map } = useMap({
    mapDiv: mapDiv,
    mapboxglAccessToken: process.env.NEXT_PUBLIC_MAPBOXGL_ACCESS_TOKEN!,
    layersConfig,
    options: {
      hash: false,
      padding: 5,
      navigationControl: true,
      dragRotate: false,
      bounds: bounds as [number, number, number, number],
    },
  })

  useEffect(() => {
    if (map && !mapOnState) {
      setMapOnState(map as mapboxgl.Map)
      // Avoid map scroll zooming
      map.scrollZoom.disable()
    }
  }, [map, mapOnState])

  useEffect(() => {
    if (map) {
      //This first zoom level is set when the map is initialized
      setMapZoom(map.getZoom())
      map.on("zoomend", () => {
        setMapZoom(map.getZoom())
      })
    }
  }, [map])

  const state = useMapState({
    map,
    layers: mapLayersWithFilters,
  })

  useMapStyles({
    layers: mapLayersWithFilters,
    map,
    state,
    interactions: ALL_INTERACTIONS.filter((i) => i !== INTERACTIONS.ON_CLICK),
  })
  const { t } = useTranslation(["facets", "map"])
  const tesLabel = t("facets:tree_equity_score.name")
  const compositeLabel = t("map:composite_score_tooltip_name")
  useMapTooltip({
    map,
    activeFacet:
      type === BLOCKGROUP_PLANNING_TOOL_TYPE ? TES_BLOCKGROUP_FACET : TES_MUNICIPALITY_FACET,
    layers: mapLayersWithFilters.map((layer) => layer.id),
    getHoverPopupContent: (feature) => MapPopUp({feature, tesLabel, compositeLabel}),
  })

  useMapZoomDisclosure({
    map,
    zoomLayersSteps: [
      {
        id: AGGREGATED_MUNICIPALITY_LAYER_NAME,
        nextStep: MUNICIPALITY_ZOOM,
      },
      { id: MUNICIPALITY_LAYER_SOURCE, nextStep: BLOCKGROUP_ZOOM },
    ],
  })

  const setFeatureSelectedState = useCallback(
    ({
      id,
      selected,
      map,
      source,
    }: {
      id: string | number
      selected: boolean
      map: mapboxgl.Map
      source: string
    }) => {
      map.setFeatureState(
        {
          source,
          sourceLayer: "data",
          id: id as string,
        },
        { selected }
      )
    },
    [type]
  )

  useEffect(() => {
    // This hook updates blockgroups map styles
    // depending on the target score
    // and only if the map is zoomed in enough
    if (!map || mapZoom < BLOCKGROUP_ZOOM) return
    const blockgroupsToHighlight = blockgroups.flatMap((bg) =>
      bg.tree_equity_score < targetScore ? bg.id : []
    )

    const blockgroupsIds = blockgroups.map((blockgroup: Blockgroup) => blockgroup.id)

    const dif = difference(blockgroupsIds, blockgroupsToHighlight)

    blockgroupsToHighlight.forEach((id: BlockgroupTableRowData["id"]) => {
      setFeatureSelectedState({
        map: map as mapboxgl.Map,
        id,
        source: "national_blockgroup",
        selected: true,
      })
    })

    dif.forEach((id) => {
      setFeatureSelectedState({
        map: map as mapboxgl.Map,
        id,
        source: "national_blockgroup",
        selected: false,
      })
    })
  }, [map, targetScore, blockgroups, mapZoom])

  useEffect(() => {
    // This hook updates municipalities map styles
    // depending on table data
    if (!map || !tableData) return
    const municipalities = Array.from(new Set(blockgroups.map((bg) => bg.municipality_slug)))
    const selectedMunicipalities = tableData.map(
      (feature: BlockgroupTableRowData | LocalityTableRowData) => {
        return type === BLOCKGROUP_PLANNING_TOOL_TYPE ? feature.municipality_slug : feature.id
      }
    )
    const municipalitiesDiff = difference(municipalities, selectedMunicipalities)
    municipalitiesDiff.forEach((id) => {
      setFeatureSelectedState({
        map: map as mapboxgl.Map,
        id: id as string,
        source: "national_municipality",
        selected: false,
      })
    })
    selectedMunicipalities.forEach((id) => {
      setFeatureSelectedState({
        map: map as mapboxgl.Map,
        id: id as string,
        source: "national_municipality",
        selected: true,
      })
    })
  }, [map, tableData])

  return (
    <div
      className="print:hidden sm:flex-auto w-11/12 m-auto h-[48vh] mapboxgl-map rounded-xl border-gray-300 border -mb-4 -mt-2"
      ref={mapDiv}
    />
  )
}
