import { ReportLinkProps } from "ui"
import { twMerge } from "tailwind-merge"
import Link from "next/link"
import { ChartBarSquareIcon } from "@heroicons/react/24/outline"

export const ReportLink = ({ href, children, className }: ReportLinkProps) => {
  return (
    <div className={twMerge("flex flex-row items-center", className)}>
        <ChartBarSquareIcon className="w-5 h-5 mr-2 stroke-gray-400" />
        <Link legacyBehavior href={href}>
          <a className="text-brand-green-dark hover:text-brand-green text-sm">{children}</a>
      </Link>
    </div>
  )
}
