import { useParam, BlitzPage } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import Layout from "pages/_layout"
import { Report } from "app/features/report"
import { LOCALITY_REPORT_TYPE, REPORT_TYPES } from "app/features/report/report.constants"
import getLocalityLike from "app/queries/get-locality-like"
import getNeighborhoodLikesByLocalityLike from "app/queries/get-neighborhood-likes-by-locality-like"
import { Suspense } from "react"
import Loading from "app/features/report/components/loading"

const LocalAuthorityReportPage: BlitzPage = () => {
  const localityId = useParam("id", "string")!
  const [locality] = useQuery(getLocalityLike, { id: localityId })
  const [neighborhoods] = useQuery(getNeighborhoodLikesByLocalityLike, {
    localityLikeId: localityId,
  })

  return (
    <Report
      reportData={{ meta: { ...locality, type: REPORT_TYPES[LOCALITY_REPORT_TYPE] }, neighborhoods }}
    />
  )
}

LocalAuthorityReportPage.getLayout = (page) => (
  <Layout title="Tree Equity Score UK Report">
    <Suspense fallback={<Loading />}>{page}</Suspense>
  </Layout>
)
export default LocalAuthorityReportPage
