"use client"
import * as Dialog from "@radix-ui/react-dialog"
import { Dispatch, SetStateAction, useCallback, useState } from "react"
import { ChevronDownIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons"
import * as Tabs from "@radix-ui/react-tabs"
import { twMerge } from "tailwind-merge"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { Combobox, Transition } from "@headlessui/react"

type RootProps = {
  className: string
  children: React.ReactNode
}

const Root = ({ className, children }: RootProps) => {
  return (
    <div
      className={twMerge(
        className,
        "bg-white rounded-md min-w-[220px] h-fit flex flex-col shadow-2xl items-center"
      )}
      style={{ zIndex: 1000 }}
    >
      {children}
    </div>
  )
}

export type ReportOption = {
  name: string
  href: string
  type?: string
}

export type ReportLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
}

type ReportOptionsMenuProps = {
  reportOptions: ReportOption[]
  fallbackText?: string
  className?: string
  reportLinkClassName?: string
  ReportLink: React.ElementType<ReportLinkProps>
  hideOptionsCategory?: boolean
}

const ReportOptionsMenu = ({
  reportOptions,
  fallbackText,
  className,
  reportLinkClassName,
  ReportLink,
  hideOptionsCategory,
}: ReportOptionsMenuProps) => {
  const groupedOptions = reportOptions.reduce((acc, option) => {
    const type = option.type || "Other"
    if (!acc[type]) {
      acc[type] = []
    }
    acc[type]!.push(option)
    return acc
  }, {} as Record<string, ReportOption[]>)

  return (
    <div className={twMerge("flex flex-col w-full mb-4", className)}>
      {Object.entries(groupedOptions).map(([type, options], index) => (
        <div key={type} className={index > 0 ? "mt-3" : ""}>
          {type !== "Other" && !hideOptionsCategory && (
            <p className="text-gray-500 text-xs mb-1 uppercase">{type}</p>
          )}
          {options.map((option, i) => (
            <ReportLink
              href={option.href}
              key={i}
              className={reportLinkClassName}
            >
              {option.name}
            </ReportLink>
          ))}
        </div>
      ))}
      {reportOptions.length === 0 && (
        <p className="text-sm text-gray-700 w-[200px] mb-4 pl-2">
          {fallbackText ? fallbackText : "No available reports"}
        </p>
      )}
    </div>
  )
}

type SearchBarProps = {
  placeholder: string
  setQuery: Dispatch<SetStateAction<string>>
}

const SearchBar = ({ placeholder, setQuery }: SearchBarProps) => {
  return (
    <div className="flex flex-row rounded-full border border-gray-400 justify-between bg-gray-100 items-center px-2 w-[300px]">
      <input
        onChange={(event) => {
          setQuery(event.target.value)
        }}
        className="text-gray-800 block w-full text-md border-none focus:ring-0 rounded-full ring-0 bg-gray-100 p-2 focus:text-md"
        placeholder={placeholder}
      />
      <MagnifyingGlassIcon className="w-6 h-6 text-gray-600 pointer-events-none" />
    </div>
  )
}

export type FilterOption = {
  id: string
  displayValue: string
}

type FilterProps = {
  title: string
  selectedValue: FilterOption | null
  setSelectedValue: Dispatch<SetStateAction<FilterOption | null>>
  placeholder: string
  options: FilterOption[]
}

const Filter = ({
  title,
  selectedValue,
  setSelectedValue,
  placeholder,
  options,
}: FilterProps) => {
  const [query, setQuery] = useState("")

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
          return option.displayValue.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox value={selectedValue} onChange={setSelectedValue}>
      <div className="w-fit relative">
        <p className="text-gray-600 font-semibold text-xs">{title}</p>
        <div className="relative">
          <Combobox.Input
            className="w-[240px] rounded-md py-1.5 border-gray-400 text-sm focus:ring-0 focus:border-gray-400"
            onChange={(event) => {
              setQuery(event.target.value)
            }}
            displayValue={(option: FilterOption | null) =>
              option ? option.displayValue : ""
            }
            placeholder={placeholder}
          ></Combobox.Input>
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options>
            <div
              className={twMerge(
                "w-full h-fit max-h-[220px] overflow-auto rounded-md shadow-md border border-gray-300 absolute",
                title ? "top-[54px]" : "top-[40px]",
                "bg-white text-brand-green-dark text-sm -space-y-1"
              )}
            >
              {filteredOptions.map((option, i) => {
                return (
                  <Combobox.Option
                    value={option}
                    key={i}
                    className="p-2 hover:bg-gray-100"
                  >
                    {option.displayValue}
                  </Combobox.Option>
                )
              })}
            </div>
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  )
}

