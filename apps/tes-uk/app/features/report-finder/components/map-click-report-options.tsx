import { NeighborhoodLike } from "@prisma/client"
import { useQuery } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import getCountry from "app/queries/get-country"
import getConstituency from "app/queries/get-constituency"
import getLocalityLike from "app/queries/get-locality-like"
import {
  CONSTITUENCY_REPORT_TYPE,
  COUNTRY_REPORT_TYPE,
  LOCALITY_REPORT_TYPE,
  MapClickReportOption,
  REPORT_TYPES,
} from "app/features/report/report.constants"
import ReportLink from "./report-link"
import { useState, useEffect } from "react"

const MapClickReportOptions = ({
  neighborhood,
}: {
  neighborhood: NeighborhoodLike | undefined
}) => {
  const [country] = useQuery(
    getCountry,
    { id: neighborhood?.country_id as string },
    { enabled: !!neighborhood?.country_id }
  )
  const [constituency] = useQuery(
    getConstituency,
    { id: neighborhood?.constituency_id as string },
    { enabled: !!neighborhood?.constituency_id }
  )
  const [locality] = useQuery(
    getLocalityLike,
    { id: neighborhood?.locality_id as string },
    { enabled: !!neighborhood?.locality_id }
  )

  const [reportOptions, setReportOptions] = useState<MapClickReportOption[] | null>(null)

  useEffect(() => {
    const options: MapClickReportOption[] = []
    if (locality) {
      options.push({
        type: LOCALITY_REPORT_TYPE,
        typeName: REPORT_TYPES[LOCALITY_REPORT_TYPE],
        name: locality?.name,
        href: Routes.LocalAuthorityReportPage({ id: locality?.id as string }),
      })
    }

    if (constituency) {
      options.push({
        type: CONSTITUENCY_REPORT_TYPE,
        typeName: REPORT_TYPES[CONSTITUENCY_REPORT_TYPE],
        name: constituency?.name,
        href: Routes.ConstituencyReportPage({ id: constituency?.id as string }),
      })
    }

    if (country) {
      options.push({
        type: COUNTRY_REPORT_TYPE,
        typeName: REPORT_TYPES[COUNTRY_REPORT_TYPE],
        name: country?.name,
        href: Routes.CountryReportPage({ id: country?.id as string }),
      })
    }

    setReportOptions(options)
  }, [locality, constituency, country])

  return (
    <>
      {!neighborhood && (
        <p className="text-sm text-gray-700 mb-4 pl-2">
          Click on the map to see the reports available for that location.
        </p>
      )}

      {neighborhood && (
        <div className="w-full flex flex-col mb-4 px-2 items-start">
          <p className="text-sm font-semibold text-gray-700 pb-2 pt-1">From map selection:</p>
          {reportOptions &&
            reportOptions.map((reportOption, i) => (
              <ReportLink
                key={i}
                name={reportOption.name}
                type={reportOption.type}
                href={reportOption.href}
              />
            ))}
        </div>
      )}
    </>
  )
}

export default MapClickReportOptions
