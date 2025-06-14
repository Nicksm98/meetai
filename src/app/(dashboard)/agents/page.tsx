import { Suspense } from 'react'
import { getQueryClient, trpc } from '@/trpc/server'
import { AgentsView, AgentsViewLoading } from '@/modules/agents/ui/views/agents-view'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

const Page = async () => {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentsViewLoading />}>
        <AgentsView />
      </Suspense>
    </HydrationBoundary>
  )
}

export default Page
