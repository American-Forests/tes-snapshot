import mapboxgl, { MapLayerMouseEvent } from "mapbox-gl"
import { useEffect, useRef, useState } from "react"
import { useQuery } from "@blitzjs/rpc"
import {
  LevelName,
  DATA_LAYERS,
  AGGREGATED_MUNICIPALITY_LEVEL_NAME,
  BLOCKGROUP_LAYER_NAME,
  PARCEL_LAYER_NAME,
  RIGHT_OF_WAY_LAYER_NAME,
} from "app/constants"
import { numberToZoom, setInitialZoom } from "app/utils/map_utils"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { toast } from "react-hot-toast"
import { Area } from "db"
import { GetScenario } from "app/scenarios/queries/getScenario"
import { selectedFeatureAtom, hoveredFeatureAtom, facetsAtom } from "app/state"
import { useAtom, useAtomValue } from "jotai"
import type { City } from "app/features/regional-map/regional-map.types"
import PrintMapControl from "lib/print_map_control"
import useBaseMap from "./use_base_map"
import { Facet } from "data/facets"
import { usePrintableMap } from "./use_printable_map"
import getMunicipalitySlugsFromCity from "app/municipalities/queries/getMunicipalitySlugsFromCity"

export const ACCESS_TOKEN =
  "pk.eyJ1IjoidGVzYS1hcHAiLCJhIjoiY2trYml0ZWxyMGNkeTJ4cXF1dW01NnRtNSJ9.VAxuU7nwx-Fx3QlsKHw18w"

mapboxgl.accessToken = ACCESS_TOKEN

const clickableLayers = [BLOCKGROUP_LAYER_NAME, PARCEL_LAYER_NAME, RIGHT_OF_WAY_LAYER_NAME]

export interface MapOptions {
  rememberPosition?: boolean
  hash?: boolean
  zoomControl?: boolean
  extent: [number, number, number, number]
  slugFilter?: string
}

export function clearMapPositionSessionStorage() {
  sessionStorage.removeItem("extent")
  sessionStorage.removeItem("location")
}

