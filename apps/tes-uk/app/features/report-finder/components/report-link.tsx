import Link from "next/link";
import { RouteUrlObject } from "blitz"
import { ChartBarSquareIcon } from "@heroicons/react/24/outline"

const ReportLink = ({ href, name, type }: { href: RouteUrlObject; name: string; type: string }) => {
  return (
    <div className="flex flex-col items-start">
      <p className="text-gray-500">{type}</p>
      <div className="flex flex-row items-center">
        <ChartBarSquareIcon className="w-4 h-4 mr-2 -mt-1 stroke-gray-400" />
        <Link legacyBehavior href={href}>
          <a className="text-sm text-brand-green-dark hover:text-brand-green pr-2 pb-1">{name}</a>
        </Link>
      </div>
    </div>
  )
}

export default ReportLink
