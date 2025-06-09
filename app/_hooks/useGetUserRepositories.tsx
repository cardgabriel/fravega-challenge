import { QUERY_KEYS } from '@/app/_lib/constants'
import { Repository } from '@/app/_models/types'
import { fetchUserRepositories } from '@/app/_services/apiService'

import { useEffect } from 'react'

import { useInfiniteQuery } from '@tanstack/react-query'

import { useIntersectionObserver } from './useIntersectionObserver'

interface RepositoriesPage {
  repositories: Repository[]
  nextCursor: number | null
}

export const useGetUserRepositories = (username: string) => {
  const { ref, inView } = useIntersectionObserver()

  const { data, isLoading, error, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [QUERY_KEYS.GET_USER_REPOS, username],
      queryFn: ({ pageParam = 1 }) => fetchUserRepositories({ username, pageParam }),
      getNextPageParam: (lastPage: RepositoriesPage) => lastPage.nextCursor,
      initialPageParam: 1,
    })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const repositories = data?.pages.flatMap((page: RepositoriesPage) => page.repositories) ?? []

  return {
    repositories,
    isLoading,
    error,
    isError,
    isFetchingNextPage,
    hasNextPage,
    triggerRef: ref,
  }
}
