'use client'

import { useTRPC } from '@/trpc/client'

import { useSuspenseQuery } from '@tanstack/react-query'

import { columns } from '../components/columns'
import { DataTable } from '../components/data-table'
import { ErrorState } from '@/components/error-state'
import { EmptyState } from '@/components/empty-state'
import { LoadingState } from '@/components/loading-state'
import { DataPagination } from '../components/data-pagination'

import { useAgentsFilters } from '../../hooks/use-agents-filters'


export const AgentsView = () => {
  const [filters, setFilters] = useAgentsFilters();

  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({}))

  return (
    <div className='flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4'>
      <DataTable data={data.items} columns={columns} />
      <DataPagination 
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first Agent"
          description="Crteate an agent to join your meetings. Each one will follow your instructions and can interact with particpants during the call."
        />
      )}
    </div>
  )
}

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title='Loading Agents'
      description='This may take a few seconds'
    />
  )
}

export const AgentsViewError = () => {
  return (
    <ErrorState
      title='Failed to Load Agents'
      description='Please Try Again Later'
    />
  )
}
