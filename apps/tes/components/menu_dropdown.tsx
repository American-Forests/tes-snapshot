import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { useMutation } from "@blitzjs/rpc"
import logout from "app/auth/mutations/logout"
import React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { StyledDropdownMenuContent, StyledDropdownMenuTrigger } from "./elements"

export function MenuDropdown() {
  const [open, setOpen] = React.useState(false)
  const [menuOpen, menuSetOpen] = React.useState(false)

  const [logoutMutation] = useMutation(logout)
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Root open={menuOpen} onOpenChange={menuSetOpen}>
        <StyledDropdownMenuTrigger>About</StyledDropdownMenuTrigger>
        <StyledDropdownMenuContent>
          <DropdownMenu.Item
            className="py-1 px-2 cursor-pointer"
            onSelect={() => {
              logoutMutation()
            }}
          >
            Logout
          </DropdownMenu.Item>
          <DropdownMenu.Arrow fill="white" />
        </StyledDropdownMenuContent>
      </DropdownMenu.Root>
    </Dialog.Root>
  )
}
