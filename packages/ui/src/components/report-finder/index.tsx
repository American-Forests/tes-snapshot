import { Dispatch, SetStateAction } from "react"
import { XMarkIcon } from "@heroicons/react/24/solid"

import { ReportLink } from "./components/report-link"
import Help from "./components/help"

import type { ReportFinderData } from "./types"

export const ReportFinderOld = ({
  className,
  setOpen,
  data,
}: {
  className: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  data: ReportFinderData
}) => {
  return (
    <div className={className}>
      <div className="bg-white rounded-md min-w-[220px] h-full p-2 flex flex-col shadow-lg items-center">
        {/** reports and close button */}
        <div className="flex flex-row justify-between mb-2 items-center w-full">
          <p className="text-lg text-brand-green-dark font-semibold pl-2">
            {data.header.placeholder}
          </p>
          <Help className="-ml-8">
            <p>
              {data.header.intro}
              <br />
              <br />
              {data.header.title}
              {data.header.description}
            </p>
          </Help>
          <a
            className="text-gray-400 hover:text-black"
            onClick={() => setOpen(false)}
          >
            <XMarkIcon className="-mt-3 w-4 h-4 fill-brand-green-dark hover:fill-brand-green" />
          </a>
        </div>
        {/** no block group selected */}
        {!data.neigborhoodLike && (
          <p className="text-sm text-gray-700 w-[200px] mb-4 pl-2">
            {data.header.noSelection}
          </p>
        )}
        {/** report selection */}
        {data.neigborhoodLike && (
          <div className="flex flex-col mb-4 px-2">
            <p className="text-sm font-semibold text-gray-700 pb-2 pt-1">
              From map selection:
            </p>
            {data.header?.reportOptions?.map((option) => {
              return (
                <>
                  <p className="text-gray-500">{option.type}</p>
                  <ReportLink href={option.href}>{option.name}</ReportLink>
                </>
              )
            })}
            {/*
              HIDE FOR NOW
              <p className="text-xs font-semibold text-gray-700 pt-1 mt-4 border-t hidden lg:block">
              Looking for somewhere else?
            </p>
            */}
          </div>
        )}

        {/** search button & modal */}
        {/*
          HIDE FOR NOW
          <div className="pb-2 -mt-2 hidden lg:block">
          <ReportSearchModal data={data} />
        </div> */}
      </div>
    </div>
  )
}
