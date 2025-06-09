import { QUERY_KEYS } from '@/app/_lib/constants'
import { DetailedUser } from '@/app/_models/types'
import { fetchUserById } from '@/app/_services/apiService'

import { useQuery } from '@tanstack/react-query'

interface UseGetUserReturn {
  user: DetailedUser | undefined
  isLoading: boolean
  isError: boolean
}

export const useGetUser = (userId: string): UseGetUserReturn => {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<DetailedUser>({
    queryKey: [QUERY_KEYS.GET_USER, userId],
    queryFn: () => fetchUserById(userId),
    enabled: !!userId,
  })

  return {
    user,
    isLoading,
    isError,
  }
}
