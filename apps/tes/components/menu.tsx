import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import Link from "next/link"

function ItemLink({ href, children }: React.PropsWithChildren<{ href: string }>) {
  return (
    <Link legacyBehavior href={href}>
      <a className="block py-1 hover:text-brand-green-dark">{children}</a>
    </Link>
  )
}

export default function Menu({ flip }: { flip?: boolean }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className={`bg-white focus:outline-none px-3 py-3 rounded-md text-xs text-brand-green-dark font-semibold uppercase flex items-center ${
          flip ? "" : "ring-1 ring-brand-green hover:ring-brand-green-dark"
        }`}
      >
        Menu
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 ml-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        sideOffset={10}
        className="py-4 pl-6 pr-8 bg-white rounded-md ring-1 ring-gray-200"
      >
        <DropdownMenu.Item asChild>
          <ItemLink href="/">Home</ItemLink>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
