import { QUERY_KEYS } from '@/app/_lib/constants'
import { Repository } from '@/app/_models/types'
import { fetchUserRepositories } from '@/app/_services/apiService'

import { useQuery } from '@tanstack/react-query'

interface UseGetUserRepositoriesReturn {
  repositories: Repository[] | undefined
  isLoading: boolean
  error: Error | null
}

export const useGetUserRepositories = (userId: string): UseGetUserRepositoriesReturn => {
  const {
    data: repositories,
    isLoading,
    error,
  } = useQuery<Repository[]>({
    queryKey: [QUERY_KEYS.GET_USER_REPOS, userId],
    queryFn: () => fetchUserRepositories(userId),
    enabled: !!userId,
  })

  return {
    repositories,
    isLoading,
    error,
  }
}
