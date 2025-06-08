import { QUERY_KEYS } from '@/app/_lib/constants'
import UsersView from '@/app/_views/users/UsersView'

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

import { fetchUsersInfinite } from '../_services/apiService'

const UsersPage = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_USERS_INFINITE, ''],
    queryFn: ({ pageParam = 0 }) => fetchUsersInfinite(pageParam),
    initialPageParam: 0,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UsersView />
    </HydrationBoundary>
  )
}

export default UsersPage
