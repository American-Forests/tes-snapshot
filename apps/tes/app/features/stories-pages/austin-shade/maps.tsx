import { useRef, useState, useCallback, useEffect } from "react"
import Map, {
  NavigationControl,
  Source,
  Layer,
  Popup,
  MapRef,
  MapLayerMouseEvent,
  ViewStateChangeEvent,
  LngLatLike,
} from "react-map-gl"
import { PopupInfo, PopupProperties } from "./austin-shade.types"
import { ViewportState } from "../shared/types"
import {
  viewportConfigs,
  flyToOptions,
  labelSources,
  createLabelLayout,
  labelPaint,
  blockgroupsSourceProps,
  mapCommonProps,
  privateSchoolsLayerProps,
  privateSchoolsSourceProps,
  publicSchoolsLayerProps,
  publicSchoolsSourceProps,
  route1SourceProps,
  route2SourceProps,
  sidewalksSourceProps,
  treeCanopyLayerProps,
  treesLayerProps,
  treesSourceProps,
} from "./austin-shade.config"
import { mapStyles } from "../shared/constants"
import { MapProps } from "../shared/types"
import PopupContent from "./popup-content"
import { LongTimeSlider, ShortTimeSlider } from "../shared/sliders"
import MapSwitch from "../shared/map-switch"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { FullLegend, ShadeLegend } from "./legends"
import { shadeFillSymbology, shadeLineSymbology } from "../shared/symbology"
import type { GeoJsonProperties, Geometry, Point } from "geojson"
import Geocoder from "../shared/geocoder"

