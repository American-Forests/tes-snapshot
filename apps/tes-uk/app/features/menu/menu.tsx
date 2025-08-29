import Link from "next/link"
import { Suspense, useEffect, useState } from "react"
import { useQuery } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import { ErrorBoundary, ErrorComponent } from "@blitzjs/next"
import { useAtom, useAtomValue } from "jotai"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

import { NavMenu, ReportFinderOld } from "ui"
import type {
  ReportFinderData,
  CountriesLoadQuery,
  ReportAreaLoadQuery,
  RegionsLoadQuery,
  SubregionsLoadQuery,
} from "ui"

import { NAV_MENU_ITEMS } from "app/constants"
import { NEIGHBORHOOD_LIKE_SOURCE } from "app/features/map/map.constants"
import {
  CONSTITUENCY_REPORT_TYPE,
  COUNTRY_REPORT_TYPE,
  LOCALITY_REPORT_TYPE,
  REPORT_TYPES,
} from "app/features/report/report.constants"

import { clickedFeatureAtom } from "app/features/map/map.state"
import { reportDropdownOpenAtom } from "./menu.state"
import { navMenuOpenAtom } from "./menu.state"

import getNeighborhoodLike from "app/queries/get-neighborhood-like"
import getCountry from "app/queries/get-country"
import getConstituency from "app/queries/get-constituency"
import getLocalityLike from "app/queries/get-locality-like"
import getCountriesAsReports from "app/queries/get-countries-as-reports"

import getConstituenciesAsReportsByCountryAndLocalityLike from "app/queries/get-constituencies-as-reports-by-country-and-locality-like"
import type { MapClickReportOption } from "app/features/report/report.constants"
import getCountriesAndLocalityLikesByQuery from "app/queries/get-countries-and-locality-likes-by-query"
import getLocalityLikesAsReportsByQuery from "app/queries/get-locality-likes-as-report-links-by-query"

