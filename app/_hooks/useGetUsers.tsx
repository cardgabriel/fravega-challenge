import { QUERY_KEYS } from '@/app/_lib/constants'
import { fetchUsersInfinite } from '@/app/_services/apiService'

import { useEffect } from 'react'

import { useInfiniteQuery } from '@tanstack/react-query'

import { UsersPage } from '../_models/types'
import { useIntersectionObserver } from './useIntersectionObserver'

export const useGetUsers = (searchQuery?: string) => {
  const { ref, inView } = useIntersectionObserver()
  const { data, isLoading, error, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [QUERY_KEYS.GET_USERS_INFINITE, searchQuery || ''],
      queryFn: ({ pageParam = searchQuery ? 1 : 0 }) =>
        fetchUsersInfinite({ pageParam, searchQuery }),
      getNextPageParam: (lastPage: UsersPage) => {
        return lastPage.nextCursor
      },
      initialPageParam: searchQuery ? 1 : 0,
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
