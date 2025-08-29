import { gSSP } from "app/blitz-server"
import { GetServerSideProps } from "next"
import { invoke } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import { Suspense } from "react"
import { SymbolIcon } from "@radix-ui/react-icons"

import { Report, ReportProps } from "app/features/dashboard"

import getState from "app/states/queries/getState"
import getBlockgroupByState from "app/blockgroups/queries/getBlockgroupByState"
import getBlockgroupByMunicipalities from "app/blockgroups/queries/getBlockgroupByMunicipalities"
import { arrayUnique } from "app/utils"
import { STATE_REPORT_TYPE } from "app/features/report-finder/constants"

const StateInsightsPage: BlitzPage<ReportProps> = ({
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

StateInsightsPage.getLayout = (page) => (
  <Layout title={page.props.pageTitle}>
    <Suspense fallback={<Loading />}>{page}</Suspense>
  </Layout>
)

export const getServerSideProps: GetServerSideProps = gSSP(async ({ params }) => {
  const slug = params?.slug ?? ""

  const state = await invoke(getState, { abbreviation: slug })
  const blockgroups = await invoke(getBlockgroupByState, { state: slug })

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
      title: `State of ${state.name || state.abbreviation}`,
      shortTitle: state.name,
      type: STATE_REPORT_TYPE,
      slug: `${slug}`,
    },
    blockgroups,
    extraBlockgroups: extraBlockgroups.length > 0 ? extraBlockgroups : undefined,
  }

  const pageTitle = `${state.name} Location Insights`

  return { props: { reportData, pageTitle } }
})

export default StateInsightsPage
