import type { Facet } from "data/facets"
import { useTranslation } from "react-i18next"

export const FacetName = ({
  facetKey,
  isFilter,
}: {
  facetKey: Facet["field"]["field"] | Facet["title"]
  isFilter?: boolean
}) => {
  const { t } = useTranslation(["facets"])
  const textSizeCx = isFilter ? "text-xs" : "text-sm"
  const translationKey = `facets:${facetKey}`
  return <span className={`${textSizeCx} mr-2 text-left`}>{t(`${translationKey}.name`)}</span>
}
