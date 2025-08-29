import getBlockgroupByMunicipality from "app/blockgroups/queries/getBlockgroupByMunicipality"
import { MUNICIPAL_REPORT_TYPE, NATIONAL_EXTENT } from "app/constants"
import getMunicipalityFromSlug from "app/municipalities/queries/getMunicipalityFromSlug"
import Head from "next/head"
import { useQuery } from "@blitzjs/rpc"
import { NationalReport } from "./national_report"
import getExtent from "app/blockgroups/queries/getExtent"
import { Blockgroup } from "db"

export function MunicipalReport({ municipalitySlug }: { municipalitySlug: string }) {
  const [municipality] = useQuery(getMunicipalityFromSlug, { slug: municipalitySlug })
  const [blockgroups] = useQuery(
    getBlockgroupByMunicipality,
    { municipalitySlug: municipality!.slug as string },
    { enabled: !!municipality }
  )
  const [extent] = useQuery(
    getExtent,
    {
      blockgroupIds: blockgroups ? blockgroups.map((blockgroup: Blockgroup) => blockgroup.id) : [],
    },
    { enabled: !!blockgroups }
  )
  const pageTitle = `${municipality.incorporated_place_name}, ${municipality.state} Tree Equity Score Report`

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {blockgroups && (
        <NationalReport
          reportData={{
            type: MUNICIPAL_REPORT_TYPE,
            blockgroups: blockgroups,
            municipality: municipality,
            mapExtent: extent || NATIONAL_EXTENT,
          }}
        />
      )}
    </>
  )
}
