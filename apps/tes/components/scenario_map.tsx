import React, { useRef } from "react"
import { useScenarioMap, MapOptions } from "hooks/use_scenario_map"
import { GeoJSONSource } from "mapbox-gl"

const OPTIONS: MapOptions = {
  rememberPosition: true,
  hash: false,
  zoomControl: true,
  extent: [-77.802689, 37.324288, -77.112602, 37.764576],
  disableZoomOnScroll: true,
}

export function ScenarioMap({
  className,
  scenarioBbox,
  scenarioFeatures,
}: {
  className: string
  scenarioBbox: [number, number, number, number]
  scenarioFeatures: GeoJSONSource
}) {
  const mapDiv = useRef<HTMLDivElement>(null)
  useScenarioMap(mapDiv, Object.values(scenarioFeatures), {
    ...OPTIONS,
    extent: scenarioBbox,
  })
  return <div ref={mapDiv} className={className}></div>
}