export function useMap(params: {
  mapDiv: React.MutableRefObject<HTMLDivElement | null>
  scenario: GetScenario | undefined
  options: MapOptions
  facetsLoaded: boolean
  city: City
  addMapLayers: ({
    map,
    facets,
    isSatellite,
    cityId,
    treesTilesetId,
    municipalitySlugs,
  }: {
    map: mapboxgl.Map
    isSatellite: boolean
    facets: Facet[]
    cityId: string
    treesTilesetId?: string
    municipalitySlugs?: string[]
  }) => void
}) {
  const { mapDiv, scenario, options, facetsLoaded, city, addMapLayers } = params
  const { scenarioId } = useRouter().query
  const router = useRouter()
  const [selectedFeature, setSelectedFeature] = useAtom(selectedFeatureAtom)
  const [hoveredFeature, setHoveredFeature] = useAtom(hoveredFeatureAtom)
  
  // Persist some values between re-render that UI does not depend on using useRef
  const hoveredFeatureRef = useRef<mapboxgl.MapboxGeoJSONFeature | null>(null)
  const mapReadyRef = useRef<boolean>(false)
  const toastIdRef = useRef<string | null>(null);
  
  const [map, setMap] = useState<mapboxgl.Map | null>(null)
  const { baseMapStyle, setBaseMapStyle, baseMapStyleIsLoaded, setBaseMapStyleIsLoaded } =
    useBaseMap(map, facetsLoaded, city, addMapLayers)
  const [level, setLevel] = useState<LevelName>(AGGREGATED_MUNICIPALITY_LEVEL_NAME)
  const facets = useAtomValue(facetsAtom)
  const startPDFUpdateProcess = usePrintableMap(map, city.title)
  const [municipalitySlugs] = useQuery(getMunicipalitySlugsFromCity, { city: city.id })

  useEffect(() => {
    if (!(mapDiv.current && !map)) return
    if (!facetsLoaded) return

    let { extent } = options

    try {
      if (options.rememberPosition && sessionStorage.extent && sessionStorage.location) {
        if (city.id === sessionStorage.location) extent = JSON.parse(sessionStorage.extent)
      }
    } catch (e) {}

    if (!mapReadyRef.current) {
      mapReadyRef.current = true
      const newMap = new mapboxgl.Map({
        container: mapDiv.current,
        style: baseMapStyle,
        dragRotate: false,
        maxPitch: 0,
        bounds: extent,
        preserveDrawingBuffer: true,
        hash: options.hash,
      })
      setLevel(numberToZoom(newMap.getZoom(), city.id === "national"))

      if (options.zoomControl) {
        newMap.addControl(new mapboxgl.NavigationControl(), "top-left")
      }

      if (startPDFUpdateProcess) {
      newMap.addControl(new PrintMapControl(startPDFUpdateProcess), "top-left")
      }

      newMap.on("zoomend", () => setLevel(numberToZoom(newMap.getZoom(), city.id === "national")))

      newMap.once("load", () => {
        setBaseMapStyleIsLoaded(true)
        addMapLayers({
          map: newMap,
          isSatellite: false,
          facets,
          cityId: city.id,
          treesTilesetId: city.treesTilesetId,
          municipalitySlugs: city.id !== "national" && city.id != "toronto" ? municipalitySlugs : undefined,
        })

        newMap.getCanvas().style.cursor = "default"
        newMap.resize()

        if (options.slugFilter) {
          // TODO: check if this filter does anything
          newMap.setFilter("blocks", ["==", ["get", "slug"], options.slugFilter])
          setInitialZoom(newMap)
        }

        setMap(newMap)
      })
    }
  }, [map, mapDiv, options, facetsLoaded])

  /**
   * reset the selected feature when the level changes. if this doesn't happen, the sidebar wouldn't show anything if the
   * user clicked on a parcel/row and then zoomed back out to the block group layer and was hovering around
   */
  useEffect(() => {
    setSelectedFeature(null)
  }, [level])

  useEffect(() => {
    if (!map) return
    if (scenario) toast.dismiss()
    const onClick = (e: MapLayerMouseEvent) => {
      if (!e.features || e.features?.length === 0) return
      const feature = e.features[0]
      /**
       * If the user clicks on the same feature, deselect it.
       * Otherwise, select the feature.
       */
      if (feature.id === selectedFeature?.id) {
        setSelectedFeature(null)
      } else {
        setSelectedFeature(feature)
      }

      if (!scenario && !toastIdRef.current) {
        const thisToastId = toast("Create a scenario to add items.")        
        toastIdRef.current = thisToastId
        setTimeout(() => {
          toast.dismiss();
          toastIdRef.current = null;
        }, 5000); // Delay before closing (optional)
      }

      if (scenario) {
        if (feature.layer.id === "blockgroup") {
          router.push(
            Routes.Map({ scenarioId, blockgroupId: feature.properties?.id, city: city.id }),
          )
        } else {
          const properties = feature.properties as Area
          router.push(Routes.Map({ scenarioId, areaId: properties.id, city: city.id }))
        }
      }
    }

    const onMouseMove = (e: MapLayerMouseEvent) => {
      if (!e.features || e.features?.length === 0) return
      map.getCanvas().style.cursor = "pointer"
      const feature = e.features[0]

      // reset previously hovered feature
      if (hoveredFeatureRef.current) {
        map.setFeatureState(
          {
            source: hoveredFeatureRef.current.layer["source"] as string,
            sourceLayer: hoveredFeatureRef.current.layer["source-layer"],
            id: hoveredFeatureRef.current.id,
          },
          { hover: false },
        )
      }

      // set hover feature state on currently hovered feature
      map.setFeatureState(
        {
          source: feature.layer["source"] as string,
          sourceLayer: feature.layer["source-layer"],
          id: feature.id,
        },
        {
          hover: true,
        },
      )
      // We just need to update the state when hovering over a different feature
      if (!hoveredFeatureRef.current || hoveredFeatureRef.current.id != feature.id) {
        hoveredFeatureRef.current = feature
        setHoveredFeature(feature)
      }
    }

    const onMouseOut = () => {}

    const onMouseLeave = () => {
      map.getCanvas().style.cursor = "default"
      if (hoveredFeatureRef.current) {
        map.setFeatureState(
          {
            source: hoveredFeatureRef.current.layer["source"] as string,
            sourceLayer: hoveredFeatureRef.current.layer["source-layer"],
            id: hoveredFeatureRef.current.id,
          },
          { hover: false },
        )
        setHoveredFeature(null)
        hoveredFeatureRef.current = null
      }
    }

    map.on("click", [BLOCKGROUP_LAYER_NAME, PARCEL_LAYER_NAME, RIGHT_OF_WAY_LAYER_NAME], onClick)
    map.on("mousemove", DATA_LAYERS, onMouseMove)
    map.on("mouseout", DATA_LAYERS, onMouseOut)
    map.on("mouseleave", DATA_LAYERS, onMouseLeave)

    const onMoveEnd = () => {
      sessionStorage.setItem("extent", JSON.stringify(map.getBounds().toArray()))
      sessionStorage.setItem("location", city.id)
    }
    map.on("moveend", onMoveEnd)

    return () => {
      DATA_LAYERS.forEach((layer) => {
        map.off("mousemove", layer, onMouseMove)
        map.off("mouseout", layer, onMouseOut)
        map.off("mouseleave", layer, onMouseLeave)
      })

      clickableLayers.forEach((layer) => map.off("click", layer, onClick))

      map.off("mouseend", onMoveEnd)
    }
  }, [
    map,
    router,
    scenario,
    selectedFeature,
    city.id,
    setSelectedFeature,
    setHoveredFeature,
    scenarioId,
  ])

  return {
    map,
    currentLevel: level,
    hoveredFeature,
    selectedFeature,
    setSelectedFeature,
    baseMapStyle,
    setBaseMapStyle,
    baseMapStyleIsLoaded,
  }
}
