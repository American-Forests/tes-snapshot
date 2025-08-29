// @ts-nocheck
import Link from "next/link"
import type { RouteUrlObject } from "blitz"
import * as React from "react"

import { ChartBarSquareIcon } from "@heroicons/react/24/outline"

export function ReportLink({
  href,
  children,
  className,
}: {
  href: RouteUrlObject
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`flex flex-row items-center ${className ? className : ""}`}>
      <ChartBarSquareIcon className="w-4 h-4 mr-2 -mt-1 stroke-gray-400" />
      <Link legacyBehavior href={href}>
        <a className="text-sm text-brand-green-dark hover:text-brand-green pr-2 pb-1">
          {children}
        </a>
      </Link>
    </div>
  )
}
