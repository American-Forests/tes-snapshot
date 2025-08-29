import { gSSP } from "app/blitz-server"
import { GetServerSideProps } from "next"
import { invoke } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import { Suspense } from "react"
import { SymbolIcon } from "@radix-ui/react-icons"

import { Report, ReportProps } from "app/features/dashboard"
import { DISTRICT_REPORT_TYPE } from "app/features/report-finder/constants"

import getCongressionalDistrict from "app/congressional-districts/queries/getCongressionalDistrict"
import getBlockgroupByCongressionalDistrict from "app/blockgroups/queries/getBlockgroupByCongressionalDistrict"

const DistrictInsightsPage: BlitzPage<ReportProps> = ({
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

DistrictInsightsPage.getLayout = (page) => (
  <Layout title={page.props.pageTitle}>
    <Suspense fallback={<Loading />}>{page}</Suspense>
  </Layout>
)

export const getServerSideProps: GetServerSideProps = gSSP(async ({ params }) => {
  const slug = params?.slug ?? ""

  const congressionalDistrict = await invoke(getCongressionalDistrict, {
    name: slug,
  })
  const blockgroups = await invoke(getBlockgroupByCongressionalDistrict, {
    congressionalDistrict: congressionalDistrict.name,
  })

  const reportData: ReportProps["reportData"] = {
    meta: {
      title: `${congressionalDistrict.name}`,
      type: DISTRICT_REPORT_TYPE,
      slug: `${slug}`,
    },
    blockgroups,
  }

  const pageTitle = `${congressionalDistrict.name} Location Insights`

  return {
    props: {
      reportData,
      pageTitle,
    },
  }
})

export default DistrictInsightsPage
