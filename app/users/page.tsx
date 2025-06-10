import { QUERY_KEYS } from '@/app/_lib/constants'
import UsersView from '@/app/_views/users/UsersView'

import { Suspense } from 'react'

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

import Spinner from '../_components/Spinner/Spinner'
import { fetchUsersInfinite } from '../_services/apiService'

const UsersPage = async ({ searchParams }: { searchParams: Promise<{ q: string }> }) => {
  const queryClient = new QueryClient()
  const searchQuery = (await searchParams).q || ''

  await queryClient.prefetchInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_USERS_INFINITE, searchQuery || ''],
    queryFn: ({ pageParam = searchQuery ? 1 : 0 }) =>
      fetchUsersInfinite({ pageParam, searchQuery }),
    initialPageParam: searchQuery ? 1 : 0,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Spinner />}>
        <UsersView />
      </Suspense>
    </HydrationBoundary>
  )
}

export default UsersPage
