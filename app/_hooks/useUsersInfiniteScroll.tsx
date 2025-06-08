import { QUERY_KEYS } from '@/app/_lib/queryKeys'
import { UsersPage, fetchUsersInfinite } from '@/app/_services/apiService'

import { useEffect } from 'react'

import { useInfiniteQuery } from '@tanstack/react-query'

import { useIntersectionObserver } from './useIntersectionObserver'

export const useUsersInfiniteScroll = () => {
  const { ref, inView } = useIntersectionObserver()

  const { data, isLoading, error, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: QUERY_KEYS.GET_USERS_INFINITE,
      queryFn: ({ pageParam = 0 }) => fetchUsersInfinite(pageParam),
      getNextPageParam: (lastPage: UsersPage) => {
        return lastPage.nextCursor
      },
      initialPageParam: 0,
    })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const users = data?.pages.flatMap((page: UsersPage) => page.users) ?? []

  return {
    users,
    isLoading,
    error,
    isError,
    isFetchingNextPage,
    hasNextPage,
    triggerRef: ref,
  }
}
