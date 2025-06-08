import UsersView from '@/app/_views/users/UsersView'

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

import { QUERY_KEYS } from '../_lib/queryKeys'
import { fetchUsers } from '../_services/apiService'

const UsersPage = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.GET_USERS,
    queryFn: () => fetchUsers(),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UsersView />
    </HydrationBoundary>
  )
}

export default UsersPage
