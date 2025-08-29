'use client'
import { FC, useState } from "react"
import { Accordion, AccordionItemType } from "../components/accordion"
import { Tabs } from "../components/tabs"
import { Button } from "../components/button"
import { QuestionMarkIcon, Cross1Icon } from "@radix-ui/react-icons"

export interface HelpWidgetProps {
  content: HelpWidgetContent
  className?: string
}

export type HelpWidgetTab = {
  title: string
  slug: string
}

export type HelpWidgetPanel = {
  tabSlug: string
  accordionItems: AccordionItemType[]
}

export type HelpWidgetContent = {
  panels: HelpWidgetPanel[]
  tabs: HelpWidgetTab[]
}

const Portal: FC<HelpWidgetProps> = ({
  content,
}: {
  content: HelpWidgetContent
}) => {
  return (
    <div className="w-[320px] bg-white rounded-lg h-[400px] absolute bottom-11 left-2 shadow overflow-hidden">
      <Tabs label="help widget">
        {content.tabs.map((t: HelpWidgetTab) => (
          <div title={t.title} key={t.title}>
            <Accordion
              items={
                content.panels.find((p) => p.tabSlug === t.slug)!.accordionItems
              }
              variant="primary"
              className="border-t border-t-gray-200"
            />
          </div>
        ))}
      </Tabs>
    </div>
  )
}

export const HelpWidget: FC<HelpWidgetProps> = ({ content, className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleWidget = () => setIsOpen(!isOpen)
  return (
    <div className={className}>
      {isOpen && <Portal content={content} />}
      <Button
        onClick={toggleWidget}
        Icon={isOpen ? Cross1Icon : QuestionMarkIcon}
        className="hidden md:block absolute bottom-1 left-2 rounded-lg p-2.5 bg-brand-green-darker hover:bg-brand-green-dark text-white drop-shadow-lg"
      />
    </div>
  )
}
