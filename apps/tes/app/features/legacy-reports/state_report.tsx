import { NATIONAL_EXTENT, STATE_REPORT_TYPE } from "app/constants"
import { NationalReport } from "app/features/legacy-reports/national_report"
import getBlockgroupByState from "app/blockgroups/queries/getBlockgroupByState"
import getState from "app/states/queries/getState"
import Head from "next/head"
import { useQuery } from "@blitzjs/rpc"
import getExtent from "app/blockgroups/queries/getExtent"
import { Blockgroup } from "db"

export function StateReport({ abbreviation }: { abbreviation: string }) {
  const [state] = useQuery(getState, { abbreviation: abbreviation })
  const [blockgroups] = useQuery(getBlockgroupByState, { state: abbreviation })
  const [extent] = useQuery(
    getExtent,
    { blockgroupIds: blockgroups.map((blockgroup: Blockgroup) => blockgroup.id) },
    { enabled: !!blockgroups }
  )
  const pageTitle = `${state.name} Tree Equity Score Report`

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <NationalReport
        reportData={{
          type: STATE_REPORT_TYPE,
          blockgroups: blockgroups,
          state: state,
          mapExtent: extent || NATIONAL_EXTENT,
        }}
      />
    </>
  )
}
