import { Dispatch, SetStateAction } from 'react'

import {
  CommandResponsiveDialog,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const DashboardCommand = ({ open, setOpen }: Props) => {
  return (
    <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder='Find a meeting or an Agent' />
      <CommandList>
        <CommandItem>TEST</CommandItem>
      </CommandList>
    </CommandResponsiveDialog>
  )
}
