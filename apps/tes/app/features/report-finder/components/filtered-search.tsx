import { useQuery } from "@blitzjs/rpc"
import getCongressionalDistrictsByStateAndPlace from "app/congressional-districts/queries/getCongressionalDistrictsByStateAndPlace"
import { formatCongressionalDistrictName } from "app/utils/formatting_utils"
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from "react"
import { getReportUrl } from "../utils"
import { REPORT_TYPES, STATES_NAMES_DICT } from "../constants"
import { ReportType } from "../types"
import { CongressionalDistrict } from "db"
import { FilterOption } from "ui"
import { ReportFinder as ReportFinderUI } from "ui"
import { ReportLink } from "./report-link"
import getStates from "app/states/queries/getStates"
import getMunicipalitiesByState from "app/municipalities/queries/getMunicipalitiesByState"
import { useTranslation } from "react-i18next"

const LocalityFilter = ({
  selectedState,
  selectedLocality,
  setSelectedLocality,
  localityOptions,
  setLocalityOptions,
}: {
  selectedState: FilterOption | null
  selectedLocality: FilterOption | null
  setSelectedLocality: Dispatch<SetStateAction<FilterOption | null>>
  localityOptions: FilterOption[]
  setLocalityOptions: Dispatch<SetStateAction<FilterOption[]>>
}) => {
  const { t } = useTranslation(["location-insights", "common"])
  const [localitiesByState] = useQuery(
    getMunicipalitiesByState,
    { state: selectedState ? selectedState.id : "" },
    { enabled: !!selectedState }
  )

  useEffect(() => {
    if (localitiesByState && localitiesByState.length > 0) {
      const options = localitiesByState.map((locality) => ({
        displayValue: locality.incorporated_place_name!,
        id: locality.slug,
      }))
      setLocalityOptions(options)
    }
  }, [localitiesByState])

  return (
    <ReportFinderUI.Filter
      title={`${t("common:locality")} (${t("common:optional")})`}
      placeholder={t("location-insights:search.select_locality")}
      selectedValue={selectedLocality}
      setSelectedValue={setSelectedLocality}
      options={localityOptions}
    />
  )
}

const FilteredSearchResults = ({
  selectedState,
  selectedLocality,
}: {
  selectedState: FilterOption | null
  selectedLocality?: FilterOption | null
}) => {
  const [reportOptions, setReportOptions] = useState<{ name: string; href: string }[]>([])
  const [districts] = useQuery(
    getCongressionalDistrictsByStateAndPlace,
    {
      state: selectedState ? selectedState.id : "",
      place: selectedLocality?.id,
    },
    {
      enabled: !!selectedState,
    }
  )

  useEffect(() => {
    if (!districts || districts.length === 0) {
      setReportOptions([])
    } else {
      const options = districts.map((district: CongressionalDistrict) => ({
        name: formatCongressionalDistrictName(district.name),
        href: getReportUrl(REPORT_TYPES.DISTRICT_REPORT_TYPE as ReportType, district.name),
      }))
      setReportOptions(options)
    }
  }, [districts])

  return (
    <ReportFinderUI.ReportOptionsMenu
      reportOptions={reportOptions}
      fallbackText=" "
      className="grid sm:grid-cols-6 sm:gap-6 gap-6 sm:gap-x-4 grid-cols-4 p-4 justify-center w-full overflow-auto h-[59%]"
      reportLinkClassName="text-lg"
      ReportLink={ReportLink}
    />
  )
}

export const FilteredSearch = () => {
  const { t } = useTranslation(["location-insights", "common"])
  const [selectedState, setSelectedState] = useState<FilterOption | null>(null)
  const [selectedLocality, setSelectedLocality] = useState<FilterOption | null>(null)
  const [states] = useQuery(getStates, {})
  const [stateOptions, setStateOptions] = useState<FilterOption[]>([])
  const [localityOptions, setLocalityOptions] = useState<FilterOption[]>([])

  useEffect(() => {
    if (states && states.length > 0) {
      const options = states.map((state) => ({
        displayValue: STATES_NAMES_DICT[state.abbreviation],
        id: state.abbreviation,
      }))
      setStateOptions(options)
    }
  }, [states])

  useEffect(() => {
    setSelectedLocality(null)
  }, [selectedState])

  return (
    <div className="h-full relative pt-4 pb-2 px-2 mx-6">
      <div className="flex flex-row flex-wrap p-4 justify-center sm:justify-start gap-4">
        <ReportFinderUI.Filter
          title={t("common:state")}
          placeholder={t("location-insights:search.select_state")}
          selectedValue={selectedState}
          setSelectedValue={setSelectedState}
          options={stateOptions}
        />
        <Suspense
          fallback={
            <ReportFinderUI.Filter
              title={`${t("common:locality")} (${t("common:optional")})`}
              placeholder={t("location-insights:search.select_locality")}
              selectedValue={selectedLocality}
              setSelectedValue={setSelectedLocality}
              options={localityOptions}
            />
          }
        >
          <LocalityFilter
            selectedState={selectedState}
            selectedLocality={selectedLocality}
            setSelectedLocality={setSelectedLocality}
            localityOptions={localityOptions}
            setLocalityOptions={setLocalityOptions}
          />
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <FilteredSearchResults selectedState={selectedState} selectedLocality={selectedLocality} />
      </Suspense>
      <ReportFinderUI.TabFooter>
        <h1 className="text-base font-semibold">{t("location-insights:search.district_help")}</h1>
        <p className="text-gray-500 text-sm">
          {t("location-insights:search.district_instructions")}
        </p>
      </ReportFinderUI.TabFooter>
    </div>
  )
}
