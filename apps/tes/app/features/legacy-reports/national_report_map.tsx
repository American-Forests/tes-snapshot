import { useEffect, useRef } from "react"
import { useNationalReportMap } from "hooks/use_national_report_map"
import { NationalReportProps } from "./national_report"
import {
  STATE_REPORT_TYPE,
  MUNICIPALITY_OUTLINE_LAYER_NAME,
  MUNICIPALITY_LAYER_NAME,
  BLOCKGROUP_LAYER_NAME,
  BLOCKGROUP_OUTLINE_LAYER_NAME,
} from "app/constants"

export default function NationalReportMap({ reportData, mapRef }: NationalReportProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mapDiv = mapRef || ref

  const map = useNationalReportMap({
    mapDiv,
    extent: reportData.mapExtent,
    showMunicipalityLayer: reportData.type === STATE_REPORT_TYPE,
  })

  useEffect(() => {
    if (!map) return
    const blockgroupIds = reportData.blockgroups.map((blockgroup) => blockgroup.id)
    const filter: mapboxgl.Expression = ["in", ["get", "id"], ["literal", blockgroupIds]]
    map.setFilter(BLOCKGROUP_LAYER_NAME, filter)
    map.setFilter(BLOCKGROUP_OUTLINE_LAYER_NAME, filter)

    if (reportData.type === STATE_REPORT_TYPE) {
      const stateFilter = ["in", ["get", "state"], ["literal", [reportData.state.abbreviation]]]
      map.setFilter(MUNICIPALITY_LAYER_NAME, stateFilter)
      map.setFilter(MUNICIPALITY_OUTLINE_LAYER_NAME, stateFilter)
    }
  }, [map])

  return <div ref={mapDiv} className="w-full h-[800px]"></div>
}
