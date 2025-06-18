"use client"

import { useState } from "react"
import { PlusIcon, XCircleIcon } from "lucide-react"

import { DEFAULT_PAGE } from "@/constants"
import { Button } from "@/components/ui/button"

import { NewMeetingDialog } from "./new-meeting-dialog"
import { MeetingsSearchFilter } from "./meetings-search-filter"
import { useMeetingsFilters } from "../../hooks/use-meetings-filters"

export const MeetingsListHeader = () => {
  const [filters, setFilters] = useMeetingsFilters()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const isAnyFilterModified = !!filters.search;

  const onClearFilters = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    })
  }

  return (
    <>
      <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Meetings</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            New Meeting
          </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">
          <MeetingsSearchFilter />
          {isAnyFilterModified && (
            <Button variant="outline" size="sm" onClick={onClearFilters} >
              <XCircleIcon/>
              Clear
            </Button>
          )}
        </div>
      </div>
    </>
  )
}
