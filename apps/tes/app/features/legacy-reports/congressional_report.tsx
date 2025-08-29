import getCongressionalDistrict from "app/congressional-districts/queries/getCongressionalDistrict"
import Head from "next/head"
import { useQuery } from "@blitzjs/rpc"
import { CONGRESSIONAL_DISTRICT_REPORT_TYPE, NATIONAL_EXTENT } from "app/constants"
import getBlockgroupByCongressionalDistrict from "app/blockgroups/queries/getBlockgroupByCongressionalDistrict"
import { NationalReport } from "./national_report"
import getExtent from "app/blockgroups/queries/getExtent"
import { Blockgroup } from "db"

export function CongressionalDistrictReport({ name }: { name: string }) {
  const [congressionalDistrict] = useQuery(getCongressionalDistrict, {
    name: name,
  })
  const [blockgroups] = useQuery(getBlockgroupByCongressionalDistrict, {
    congressionalDistrict: congressionalDistrict.name,
  })
  const [extent] = useQuery(
    getExtent,
    { blockgroupIds: blockgroups.map((blockgroup: Blockgroup) => blockgroup.id) },
    { enabled: !!blockgroups }
  )
  const pageTitle = `${congressionalDistrict.name} Tree Equity Score Report`

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <NationalReport
        reportData={{
          type: CONGRESSIONAL_DISTRICT_REPORT_TYPE,
          blockgroups: blockgroups,
          congressionalDistrict: congressionalDistrict,
          mapExtent: extent || NATIONAL_EXTENT,
        }}
      />
    </>
  )
}
