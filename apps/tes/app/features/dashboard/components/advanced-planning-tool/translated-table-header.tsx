import { useTranslation } from "react-i18next"
import { TableHeader } from "ui"

export const TranslatedTableHeader = ({ header, toolTipContent, className }: { header: string, toolTipContent: string, className?: string }) => {
    const {t} = useTranslation(["location-insights"])
    return <TableHeader header={t(`${header}`)} toolTipContent={t(toolTipContent)} className={className} />
  }