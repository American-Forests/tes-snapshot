import { City } from "@prisma/client"
import Help from "components/help"
import type { Facet } from "data/facets"
import { useTranslation } from "react-i18next"

export const FacetTooltip = ({
  facetKey,
  active,
  city,
  hasSublayers,
}: {
  facetKey: Facet["field"]["field"] | Facet["title"]
  active?: boolean
  city?: City
  hasSublayers?: boolean
}) => {
  const { t } = useTranslation(["facets", "common"])
  const translationKey = `facets:${facetKey}`
  const facetDescription = t([
    `${translationKey}.description.${city}`,
    `${translationKey}.description`, // If there's no city specific use the default
  ])
  const facetSource = t([`${translationKey}.source.${city}`, `${translationKey}.source`])
  return (
    <Help
      className={`${!hasSublayers ? "group-hover:text-white" : "group-hover:text-brand-green"} ${
        active ? "text-white" : "text-brand-green"
      }`}
    >
      <>
        <p className="text-left">{facetDescription}</p>
        <p className="text-gray-400 text-xs text-left pt-2">
          {`[${t("common:data_source")}: ${facetSource}]`}
        </p>
      </>
    </Help>
  )
}
