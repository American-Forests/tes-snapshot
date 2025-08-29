import { Suspense } from "react"
import { useParam, BlitzPage } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import Layout from "pages/_layout"
import { Report } from "app/features/report"
import getConstituency from "app/queries/get-constituency"
import getNeighborhoodLikesByConstituency from "app/queries/get-neighborhood-likes-by-constituency"
import Loading from "app/features/report/components/loading"
import { CONSTITUENCY_REPORT_TYPE, REPORT_TYPES } from "app/features/report/report.constants"

const ConstituencyReportPage: BlitzPage = () => {
  const constituencyId = useParam("id", "string")!
  const [constituency] = useQuery(getConstituency, { id: constituencyId })
  const [neighborhoods] = useQuery(getNeighborhoodLikesByConstituency, { constituencyId })

  return (
    <Report
      reportData={{
        meta: { ...constituency, type: REPORT_TYPES[CONSTITUENCY_REPORT_TYPE] },
        neighborhoods,
      }}
    />
  )
}

ConstituencyReportPage.getLayout = (page) => (
  <Layout title="Tree Equity Score UK Report">
    <Suspense fallback={<Loading />}>{page}</Suspense>
  </Layout>
)
export default ConstituencyReportPage
