import Spinner from '@/app/_components/Spinner/Spinner'
import { QUERY_KEYS } from '@/app/_lib/constants'
import { fetchUserById, fetchUserRepositories } from '@/app/_services/apiService'
import { UserView } from '@/app/_views/user/UserView'

import { Suspense } from 'react'

import { type Metadata } from 'next'

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>
}): Promise<Metadata> {
  const { username } = await params
  try {
    const user = await fetchUserById(username)
    return {
      title: `${user.name || user.username}'s Profile`,
      description: `Explore the profile and repositories of ${user.name || user.username}.`,
    }
  } catch {
    return {
      title: 'User Not Found',
      description: 'The profile for this user could not be loaded.',
    }
  }
}

interface UserPageProps {
  params: Promise<{
    username: string
  }>
}

const UserPage = async ({ params }: UserPageProps) => {
  const { username } = await params
  const queryClient = new QueryClient()

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.GET_USER, username],
      queryFn: () => fetchUserById(username),
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: [QUERY_KEYS.GET_USER_REPOS, username],
      queryFn: ({ pageParam = 1 }) => fetchUserRepositories({ username, pageParam }),
      initialPageParam: 1,
    }),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Spinner />}>
        <UserView username={username} />
      </Suspense>
    </HydrationBoundary>
  )
}

export default UserPage
