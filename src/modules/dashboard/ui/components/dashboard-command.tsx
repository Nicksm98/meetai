import { CommandItem, CommandList } from "cmdk";
import { Dispatch, SetStateAction } from "react";
import { CommandDialog, CommandInput } from "@/components/ui/command";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

export const DashboardCommand = ({ open, setOpen }: Props) => {
    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput 
                placeholder="Find a meeting or an Agent"
            />
            <CommandList>
                <CommandItem>
                    TEST
                </CommandItem>
            </CommandList>
        </CommandDialog>
    )
}