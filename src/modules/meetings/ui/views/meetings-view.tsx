'use client'

import { useTRPC } from '@/trpc/client'
import { useRouter } from 'next/router'
import { useSuspenseQuery } from '@tanstack/react-query'

import { DataTable } from '@/components/data-table'
import { EmptyState } from '@/components/empty-state'
import { ErrorState } from '@/components/error-state'
import { LoadingState } from '@/components/loading-state'
import { DataPagination } from '@/components/data-pagination'

import { columns } from '../components/columns'
import { useMeetingsFilters } from '../../hooks/use-meetings-filters'

export const MeetingsView = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const [filters, setFilters] = useMeetingsFilters();

  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({
    ...filters,
  }));

  return (
    <div className='flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4'>
      <DataTable
        data={data.items}
        columns={columns}
        onRowClick={(row) => router.push(`/meetings/${row.id}`)}
      />
      <DataPagination 
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title='Create your first Meeting'
          description='Create a meeting for you and your agents.'
        />
      )}
    </div>
  )
}

export const MeetingsViewLoading = () => {
  return (
    <LoadingState
      title='Loading Meetings'
      description='This may take a few seconds'
    />
  )
}

export const MeetingsViewError = () => {
  return (
    <ErrorState
      title='Failed to Load Meetings'
      description='Please Try Again Later'
    />
  )
}