const ReportsDropdown = () => {
  const [reportDropdownOpen, setReportDropdownOpen] = useAtom(reportDropdownOpenAtom)
  const clickedFeature = useAtomValue(clickedFeatureAtom)
  const [clickedFeatureId, setClickedFeatureId] = useState<string | null>(null)
  const [neigborhoodLike] = useQuery(
    getNeighborhoodLike,
    { id: clickedFeatureId! },
    { enabled: !!clickedFeatureId }
  )

  const [country] = useQuery(
    getCountry,
    { id: neigborhoodLike?.country_id as string },
    { enabled: !!neigborhoodLike?.country_id }
  )
  const [constituency] = useQuery(
    getConstituency,
    { id: neigborhoodLike?.constituency_id as string },
    { enabled: !!neigborhoodLike?.constituency_id }
  )
  const [locality] = useQuery(
    getLocalityLike,
    { id: neigborhoodLike?.locality_id as string },
    { enabled: !!neigborhoodLike?.locality_id }
  )

  useEffect(() => {
    if (!clickedFeature) {
      setClickedFeatureId(null)
      return
    }

    if (
      clickedFeature.source === NEIGHBORHOOD_LIKE_SOURCE &&
      clickedFeature.properties &&
      clickedFeature.properties.id
    ) {
      setClickedFeatureId(clickedFeature.properties.id)
    }
  }, [clickedFeature])

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
  }, [country, constituency, locality])

  const handleInteractOutside = (e: Event) => {
    e.preventDefault()
  }

  const reportLinks = {
    [`${COUNTRY_REPORT_TYPE}`]: Routes.CountryReportPage,
    [`${LOCALITY_REPORT_TYPE}`]: Routes.LocalAuthorityReportPage,
    [`${CONSTITUENCY_REPORT_TYPE}`]: Routes.ConstituencyReportPage,
  }

  const getCountries = (searchQuery: string) =>
    useQuery(
      getCountriesAndLocalityLikesByQuery,
      { query: searchQuery },
      { enabled: searchQuery.length > 0 }
    )

  const getReportAreas = (regionId: string, subRegionId: string) =>
    useQuery(getConstituenciesAsReportsByCountryAndLocalityLike, {
      regionId: `${regionId!}`,
      subRegionId: `${subRegionId!}`,
    })

  const getRegions = () => useQuery(getCountriesAsReports, undefined)

  const getSubRegions = (selectedRegion: string) => {
    return useQuery(
      getLocalityLikesAsReportsByQuery,
      { query: selectedRegion },
      { enabled: Boolean(selectedRegion) }
    )
  }

  const data: ReportFinderData = {
    neigborhoodLike,
    header: {
      placeholder: "Find a report...",
      intro:
        "Dynamic reports can assist you in effectively communicating what it takes to raise Tree Equity Scores at a regional level. Access valuable summary metrics and interactive visualizations to gain insights for your area of interest. Use computational tools to assess scenarios and highlight the numerous benefits that can be gained by raising Tree Equity Scores within your community.",
      title: "Dynamic reports are available at four administrative scales:",
      description:
        "Locality (e.g., a town, city or village), County, Congressional District and State",
      noSelection: "Click on the map to see the reports available for each block group.",
      reportOptions,
    },
    footer: {
      title: "Not sure which constituency you are in?",
      description:
        "Return to the map to search your address, city or town. Click on the map to generate the reports for your location.",
    },
    tabs: [
      {
        title: "Find local authority and country reports",
        placeholder: "Enter a location name",
        description:
          "Begin entering part or all of your location name (a local authority or country) into the search bar. Then select the best match.",
        loadQuery: getCountries as CountriesLoadQuery,
        format: ({ id, type }) => reportLinks[type]!({ id: id }),
      },
      {
        title: "Find parliamentary constituency reports",
        placeholder: "",
        description:
          "Select a country to view all parliamentary constituency reports. Then choose a local authority to narrow further and select the best match.",
        queries: {
          getRegions: {
            title: "Country",
            loadQuery: getRegions as RegionsLoadQuery,
            placeholder: "Select a country",
          },
          getSubRegions: {
            title: "Local authority (optional)",
            loadQuery: getSubRegions as SubregionsLoadQuery,
            placeholder: "Select a local authority",
          },
          getReportAreas: {
            title: "temp",
            loadQuery: getReportAreas as ReportAreaLoadQuery,
            format: {
              items: (list) => list, // sort, filter etc here
              href: (item) => Routes.ConstituencyReportPage({ id: `${item.id}` }),
              title: (item) => item.displayName,
            },
          },
        },
      },
    ],
  }

  return (
    <DropdownMenu.Root open={reportDropdownOpen} onOpenChange={setReportDropdownOpen} modal={false}>
      <DropdownMenu.Trigger asChild>
        <div className="shadow cursor-pointer px-3 py-1 lg:px-5 lg:py-2 text-xs lg:text-sm font-semibold uppercase flex items-center gap-x-1 text-brand-green-dark hover:text-brand-green-darker transition-all rounded-full bg-white">
          Dynamic Reports
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-10 pr-4"
          align="start"
          onInteractOutside={handleInteractOutside}
          onFocusOutside={handleInteractOutside}
        >
          <Suspense fallback={null}>
            <ReportFinderOld
              open={reportDropdownOpen}
              setOpen={setReportDropdownOpen}
              className="absolute top-2 left-0 md:left-12"
              data={data}
            />
          </Suspense>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

const Menu = () => {
  const [navMenuOpen, setNavMenuOpen] = useAtom(navMenuOpenAtom)

  return (
    <div className="absolute top-2 right-4 z-30 flex flex-row">
      <div className="pr-2">
        <ErrorBoundary
          FallbackComponent={({ error }) => <ErrorComponent statusCode={error.statusCode} />}
        >
          <ReportsDropdown />
        </ErrorBoundary>
      </div>
      <NavMenu
        items={NAV_MENU_ITEMS}
        LinkComponent={Link}
        open={navMenuOpen}
        setOpen={setNavMenuOpen}
      />
    </div>
  )
}

export default Menu
