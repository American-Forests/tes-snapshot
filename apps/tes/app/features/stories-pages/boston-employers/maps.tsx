import { useState, useCallback } from "react"
import Map, {
  NavigationControl,
  Source,
  Layer,
  Popup,
  MapLayerMouseEvent,
  ViewStateChangeEvent
} from "react-map-gl"
import { PopupInfo, PopupProperties } from "./boston-employers.types"
import { TESFillSymbology, DemographicFillSymbology, MunipsOutlineSymbology, MunipsLabelSymbology, EmployerSymbology, busSymbology, railSymbology, transitStopSymbology } from "./symbology"
import { MAPBOX_TOKEN, mapStyles } from "../shared/constants"
import PopupContent from "./popup-content"
import type { GeoJsonProperties, Geometry } from "geojson"
import { MapProps } from "../shared/types"
import { FormControlLabel } from "@material-ui/core"
import MapSwitch from "../shared/map-switch"
import Legend from "./legend"
import { commuteCompanies } from "./commute-companies"

const Maps: React.FC<MapProps> = () => {
  const [demoColumn, setDemoColumn] = useState("pctpov")
  const [showTESLayer, setShowTESLayer] = useState(true)
  const [showNearTransit, setShowNearTransit] = useState(false)
  const [show30MinDrive, setShow30MinDrive] = useState(false)
  const [showTransitLayer, setShowTransitLayer] = useState(false)
  const [tesFilter, setTesFilter] = useState(100)
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null)
  const [hoveredFeature, setHoveredFeature] = useState<GeoJsonProperties | null>(null)
  const [hoveredGeometry, setHoveredGeometry] = useState<Geometry | null>(null)
  const [viewport, setViewport] = useState({
    longitude: -71.0565,
    latitude: 42.3555,
    zoom: 9,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 }
  })

  const getLayerVisibility = (layer: string): "visible" | "none" => {
    if (layer === "tes-blockgroups-layer") {
      return showTESLayer ? "visible" : "none"
    }
    if (layer === "employers-no-transit-layer") {
      return showNearTransit ? "none" : "visible"
    }
    return "none"
  }

  const employerFilter = [
    "all",
    ...(show30MinDrive
      ? [["in", ["get", "company"], ["literal", commuteCompanies]]]
      : []), // no filter
    ["<=", ["get", "tes"], tesFilter]
  ]

  // get geojson properties properly
  const parseProperties = (props: GeoJsonProperties): PopupProperties => {
    if (!props) return {} as PopupProperties

    return {
      address: typeof props.address === "string"? props.address : undefined,
      company: typeof props.company === "string"? props.company : undefined,
      cov_area: typeof props.cov_area === "string"? props.cov_area : undefined,
      website: typeof props.website === "string"? props.website : undefined,
      job_title: typeof props.job_title === "string"? props.job_title : undefined,
      job_posts: typeof props.job_posts === "number" ? props.job_posts : undefined,
      location: typeof props.location === "string" ? props.location : undefined,
      pctpoc: typeof props.pctpoc === "number" ? props.pctpoc : undefined,
      pctpov: typeof props.pctpov === "number" ? props.pctpov : undefined,
      unemplrate: typeof props.unemplrate === "number" ? props.unemplrate : undefined,
      place: typeof props.place === "string" ? props.place : undefined,
      tes: typeof props.tes === "number" ? props.tes : undefined,
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
    // Find the first feature from either employer layer
    const feature = e.features.find(
      f => f.layer.id === "employers-transit-layer" || f.layer.id === "employers-no-transit-layer"
    );
    if (feature) {
      setHoveredFeature(feature.properties);
      setHoveredGeometry(feature.geometry);
      setPopupInfo({
        longitude: e.lngLat.lng,
        latitude: e.lngLat.lat,
        properties: {
          ...parseProperties(feature.properties),
          layer: feature.layer.id,
        },
      });
      return;
    }
  }
  setHoveredFeature(null);
  setHoveredGeometry(null);
  setPopupInfo(null);
}, []);

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
        mapStyle={mapStyles.light}
        // scrollZoom={false}
        onMouseMove={handleHover}
        onMouseLeave={() => {
          setHoveredFeature(null);
          setPopupInfo(null);
        }}
        onMove={(evt: ViewStateChangeEvent) => setViewport(evt.viewState)}
        interactiveLayerIds={["employers-transit-layer", "employers-no-transit-layer"]}
      >
        <Source
          id="ma_shp-63bee0"
          type="vector"
          url="mapbox://grosenberg-af.2w3med09"
        >
          <Layer
            id="demographic-blockgroups-layer"
            type="fill"
            source="ma_shp-63bee0"
            source-layer= "ma_shp-63bee0"
            paint={DemographicFillSymbology(demoColumn)}
            beforeId="bus-lines-layer"
            layout={{
              visibility: !showTESLayer ? "visible" : "none"
            }}
            filter={["!=", ["get", "GEOID"], "250259803001"]}
          />
          <Layer
            id="tes-blockgroups-layer"
            type="fill"
            source="ma_shp-63bee0"
            source-layer= "ma_shp-63bee0"
            paint={TESFillSymbology}
            beforeId="bus-lines-layer"
            layout={{
              visibility: showTESLayer ? "visible" : "none"
            }}
            filter={["!=", ["get", "GEOID"], "250259803001"]}
          />
        </Source>
        <Source
          id="munips-4slrdu"
          type="vector"
          url="mapbox://grosenberg-af.aro55mht"
        >
          <Layer
            id="munips-layer"
            type="line"
            source="munips-4slrdu"
            source-layer= "munips-4slrdu"
            paint={MunipsOutlineSymbology}
            beforeId="bus-lines-layer"
          />
          <Layer
            id="munips-label-layer"
            type="symbol"
            source="munips-4slrdu"
            source-layer= "munips-4slrdu"
            paint={MunipsLabelSymbology.paint}
            beforeId="bus-lines-layer"
            layout={MunipsLabelSymbology.layout}
          />
        </Source>
        <Source
          id="mbtabuslines-axcatz"
          type="vector"
          url="mapbox://grosenberg-af.1wtkgia1"
        >
          <Layer
            id="bus-lines-layer"
            type="line"
            source="mbtabuslines-axcatz"
            source-layer= "mbtabuslines-axcatz"
            paint={busSymbology}
            minzoom={9}
            layout={{
              visibility: showTransitLayer ? "visible" : "none"
            }}
          />
        </Source>
        <Source
          id="mbta_rapid_transit-cfstvi"
          type="vector"
          url="mapbox://grosenberg-af.4v02ecri"
        >
          <Layer
            id="rail-layer"
            type="line"
            source="mbta_rapid_transit-cfstvi"
            source-layer= "mbta_rapid_transit-cfstvi"
            paint={railSymbology}
            minzoom={9}
            layout={{
              visibility: showTransitLayer ? "visible" : "none"
            }}
          />
        </Source>
        <Source
          id="mbtabuslines-axcatz"
          type="vector"
          url="mapbox://grosenberg-af.1wtkgia1"
        >
          <Layer
            id="rail-station-layer"
            type="circle"
            source="mbtabuslines-axcatz"
            source-layer= "mbtabuslines-axcatz"
            paint={transitStopSymbology}
            minzoom={13}
            layout={{
              visibility: showTransitLayer ? "visible" : "none"
            }}
          />
        </Source>
        <Source
          id="transit-bmy9k5"
          type="vector"
          url="mapbox://grosenberg-af.9ipgtmoz"
        >
          <Layer
            id="employers-transit-layer"
            type="circle"
            source="transit-bmy9k5"
            source-layer= "transit-bmy9k5"
            paint={EmployerSymbology(hoveredFeature)}
            minzoom={9}
            filter={employerFilter}
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
          </Source>
        )}
        <Source
          id="no-transit-d6cj2h"
          type="vector"
          url="mapbox://grosenberg-af.asyw1fnf"
        >
          <Layer
            id="employers-no-transit-layer"
            type="circle"
            source="no-transit-d6cj2h"
            source-layer= "no-transit-d6cj2h"
            layout={{
              visibility: getLayerVisibility("employers-no-transit-layer")
            }}
            paint={EmployerSymbology(hoveredFeature)}
            minzoom={9}
            filter={employerFilter}
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
          </Source>
        )}
        <div className="z-30">
          <NavigationControl position="bottom-right"/>
        </div>
        <div className="absolute top-6 flex items-center justify-center w-full font-bold text-4xl">
          <div className="bg-white/75 rounded p-4 text-[#171717]">
            Boston Green Industry Employers
          </div>
        </div>
        <div className="absolute bottom-6 flex items-center justify-center w-full text-[#171717]">
          <div className="bg-white/75 pl-4 rounded flex items-center space-x-4 min-h-[95px]">
            <div>
              <FormControlLabel
                control={
                  <MapSwitch
                    checked={showNearTransit}
                    onChange={() => setShowNearTransit(!showNearTransit)}
                    aria-label="Within 1/4-mile of transit only"
                  />
                }
                label={<span>Within 1/4-mile<br />of transit only</span>}
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <MapSwitch
                    checked={show30MinDrive}
                    onChange={() => setShow30MinDrive(!show30MinDrive)}
                    aria-label="Within 30 min. drive of Boston City Hall only"
                  />
                }
                label={<span>Within 30 min. drive of<br />Boston City Hall only</span>}
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <MapSwitch
                    checked={showTransitLayer}
                    onChange={() => setShowTransitLayer(!showTransitLayer)}
                    aria-label="MBTA Transit"
                  />
                }
                label="MBTA Transit"
              />
            </div>
            <div className="flex flex-col items-center">
              <FormControlLabel
                control={
                  <MapSwitch
                    checked={showTESLayer}
                    onChange={() => setShowTESLayer(!showTESLayer)}
                    aria-label="Tree Equity Score"
                  />
                }
                label="Tree Equity Score"
              />
              <div className="flex items-center mt-1 h-[32px]">
                {!showTESLayer && (
                  <select
                    value={demoColumn}
                    onChange={e => setDemoColumn(e.target.value)}
                    className="p-2 pr-8 rounded border border-gray-300 appearance-none"
                  >
                    <option value="pctpov">People in Poverty</option>
                    <option value="pctpoc">People of Color</option>
                    <option value="unemplrate">Unemployment Rate</option>
                  </select>
                )}
                {showTESLayer && (
                  <label className="flex items-center space-x-2">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={tesFilter}
                      onChange={e => setTesFilter(Number(e.target.value))}
                      className="w-24"
                      style={{ verticalAlign: "middle", width: "125px" }}
                    />
                    <span className="text-base w-6 text-right">{tesFilter}</span>
                  </label>
                  )}
                </div>
              </div>
          </div>
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
            />
          </Popup>
        )}
      </Map>
      <Legend showTESLayer={showTESLayer} showTransitLayer={showTransitLayer} demoColumn={demoColumn} />
    </div>
  )
}

export default Maps
