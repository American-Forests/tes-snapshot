import { gSSP } from "app/blitz-server"
import { GetServerSideProps } from "next"
import { invoke } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import { Suspense } from "react"
import { SymbolIcon } from "@radix-ui/react-icons"

import { Report, ReportProps } from "app/features/dashboard"
import { LOCALITY_REPORT_TYPE } from "app/features/report-finder/constants"

import getBlockgroupWithCenterByMunicipality from "app/blockgroups/queries/getBlockgroupWithCenterByMunicipality"
import getMunicipalityFromSlug from "app/municipalities/queries/getMunicipalityFromSlug"

const PlaceInsightsPage: BlitzPage<ReportProps> = ({
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

PlaceInsightsPage.getLayout = (page) => (
  <Layout title={page.props.pageTitle}>
    <Suspense fallback={<Loading />}>{page}</Suspense>
  </Layout>
)

export const getServerSideProps: GetServerSideProps = gSSP(async ({ params }) => {
  const slug = params?.slug ?? ""

  const municipality = await invoke(getMunicipalityFromSlug, { slug })
  const blockgroups = await invoke(getBlockgroupWithCenterByMunicipality, {
    municipalitySlug: `${municipality!.slug}`,
  })

  const reportData: ReportProps["reportData"] = {
    meta: {
      title: `${municipality.incorporated_place_name}, ${municipality.state}`,
      shortTitle: municipality.incorporated_place_name,
      type: LOCALITY_REPORT_TYPE,
      compositeScore: municipality.incorporated_place_mean_tree_equity_score,
      slug: `${slug}`,
    },
    blockgroups,
  }

  const pageTitle = `${municipality.incorporated_place_name}, ${municipality.state} Location Insights`

  return { props: { reportData, pageTitle } }
})

export default PlaceInsightsPage
