import { gSSP } from "app/blitz-server"
import { GetServerSideProps } from "next"
import { invoke } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import { Suspense } from "react"
import { SymbolIcon } from "@radix-ui/react-icons"

import { Report, ReportProps } from "app/features/dashboard"
import { COUNTY_REPORT_TYPE } from "app/features/report-finder/constants"

import getCounty from "app/counties/queries/getCounty"
import getBlockgroupByCounty from "app/blockgroups/queries/getBlockgroupByCounty"
import getBlockgroupByMunicipalities from "app/blockgroups/queries/getBlockgroupByMunicipalities"
import { arrayUnique } from "app/utils"

const CountyInsightsPage: BlitzPage<ReportProps> = ({
  reportData,
}: {
  reportData: ReportProps["reportData"]
}) => {
  return <Report reportData={reportData} />
}

const Loading = () => {
  return (
    <div className="p-2 flex items-center justify-center gap-x-2 py-4 text-gray-500">
      <SymbolIcon />
      Loading…
    </div>
  )
}

CountyInsightsPage.getLayout = (page) => (
  <Layout title={page.props.pageTitle}>
    <Suspense fallback={<Loading />}>{page}</Suspense>
  </Layout>
)

export const getServerSideProps: GetServerSideProps = gSSP(async ({ params }) => {
  const slug = params?.slug ?? ""
  const county = await invoke(getCounty, { slug: slug })
  const blockgroups = await invoke(getBlockgroupByCounty, { countySlug: county.slug })

  const municipalitySlugs =
    blockgroups && blockgroups.length > 0
      ? arrayUnique(
          blockgroups.map((bg) => bg.municipality_slug).filter((slug) => slug !== null) as string[],
        )
      : undefined

  const allBlockgroups = await invoke(getBlockgroupByMunicipalities, {
    municipalitySlugs: municipalitySlugs || [],
  })
  const extraBlockgroups =
    blockgroups && allBlockgroups
      ? allBlockgroups.filter((a) => !blockgroups.some((b) => b.id === a.id))
      : []
  const reportData: ReportProps["reportData"] = {
    meta: {
      title: `${county.name}, ${county.state}`,
      shortTitle: county.name,
      type: COUNTY_REPORT_TYPE,
      slug: `${slug}`,
    },
    blockgroups: blockgroups || [],
    extraBlockgroups: extraBlockgroups.length > 0 ? extraBlockgroups : undefined,
  }

  const pageTitle = `${county.name}, ${county.state} Location Insights`

  return { props: { reportData, pageTitle } }
})

export default CountyInsightsPage
