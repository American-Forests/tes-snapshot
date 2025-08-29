'use client'
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

type NavItem = {
  name: string
  link: any
}
export function NavMenu({
  items,
  LinkComponent,
  open,
  setOpen,
}: {
  items: NavItem[]
  LinkComponent: any
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <div className="shadow cursor-pointer px-3 py-1 lg:px-5 lg:py-2 text-xs lg:text-sm font-semibold uppercase flex items-center gap-x-1 text-brand-green-dark hover:text-brand-green-darker transition-all rounded-full bg-white">
          Menu
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="z-10 pr-4" align="start">
        <div className="shadow-lg bg-white rounded mt-2 py-2 text-left">
          {items.map((item) => (
            <DropdownMenu.Item key={item.name} className="ring-transparent">
              <LinkComponent href={item.link}>
                <a>
                  <p className="text-brand-green-dark text-base font-medium py-2 pl-4 pr-16 hover:underline underline-offset-8 decoration-4 decoration-[#006554]">
                    {item.name}
                  </p>
                </a>
              </LinkComponent>
            </DropdownMenu.Item>
          ))}
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
