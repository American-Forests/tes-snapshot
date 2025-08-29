import { useParam, BlitzPage } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import { Suspense } from "react"
import Layout from "pages/_layout"
import { Report } from "app/features/report"
import getNeighborhoodLikesByCountry from "app/queries/get-neighborhood-likes-by-country"
import getCountry from "app/queries/get-country"
import Loading from "app/features/report/components/loading"
import { COUNTRY_REPORT_TYPE, REPORT_TYPES } from "app/features/report/report.constants"

const CountryReportPage: BlitzPage = () => {
  const countryId = useParam("id", "string")!
  const [country] = useQuery(getCountry, { id: countryId })
  const [neighborhoods] = useQuery(getNeighborhoodLikesByCountry, { countryId })

  return (
    <Report
      reportData={{ meta: { ...country, type: REPORT_TYPES[COUNTRY_REPORT_TYPE] }, neighborhoods }}
    />
  )
}

CountryReportPage.getLayout = (page) => (
  <Layout title="Tree Equity Score UK Report">
    <Suspense fallback={<Loading />}>{page}</Suspense>
  </Layout>
)
export default CountryReportPage
