import { facetsAtom, filtersAtom, getFilters } from "app/state"
import { useAtomValue, useSetAtom } from "jotai"
import { ChevronLeftIcon, ResetIcon } from "@radix-ui/react-icons"
import { styledButton2 } from "components/elements"
import { useTranslation } from "react-i18next"

export function LegendBackHeader({ title, onClick }: { title: string; onClick: () => void }) {
  const {t} = useTranslation(["common"])
  const setFilters = useSetAtom(filtersAtom)
  const facets = useAtomValue(facetsAtom)
  return (
    <div className="flex items-center gap-x-2 justify-between px-3 py-2 border-b border-gray-200">
      <div>{title}</div>
      <div className="flex-auto" />
      {title === t("common:filters") ? (
        <button
          className={styledButton2({ variant: "outline" })}
          onClick={() => {
            setFilters(getFilters(facets))
          }}
        >
          <ResetIcon />
          {t("common:reset")}
        </button>
      ) : null}
      <button className={styledButton2({ variant: "outline" })} onClick={onClick}>
        <ChevronLeftIcon />
        {t("common:close")}
      </button>
    </div>
  )
}