const Maps: React.FC<MapProps> = ({ activeStep }) => {
  const mapRef = useRef<MapRef>(null)
  const [viewport, setViewport] = useState<ViewportState>(viewportConfigs.viewport1)
  const [showTreeCanopy, setShowTreeCanopy] = useState(false)
  const [treesLayerVisible, setTreesLayerVisible] = useState(true)
  const [schoolLayersVisible, setSchoolLayersVisible] = useState(true)
  const [timeColumn, setTimeColumn] = useState("_tot1200")
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null)
  const [hoveredFeature, setHoveredFeature] = useState<GeoJsonProperties | null>(null)
  const [hoveredGeometry, setHoveredGeometry] = useState<Geometry | null>(null)

  const getLayerVisibility = (layer: string): "visible" | "none" => {
    // Check if it's a school layer and if schools are toggled off
    if (
      (layer === "public-schools-layer" || layer === "private-schools-layer") &&
      !schoolLayersVisible
    ) {
      return "none"
    }

    // Then check step-based visibility
    switch (activeStep) {
      case "map":
        // Only show tree-canopy-layer or shade-layer in first map
        if (layer === "tree-canopy-layer") {
          return showTreeCanopy ? "visible" : "none"
        }
        if (layer === "shade-layer") {
          return showTreeCanopy ? "none" : "visible"
        }
        return layer === "public-schools-layer" || layer === "private-schools-layer"
          ? "visible"
          : "none"
      case "map2":
        return layer === "school-label-layer" ? "visible" : "none"
      case "map3":
        return layer === "route1-layer" ||
          layer === "route2-layer" ||
          layer === "route1-label-layer" ||
          layer === "route2-label-layer" ||
          layer === "school-label-layer" ||
          layer === "home-label-layer"
          ? "visible"
          : "none"
      case "map4":
        return layer === "public-schools-layer" ||
          layer === "private-schools-layer" ||
          layer === "trees-layer" ||
          layer === "sidewalks-layer"
          ? "visible"
          : "none"
      default:
        return "none"
    }
  }

  const getToolVisibility = (tool: string): "visible" | "invisible" => {
    switch (activeStep) {
      case "map":
        return tool === "popup" ||
          tool === "shortTimeSlider" ||
          tool === "switches" ||
          tool === "fullLegend"
          ? "visible"
          : "invisible"
      case "map2":
        return "invisible"
      case "map3":
        return tool === "popup" || tool === "longTimeSlider" || tool === "shadeLegend"
          ? "visible"
          : "invisible"
      case "map4":
        return tool === "popup" ||
          tool === "longTimeSlider" ||
          tool === "fullLegend" ||
          tool === "geocoder"
          ? "visible"
          : "invisible"
      default:
        return "invisible"
    }
  }

  const getCurrentViewport = (): ViewportState => {
    switch (activeStep) {
      case "map":
        return { ...viewportConfigs.viewport1, ...flyToOptions }
      case "map2":
        return { ...viewportConfigs.viewport2, ...flyToOptions }
      case "map3":
        return { ...viewportConfigs.viewport3, ...flyToOptions }
      case "map4":
        return { ...viewportConfigs.viewport1, ...flyToOptions }
      default:
        return { ...viewportConfigs.viewport1, ...flyToOptions }
    }
  }

  useEffect(() => {
    if (activeStep?.startsWith("map")) {
      const newViewport = getCurrentViewport()
      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [newViewport.longitude, newViewport.latitude],
          zoom: newViewport.zoom,
          pitch: newViewport.pitch,
          bearing: newViewport.bearing,
          duration: newViewport.duration,
          essential: newViewport.essential,
          curve: newViewport.curve,
          speed: newViewport.speed,
          easing: newViewport.easing,
        })
      }
      setViewport(newViewport)
    }
  }, [activeStep])

  const getMapStyle = (activeStep: string): string => {
    switch (activeStep) {
      case "map":
        return mapStyles.dark
      case "map2":
        return mapStyles.satellite
      case "map3":
        return mapStyles.dark
      case "map4":
        return mapStyles.dark
      default:
        return mapStyles.satellite
    }
  }

  // get geojson properties properly
  const parseProperties = (props: GeoJsonProperties): PopupProperties => {
    if (!props) return {} as PopupProperties

    return {
      _tot1200: typeof props.tot1200 === "number" ? props._tot1200 : undefined,
      _tot1600: typeof props.tot1600 === "number" ? props._tot1600 : undefined,
      _tot1800: typeof props.tot1800 === "number" ? props._tot1800 : undefined,
      tree_canop: typeof props.tree_canop === "number" ? props.tree_canop : undefined,
      cbg_pop: typeof props.cbg_pop === "number" ? props.cbg_pop : undefined,
      pctpov: typeof props.pctpov === "number" ? props.pctpov : undefined,
      pctpoc: typeof props.pctpoc === "number" ? props.pctpoc : undefined,
      _tot700: typeof props._tot700 === "number" ? props._tot700 : undefined,
      _tot900: typeof props._tot900 === "number" ? props._tot900 : undefined,
      _veg700: typeof props._veg700 === "number" ? props._veg700 : undefined,
      _veg900: typeof props._veg900 === "number" ? props._veg900 : undefined,
      _veg1200: typeof props._veg1200 === "number" ? props._veg1200 : undefined,
      _veg1600: typeof props._veg1600 === "number" ? props._veg1600 : undefined,
      _veg1800: typeof props._veg1800 === "number" ? props._veg1800 : undefined,
      _bld700: typeof props._bld700 === "number" ? props._bld700 : undefined,
      _bld900: typeof props._bld900 === "number" ? props._bld900 : undefined,
      _bld1200: typeof props._bld1200 === "number" ? props._bld1200 : undefined,
      _bld1600: typeof props._bld1600 === "number" ? props._bld1600 : undefined,
      _bld1800: typeof props._bld1800 === "number" ? props._bld1800 : undefined,
      NAME: typeof props.NAME === "string" ? props.NAME : undefined,
      STREET: typeof props.STREET === "string" ? props.STREET : undefined,
      // Copy over any additional numeric properties
      ...Object.entries(props).reduce((acc, [key, value]) => {
        if (typeof value === "number") {
          acc[key] = value
        }
        return acc
      }, {} as Record<string, number>),
    }
  }

  const handleHover = useCallback((e: MapLayerMouseEvent) => {
    if (e.features && e.features.length > 0) {
      const feature = e.features[0]
      setHoveredFeature(feature.properties)
      setHoveredGeometry(feature.geometry)

      setPopupInfo({
        longitude: e.lngLat.lng,
        latitude: e.lngLat.lat,
        properties: {
          ...parseProperties(feature.properties),
          layer: feature.layer.id,
        },
      })
    } else {
      setHoveredFeature(null)
      setHoveredGeometry(null)
      setPopupInfo(null)
    }
  }, [])

  const handleClick = useCallback((event: MapLayerMouseEvent) => {
    const feature = event?.features?.[0];
    if (feature?.layer?.id === "public-schools-layer" || feature?.layer?.id === "private-schools-layer" && activeStep === "map4") {
      const pointFeature = feature.geometry as Point
      mapRef.current?.flyTo({
        center: pointFeature.coordinates as [number, number],
        zoom: 15,
        speed: 2,
    })
    }
  }, [activeStep]);

  if (!activeStep?.startsWith("map")) return null
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[5] max-w-[100vw] overflow-x-hidden h-full">
      {/* overriding the default white popup background */}
      <style jsx global>{`
        .mapboxgl-popup-content {
          background-color: transparent !important;
          padding: 0 !important;
          box-shadow: none !important;
        }

        .mapboxgl-popup-tip {
          display: none;
        }

        .mapboxgl-popup {
          z-index: 9999 !important;
        }
      `}</style>
      {/* sliders and switches*/}
      <div className="z-10 text-white font-bold capitalize">
        {!showTreeCanopy && ( // not visible when tree canopy is main layer
          <div
            className={`${getToolVisibility(
              "shortTimeSlider"
            )} absolute bottom-16 flex items-center justify-center left-[50vw] transform -translate-x-1/2 bg-[#171717]/80 pt-2 pb-0 px-10 rounded`}
          >
            <ShortTimeSlider
              setTimeColumn={(time) => {
                setTimeColumn(time)
              }}
            />
          </div>
        )}
        <div
          className={`${getToolVisibility(
            "longTimeSlider"
          )} absolute bottom-4 md:bottom-10 flex items-center justify-center  left-[50vw] transform -translate-x-1/2 bg-[#171717]/80 pt-2 pb-0 px-10 rounded`}
        >
          <LongTimeSlider
            setTimeColumn={(time) => {
              setTimeColumn(time)
            }}
          />
        </div>
        <div
          className={`${getToolVisibility(
            "switches"
          )} absolute bottom-6 flex items-center justify-center w-full`}
        >
          <FormControlLabel
            control={
              <MapSwitch
                checked={schoolLayersVisible}
                onChange={() => setSchoolLayersVisible(!schoolLayersVisible)}
                aria-label="Schools"
              />
            }
            label="Schools"
          />
          <span className="pr-6" />
          <FormControlLabel
            control={
              <MapSwitch
                checked={showTreeCanopy}
                onChange={() => setShowTreeCanopy(!showTreeCanopy)}
                aria-label="Tree Canopy"
              />
            }
            label="Tree Canopy"
          />
        </div>
        <div
          className={`${getToolVisibility(
            "switch2"
          )} absolute bottom-6 flex items-center justify-center w-full`}
        >
          <FormControlLabel
            control={
              <MapSwitch
                checked={treesLayerVisible}
                onChange={() => setTreesLayerVisible(!treesLayerVisible)}
                aria-label="Tree Canopy"
              />
            }
            label="Tree Canopy"
          />
        </div>
      </div>
      <div className={`${getToolVisibility("fullLegend")}`}>
        <FullLegend />
      </div>
      <div className={`${getToolVisibility("shadeLegend")}`}>
        <ShadeLegend />
      </div>
      <Map
        {...mapCommonProps}
        {...viewport}
        minZoom={activeStep === "map3" ? 14 : undefined} // set minZoom for map3
        onMove={(evt: ViewStateChangeEvent) => setViewport(evt.viewState)}
        ref={mapRef}
        mapStyle={getMapStyle(activeStep)}
        onMouseMove={handleHover}
        onMouseLeave={() => {
          setHoveredFeature(null)
          setPopupInfo(null)
        }}
        onClick={handleClick}
      >
        <Source {...blockgroupsSourceProps}>
          <Layer
            layout={{
              visibility: getLayerVisibility("tree-canopy-layer"),
            }}
            {...treeCanopyLayerProps}
          />
          <Layer
            id="shade-layer"
            type="fill"
            source="austin-blockgroups"
            source-layer="aus_bg-d7t0py"
            layout={{
              visibility: getLayerVisibility("shade-layer"),
            }}
            paint={shadeFillSymbology(timeColumn)}
          />
        </Source>
        <Source {...publicSchoolsSourceProps}>
          <Layer
            layout={{
              visibility: getLayerVisibility("public-schools-layer"),
            }}
            {...publicSchoolsLayerProps}
          />
        </Source>
        <Source {...privateSchoolsSourceProps}>
          <Layer
            layout={{
              visibility: getLayerVisibility("private-schools-layer"),
            }}
            {...privateSchoolsLayerProps}
          />
        </Source>
        <Source {...route1SourceProps}>
          <Layer
            id="route1-layer"
            type="line"
            source="route1"
            source-layer="kealing_route_1-1tal0z"
            layout={{
              visibility: getLayerVisibility("route1-layer"),
            }}
            paint={shadeLineSymbology(timeColumn, hoveredFeature)}
          />
        </Source>
        {/* Route 1 Label */}
        <Source id="route1-label" type="geojson" data={labelSources.route1Label}>
          <Layer
            id="route1-label-layer"
            type="symbol"
            layout={createLabelLayout(getLayerVisibility("route1-label-layer"))}
            paint={labelPaint}
          />
        </Source>
        <Source {...route2SourceProps}>
          <Layer
            id="route2-layer"
            type="line"
            source="route2"
            source-layer="kealing_route_2-afap9p"
            layout={{
              visibility: getLayerVisibility("route2-layer"),
            }}
            paint={shadeLineSymbology(timeColumn, hoveredFeature)}
          />
        </Source>
        <Source {...treesSourceProps}>
          <Layer
            layout={{
              visibility: getLayerVisibility("trees-layer"),
            }}
            {...treesLayerProps}
          />
        </Source>
        {/* Route 2 Label */}
        <Source id="route2-label" type="geojson" data={labelSources.route2Label}>
          <Layer
            id="route2-label-layer"
            type="symbol"
            layout={createLabelLayout(getLayerVisibility("route2-label-layer"))}
            paint={labelPaint}
          />
        </Source>
        {/* School Label */}
        <Source id="school-label" type="geojson" data={labelSources.schoolLabel}>
          <Layer
            id="school-label-layer"
            type="symbol"
            layout={createLabelLayout(getLayerVisibility("school-label-layer"))}
            paint={labelPaint}
          />
        </Source>
        {/* Home Label */}
        <Source id="home-label" type="geojson" data={labelSources.homeLabel}>
          <Layer
            id="home-label-layer"
            type="symbol"
            layout={createLabelLayout(getLayerVisibility("home-label-layer"))}
            paint={labelPaint}
          />
        </Source>
        {hoveredGeometry && (
          <Source
            type="geojson"
            data={{
              type: "Feature",
              geometry: hoveredGeometry,
              properties: {},
            }}
          >
            {hoveredFeature?.NAME && (
              <Layer
                id="school-highlight-layer"
                type="circle"
                paint={{
                  "circle-radius": 4,
                  "circle-color": "transparent",
                  "circle-stroke-color": "#FFFFFF",
                  "circle-stroke-width": 3,
                  "circle-opacity": 1,
                }}
              />
            )}
            {hoveredFeature?.GEOID && (
              <Layer
                id="blockgroup-highlight-layer"
                type="line"
                paint={{
                  "line-color": "#FFFFFF",
                  "line-width": 2,
                  "line-opacity": 1,
                }}
              />
            )}
          </Source>
        )}
        <Source {...sidewalksSourceProps}>
          <Layer
            id="sidewalks-layer"
            type="fill"
            source="sidewalks"
            source-layer="data"
            maxzoom={20}
            layout={{
              visibility: getLayerVisibility("sidewalks-layer"),
            }}
            paint={{
              "fill-opacity": 1,
              "fill-color": [
                "interpolate",
                ["linear"],
                ["get", timeColumn],
                0,
                "#FFEB94",
                16.6,
                "#C2CAD4",
                33.3,
                "#8B929E",
                50,
                "#47505F",
                100,
                "#47505F",
              ],
            }}
          />
        </Source>
        <div className={`${getToolVisibility("geocoder")}`}>
          <Geocoder
            viewport={viewport}
            setViewport={setViewport}
            bbox={[-97.938, 30.098, -97.561, 30.516]}
            proximity={[-97.743, 30.266] as LngLatLike}
            placeholder="search for an address or school"
          />
        </div>
        <NavigationControl position="bottom-right" />
        <div className={`${getToolVisibility("popup")}`}>
          {popupInfo && (
            <Popup
              longitude={popupInfo.longitude}
              latitude={popupInfo.latitude}
              onClose={() => setPopupInfo(null)}
              closeButton={false}
              anchor={(() => {
                const isBottom = popupInfo.latitude < viewport.latitude
                const isRight = popupInfo.longitude > viewport.longitude

                // Combine vertical and horizontal positions
                if (isBottom && isRight) return "bottom-right"
                if (isBottom && !isRight) return "bottom-left"
                if (!isBottom && isRight) return "top-right"
                return "top-left"
              })()}
              offset={10}
            >
              <PopupContent
                properties={popupInfo.properties}
                activeStep={activeStep}
                timeColumn={timeColumn}
              />
            </Popup>
          )}
        </div>
      </Map>
    </div>
  )
}

export default Maps
