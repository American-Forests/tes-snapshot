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
import { PopupInfo, PopupProperties } from "./phoenix-shade.types"
import { shadeFillSymbology } from "../shared/symbology"
import { MAPBOX_TOKEN, mapStyles } from "../shared/constants"
import { MapProps } from "../shared/types"
import PopupContent from "./popup-content"
import { ShortTimeSlider } from "../shared/sliders"
import Legend from "./legend"
import type { GeoJsonProperties, Geometry } from "geojson"
import Geocoder from "../shared/geocoder"

const Maps: React.FC<MapProps> = ({ activeStep }) => {
  const [timeColumn, setTimeColumn] = useState("_tot1200")
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null)
  const [hoveredFeature, setHoveredFeature] = useState<GeoJsonProperties | null>(null)
  const [hoveredGeometry, setHoveredGeometry] = useState<Geometry | null>(null)
  const [viewport, setViewport] = useState({
    longitude: -112.0892,
    latitude: 33.4743,
    zoom: 12,
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
      PROPERTY_N: typeof props.PROPERTY_N === "string" ? props.PROPERTY_N : undefined,
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
        interactiveLayerIds={["parks-layer"]}
      >
        <Source
          id="phx_parks-4vjaw3"
          type="vector"
          url="mapbox://grosenberg-af.7uswfqbk"
        >
          <Layer
            id="parks-layer"
            type="fill"
            source="phx_parks-4vjaw3"
            source-layer= "phx_parks-4vjaw3"
            paint={shadeFillSymbology(timeColumn)}
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
            {hoveredFeature?.PROPERTY_N && (
              <Layer
                id="parks-highlight-layer"
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
            bbox={[-112.321, 33.290, -111.926, 33.515]}
            proximity={[-112.074, 33.448] as LngLatLike}
            placeholder="search for an address or park"
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
              setTimeColumn(time)
            }} 
          />
        </div>
      </div>
      <Legend />
    </div>
  )
}

export default Maps