type ModalTabProps = {
  id: string
  children: React.ReactNode
}

const ModalTab = ({ id, children }: ModalTabProps) => {
  return (
    <Tabs.Content value={id} className="h-full">
      {children}
    </Tabs.Content>
  )
}

type ModalTabsProps = {
  tabs: { title: string; id: string }[]
  setOpen: Dispatch<SetStateAction<boolean>>
  children?: React.ReactNode
  handleClose: () => void
}

const ModalTabs = ({ tabs, handleClose, children }: ModalTabsProps) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]!.id!)

  return (
    <Tabs.Root
      value={selectedTab}
      onValueChange={setSelectedTab}
      defaultValue="tab-0"
      className="h-full flex flex-col"
    >
      <Tabs.List className="flex flex-row border-b">
        {tabs.map((tab, i) => (
          <Tabs.Trigger
            value={tab.id}
            className={twMerge(
              "flex-grow text-sm py-2 p-2 font-semibold border-r transition-colors duration-200",
              i === 0 ? "rounded-tl-lg" : "",
              selectedTab === tab.id
                ? "bg-white text-brand-green-dark"
                : "bg-gray-100 text-gray-500"
            )}
          >
            {tab.title}
          </Tabs.Trigger>
        ))}
        <button
          onClick={handleClose}
          className="group px-2 hover:bg-brand-green-dark rounded-tr-lg transition-colors duration-200"
        >
          <XMarkIcon className="w-4 h-4 mx-1 fill-brand-green-dark group-hover:fill-white" />
        </button>
      </Tabs.List>
      <div className="flex-grow relative overflow-hidden">{children}</div>
    </Tabs.Root>
  )
}

type ReportSearchModalProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  tabs: { title: string; id: string }[]
  children?: React.ReactNode
  onReportFinderClose: () => void
  triggerText?: string
}

const ReportSearchModal = ({
  open,
  setOpen,
  tabs,
  children,
  onReportFinderClose,
  triggerText,
}: ReportSearchModalProps) => {
  const handleClose = useCallback(() => {
    onReportFinderClose()
    setOpen(false)
  }, [setOpen])
  return (
    <Dialog.Root open={open} onOpenChange={setOpen} modal={true}>
      {/* We hide the trigger when the modal is open to prevent overlapping on small screens */}
      {!open && (
        <Dialog.Trigger className="relative">
          <MagnifyingGlassIcon className="w-4 h-4 absolute left-6 top-1.5 text-brand-green-dark pointer-events-none" />
          <button className="w-full text-xs hover:shadow py-1.5 pl-10 pr-8 bg-white rounded-full border border-brand-green text-brand-green-dark">
            {triggerText ? triggerText : "Search all reports"}
          </button>
        </Dialog.Trigger>
      )}

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-40 z-40" />
        <Dialog.Content
          onPointerDownOutside={handleClose}
          className="fixed top-[10%] left-[1rem] h-[calc(90%-2rem)] w-[calc(100%-2rem)] max-w-[calc(100%-2rem)] z-50 transform sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:h-[540px] sm:w-[650px] bg-white rounded-lg drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]"
        >
          <ModalTabs tabs={tabs} setOpen={setOpen} handleClose={handleClose}>
            {children ? children : null}
          </ModalTabs>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const TabFooter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute bottom-10 h-20 border-t py-4 px-10">
      {children}
    </div>
  )
}

export const ReportFinder = {
  Root,
  ReportOptionsMenu,
  ReportSearchModal,
  ModalTab,
  SearchBar,
  Filter,
  TabFooter,
}
