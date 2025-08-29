import * as React from "react"
import { twMerge } from "tailwind-merge"

type Tab = {
  label: string
  slug: string
  active?: boolean
}

export type Callback = (tabSlug: string) => void

type PillTabsProps = {
  tabs: Tab[]
  onSelect: Callback
}

export const PillTabs: React.FC<PillTabsProps> = ({ tabs, onSelect }) => {
  const activeTab = Math.max(tabs.map((t) => t.active).indexOf(true), 0)
  const [active, setActive] = React.useState(activeTab)

  return (
    <div className="flex">
      {tabs.map((t, i) => {
        const isActive = i === active
        const isFirst = i === 0
        const isLast = i === tabs.length - 1
        return (
          <div
            key={i}
            className={twMerge(
              "py-1.5 px-3 text-sm",
              "border",
              "cursor-pointer",
              isFirst ? "rounded-l-xl" : "",
              isLast ? "rounded-r-xl" : "",
              isActive ? "border-brand-green font-medium" : "border-gray-300",
              isActive ? "bg-brand-green-pale" : "bg-gray-100",
              isActive ? "text-brand-green-dark" : "text-gray-400"
            )}
            onClick={() => {
              setActive(i)
              onSelect(t.slug)
            }}
          >
            {t.label}
          </div>
        )
      })}
    </div>
  )
}
