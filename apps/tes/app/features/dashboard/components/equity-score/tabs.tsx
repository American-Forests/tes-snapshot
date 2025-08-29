import * as React from "react"
import { useTranslation } from "react-i18next"
import type { Callback } from "ui"
import { PillTabs } from "ui"

type SectionProps = {
  onChange: Callback
}


export const TabSection: React.FC<SectionProps> = ({ onChange }) => {
  const { t } = useTranslation(["location-insights"])
  const tabs = [
    { label: t("location-insights:planning.new_canopy"), slug: "new" },
    { label: t("location-insights:planning.existing_canopy"), slug: "existing" },
  ]
  return (
    <div className="flex flex-col justify-center items-center mb-2">
      <h1 className="text-base uppercase font-bold text-brand-green-darker mb-2 pt-8">
        {t("location-insights:planning.start_planning")}
      </h1>
      <PillTabs tabs={tabs} onSelect={onChange} />
    </div>
  )
}
