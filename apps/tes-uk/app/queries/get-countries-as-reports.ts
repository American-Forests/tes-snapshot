import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import type { Report } from "ui"
import getCountries from "./get-countries"
import { COUNTRY_REPORT_TYPE, REPORT_TYPE } from "app/features/report/report.constants"

const GetCountriesAsReports = z.void()

export default resolver.pipe(resolver.zod(GetCountriesAsReports), async (input, ctx) => {
  const countries = await getCountries(input, ctx)
  const reports: Report[] = countries.map((country) => ({
    id: country.id,
    displayName: country.name,
    type: COUNTRY_REPORT_TYPE as REPORT_TYPE,
  }))
  return reports
})
