// @ts-nocheck
'use client'
import { useState } from "react"

import { XMarkIcon } from "@heroicons/react/24/solid"
import * as Tabs from "@radix-ui/react-tabs"
import * as Dialog from "@radix-ui/react-dialog"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { twMerge } from "tailwind-merge"

import { OpenSearch } from "./open-search"
import { FilteredSearch } from "./filtered-search"
import type { ReportFinderData } from "./types"

const Footer = ({ children }) => {
  return (
    <div className="absolute bottom-20 h-20 border-t py-4 px-10">
      {children}
    </div>
  )
}

const searchTabs = [OpenSearch, FilteredSearch]

export function ReportSearchModal({ data }: ReportFinderData) {
  const [open, setOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState("tab-0")

  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen} modal={true}>
        <Dialog.Trigger className="z-10 relative px-2">
          <MagnifyingGlassIcon className="w-4 h-4 absolute left-6 top-1.5 text-brand-green-dark pointer-events-none" />
          <button className="w-full text-xs hover:shadow py-1.5 pl-10 pr-8 bg-white rounded-full border border-brand-green text-brand-green-dark">
            Search all reports
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30 z-40" />
          <Dialog.Content className="fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%]">
            <div className="h-[540px] w-[650px] bg-white rounded-lg drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              <Tabs.Root
                value={selectedTab}
                onValueChange={setSelectedTab}
                defaultValue="tab1"
                className="h-full flex flex-col"
              >
                <Tabs.List className="flex flex-row border-b">
                  {data.tabs.map((tab, i) => (
                    <Tabs.Trigger
                      value={`tab-${i}`}
                      className={twMerge(
                        "flex-grow text-sm py-2 p-4 font-semibold border-r rounded-tl-lg",
                        selectedTab === `tab-${i}`
                          ? "bg-white text-brand-green-dark"
                          : "bg-gray-100 text-gray-500"
                      )}
                    >
                      {tab.title}
                    </Tabs.Trigger>
                  ))}
                  <button
                    onClick={() => setOpen(false)}
                    className="group px-2 hover:bg-brand-green-dark rounded-tr-lg"
                  >
                    <XMarkIcon className="w-4 h-4 mx-1 fill-brand-green-dark group-hover:fill-white " />
                  </button>
                </Tabs.List>
                <div className="flex-grow relative">
                  {data.tabs.map((tab, i) => {
                    const TabContent = searchTabs[i]
                    return (
                      <Tabs.Content value={`tab-${i}`} className="h-full">
                        <TabContent data={tab} />
                      </Tabs.Content>
                    )
                  })}
                  {data.footer && (
                    <Footer>
                      <h1 className="text-base font-semibold">
                        {data.footer.title}
                      </h1>
                      <p className="text-gray-500 text-sm">
                        {data.footer.description}
                      </p>
                    </Footer>
                  )}
                </div>
              </Tabs.Root>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
