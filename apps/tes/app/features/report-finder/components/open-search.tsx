import { Suspense, useState } from "react"
import { useQuery } from "@blitzjs/rpc"
import getMunicipalities from "app/municipalities/queries/getMunicipalities"
import getStatesFromQuery from "app/states/queries/getStatesFromQuery"
import getCountiesFromQuery from "app/counties/queries/getCountiesFromQuery"
import { ReportFinder as ReportFinderUI } from "ui"
import { useEffect } from "react"
import { ReportLink } from "./report-link"
import { County, Municipality, State } from "db"
import { getReportUrl } from "../utils"
import { REPORT_TYPES } from "../constants"
import { ReportType } from "../types"
import { useTranslation } from "react-i18next"
const totalItems = 75
const itemsPerCategory = Math.round(totalItems / 3)

const OpenSearchResults = ({ query }: { query: string }) => {
  const [municipalities] = useQuery(
    getMunicipalities,
    { query, maxItems: itemsPerCategory },
    { enabled: query.length > 0 }
  )
  const [states] = useQuery(
    getStatesFromQuery,
    { query, maxItems: itemsPerCategory },
    { enabled: query.length > 0 }
  )
  const [counties] = useQuery(
    getCountiesFromQuery,
    { query, maxItems: itemsPerCategory },
    { enabled: query.length > 0 }
  )
  const [reportOptions, setReportOptions] = useState<{ name: string; href: string }[]>([])

  useEffect(() => {
    let municipalityOptions: { name: string; href: string }[] = []
    let stateOptions: { name: string; href: string }[] = []
    let countryOptions: { name: string; href: string }[] = []

    if (municipalities && municipalities.length > 0) {
      municipalityOptions = [
        ...municipalities.map((municipality: Municipality) => ({
          name: `${municipality.incorporated_place_name}, ${municipality.state}`,
          href: getReportUrl(REPORT_TYPES.LOCALITY_REPORT_TYPE as ReportType, municipality.slug),
        })),
      ]
    }

    if (states && states.length > 0) {
      stateOptions = [
        ...states.map((state: State) => ({
          name: `State of ${state.name}`,
          href: getReportUrl(REPORT_TYPES.STATE_REPORT_TYPE as ReportType, state.abbreviation),
        })),
      ]
    }

    if (counties && counties.length > 0) {
      countryOptions = [
        ...counties.map((county: County) => ({
          name: `${county.name}, ${county.state}`,
          href: getReportUrl(REPORT_TYPES.COUNTY_REPORT_TYPE as ReportType, county.slug),
        })),
      ]
    }

    setReportOptions([
      ...municipalityOptions.slice(0, itemsPerCategory),
      ...stateOptions.slice(0, itemsPerCategory),
      ...countryOptions.slice(0, itemsPerCategory),
    ])
  }, [municipalities, states, counties])

  return (
    <ReportFinderUI.ReportOptionsMenu
      reportOptions={reportOptions}
      fallbackText=" "
      className="grid sm:grid-cols-2 sm:gap-6 gap-4 sm:gap-x-16 p-4 justify-center w-full overflow-auto"
      reportLinkClassName="text-lg"
      ReportLink={ReportLink}
    />
  )
}

export const OpenSearch = () => {
  const [query, setQuery] = useState("")
  const { t } = useTranslation(["location-insights"])
  return (
    <div className="flex flex-col sm:items-start items-center h-full pt-4 pb-2 px-2 ml-6">
      <div className="mb-4 overflow-auto">
        <ReportFinderUI.SearchBar
          placeholder={t("location-insights:search.enter_location")}
          setQuery={setQuery}
        />
        <Suspense fallback={null}>
          <OpenSearchResults query={query} />
        </Suspense>
      </div>
    </div>
  )
}
