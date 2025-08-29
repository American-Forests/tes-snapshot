import { HelpWidget as HelpWidgetUi, HelpWidgetContent } from "ui"
import { HELP_WIDGET_CONTENT } from "app/features/i18n/i18n.constants"
import { useTranslation } from "react-i18next"

export const HelpWidget = ({ className }: { className: string }) => {
  const { t } = useTranslation(["map", "facets", "data"])

  const translatedPanels = HELP_WIDGET_CONTENT.panels.map((panel) => ({
    ...panel,
    accordionItems: panel.accordionItems.map((item) => ({
      ...item,
      title: item.title ? t(item.title as string) : "",
      content: item.content ? t(item.content) : "",
      nestedAccordionContent: item.nestedAccordionContent?.map((nestedItem) => ({
        ...nestedItem,
        title: nestedItem.title ? t(nestedItem.title as string) : "",
        content: nestedItem.content ? t(nestedItem.content) : "",
      })),
    })),
  }))

  const translatedTabs = HELP_WIDGET_CONTENT.tabs.map((tab) => ({
    ...tab,
    title: t(tab.title),
  }))
  
  const helpWidgetContent: HelpWidgetContent = {
    panels: translatedPanels,
    tabs: translatedTabs,
  }

  return <HelpWidgetUi content={helpWidgetContent} className={className} />
}
