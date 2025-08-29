import getBlockgroupByCounty from "app/blockgroups/queries/getBlockgroupByCounty"
import getCounty from "app/counties/queries/getCounty"
import Head from "next/head"
import { useQuery } from "@blitzjs/rpc"
import { NationalReport } from "./national_report"
import { COUNTY_REPORT_TYPE, NATIONAL_EXTENT } from "app/constants"
import getExtent from "app/blockgroups/queries/getExtent"
import { Blockgroup } from "db"

export function CountyReport({ slug }: { slug: string }) {
  const [county] = useQuery(getCounty, { slug: slug })
  const [blockgroups] = useQuery(
    getBlockgroupByCounty,
    { countySlug: county.slug },
    { enabled: !!county }
  )
  const [extent] = useQuery(
    getExtent,
    { blockgroupIds: blockgroups!.map((blockgroup: Blockgroup) => blockgroup.id) },
    { enabled: !!blockgroups }
  )
  const pageTitle = `${county.name}, ${county.state} Tree Equity Score Report`

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <NationalReport
        reportData={{
          type: COUNTY_REPORT_TYPE,
          blockgroups: blockgroups!,
          county: county,
          mapExtent: extent || NATIONAL_EXTENT,
        }}
      />
    </>
  )
}
