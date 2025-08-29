import { useTranslation } from "react-i18next"
import { Accordion, type AccordionItemType, HelpWidgetPanel } from "ui"

export const TranslatedAccordion = ({translationKeys, className}:{translationKeys:HelpWidgetPanel, className?:string}) => {
  const { t } = useTranslation(["map", "facets", "data"])
  
  const items: AccordionItemType[] = translationKeys.accordionItems.map((category:AccordionItemType) => ({
    title: <p className="text-black text-title font-semibold">{t(category.title as string)}</p>,
    type: "accordion",
    nestedAccordionContent: category.nestedAccordionContent!
      .map((item) => ({
        content: t(item.content as string),
        title: (
          <p className="text-brand-green-dark text-body font-medium text-left pr-4">{t(item.title as string)}</p>
        ),
      })),
  }))

  return (
    <Accordion items={items} variant="primary" className={`border-b-2 border-brand-green py-5 ${className}`} />
  )
}