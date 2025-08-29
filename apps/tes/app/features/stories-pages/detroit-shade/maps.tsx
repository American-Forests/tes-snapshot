import { useState, useCallback } from "react"
import Map, { 
  NavigationControl, 
  Source, 
  Layer, 
  Popup,
  MapLayerMouseEvent, 
  ViewStateChangeEvent,
  LngLatLike
} from "react-map-gl"
import { PopupInfo, PopupProperties } from "./detroit-shade.types"
import { busStopSymbology,detroitShadeSymbology } from "../shared/symbology"
import { MAPBOX_TOKEN, mapStyles } from "../shared/constants"
import PopupContent from "./popup-content"
import { ShortTimeSlider } from "../shared/sliders"
import type { GeoJsonProperties, Geometry } from "geojson"
import { MapProps } from "../shared/types"
import Legend from "./legend"
import Geocoder from "../shared/geocoder"

const Maps: React.FC<MapProps> = ({ activeStep }) => {
  const [timeColumn, setTimeColumn] = useState("_tot1200")
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null)
  const [hoveredFeature, setHoveredFeature] = useState<GeoJsonProperties | null>(null)
  const [hoveredGeometry, setHoveredGeometry] = useState<Geometry | null>(null)

  const [viewport, setViewport] = useState({
    longitude: -83.0922,
    latitude: 42.3650,
    zoom: 11,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 }
  })

  // get geojson properties properly
  const parseProperties = (props: GeoJsonProperties): PopupProperties => {
    if (!props) return {} as PopupProperties

    return {
      _tot1200: typeof props.tot1200 === "number" ? props._tot1200 : undefined,
      _tot1500: typeof props.tot1600 === "number" ? props._tot1500 : undefined,
      _tot1800: typeof props.tot1800 === "number" ? props._tot1800 : undefined,
      _veg1200: typeof props._veg1200 === "number" ? props._veg1200 : undefined,
      _veg1500: typeof props._veg1600 === "number" ? props._veg1500 : undefined,
      _veg1800: typeof props._veg1800 === "number" ? props._veg1800 : undefined,
      _bld1200: typeof props._bld1200 === "number" ? props._bld1200 : undefined,
      _bld1500: typeof props._bld1600 === "number" ? props._bld1500 : undefined,
      _bld1800: typeof props._bld1800 === "number" ? props._bld1800 : undefined,
      ROUTE_NAME: typeof props.ROUTE_NAME === "string" ? props.ROUTE_NAME : undefined,
      DIRECTION: typeof props.DIRECTION === "string" ? props.DIRECTION : undefined,
      Route_Name: typeof props.Route_Name === "string" ? props.Route_Name : undefined,
      Route_Numb: typeof props.Route_Numb === "string" ? props.Route_Numb : undefined,
      Descriptio: typeof props.Descriptio === "string" ? props.Descriptio : undefined,
      Shelter: typeof props.Shelter === "number" ? props.Shelter : undefined,
      WEEKDAY_PE: typeof props.WEEKDAY_PE === "number" ? props.WEEKDAY_PE : undefined,
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
      });
    } else {
      setHoveredFeature(null)
      setHoveredGeometry(null)
      setPopupInfo(null)
    }
  }, []);

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
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        {...viewport}
        mapStyle={mapStyles.dark}
        scrollZoom={false}
        onMouseMove={handleHover}
        onMouseLeave={() => {
          setHoveredFeature(null);
          setPopupInfo(null);
        }}
        onMove={(evt: ViewStateChangeEvent) => setViewport(evt.viewState)}
        interactiveLayerIds={["blockgroups-layer", "bus-routes-layer", "bus-stops-layer"]}
      >
        <Source
          id="detroit_blockgroups-2yzeas"
          type="vector"
          url="mapbox://grosenberg-af.bjrt0med"
        >
          <Layer
            id="blockgroups-layer"
            type="fill"
            source="detroit_blockgroups-2yzeas"
            source-layer= "detroit_blockgroups-2yzeas"
            paint={detroitShadeSymbology(timeColumn)}
            maxzoom={11.95}
          />
        </Source>
        <Source
          id="bus_routes-38mbzg"
          type="vector"
          url="mapbox://grosenberg-af.cd8wdmyx"
        >
          <Layer
            id="bus-routes-layer"
            type="line"
            source="bus_routes-38mbzg"
            source-layer="bus_routes-38mbzg"
            paint={{
              'line-color': [
                'case',
                ['==', 
                    ['get', 'ROUTE_NAME'],
                    hoveredFeature?.ROUTE_NAME || ''
                ],
                "#FFBC2B",  // Width when hovered
                "#FFFFFF"   // Default width
              ],
              'line-width': [
                'interpolate',
                ['linear'],
                ['get', 'WEEKDAY_PE'],
                15, 1.8,
                21, 1.2,
                31, 0.7,
                60, 0.7
              ]
            }}
          />
        </Source>
        <Source
          id="det_bus_stops_shp-5uhxvr"
          type="vector"
          url="mapbox://grosenberg-af.a0o1os0l"
        >
          <Layer
            id="bus-stops-layer"
            type="circle"
            source="det_bus_stops_shp-5uhxvr"
            source-layer="det_bus_stops_shp-5uhxvr"
            paint={busStopSymbology(timeColumn, hoveredFeature)}
            minzoom={12}
          />
        </Source>
        {hoveredGeometry && (
          <Source
            type="geojson"
            data={{
              type: 'Feature',
              geometry: hoveredGeometry,
              properties: {}
            }}
          >
            {hoveredFeature?.geoid && (
              <Layer
                id="blockgroup-highlight-layer"
                type="line"
                paint={{
                  'line-color': '#FFFFFF',
                  'line-width': 2,
                  'line-opacity': 1
                }}
              />
              )}
          </Source>
        )}
        <div className="z-30">
          <Geocoder
            viewport={viewport}
            setViewport={setViewport}
            bbox={[-83.287, 42.255, -82.910, 42.450]}
            proximity={[-83.0922, 42.3650] as LngLatLike}
            placeholder="search for an address"
          />
          <NavigationControl position="bottom-right"/>
        </div>
        {popupInfo && (
          <Popup
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            onClose={() => setPopupInfo(null)}
            closeButton={false}
            anchor={(() => {
              const isBottom = popupInfo.latitude < viewport.latitude;
              const isRight = popupInfo.longitude > viewport.longitude;
              
              // Combine vertical and horizontal positions
              if (isBottom && isRight) return 'bottom-right';
              if (isBottom && !isRight) return 'bottom-left';
              if (!isBottom && isRight) return 'top-right';
              return 'top-left';
            })()}
            offset={10}
          >
            <PopupContent 
              properties={popupInfo.properties}
              timeColumn={timeColumn}
            />
          </Popup>
        )}
      </Map>
      <div className="absolute bottom-4 md:bottom-10 left-0 right-0 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto bg-[#171717]/80 pt-2 pb-0 px-10 rounded">
          <ShortTimeSlider 
            setTimeColumn={(time) => {
              setTimeColumn(time);
            }} 
          />
        </div>
      </div>
      <Legend areBusStopsVisible={viewport.zoom >=12} />
    </div>
  )
}

export default Maps