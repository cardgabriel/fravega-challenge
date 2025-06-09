import { axiosClient } from '@/app/_lib/axiosClient'
import { GITHUB_PATHS } from '@/app/_lib/constants'

import { unstable_cache } from 'next/cache'

export const fetchGitHubUsers = unstable_cache(
  async ({ since, searchQuery }: { since?: number; searchQuery?: string }) => {
    const url = searchQuery
      ? GITHUB_PATHS.SEARCH_USERS({ searchQuery, page: since ?? 1 })
      : GITHUB_PATHS.GET_ALL_USERS({ since })

    const response = await axiosClient.get(url)
    return searchQuery ? response.data.items : response.data
  },
  ['users'],
  {
    revalidate: 3600,
    tags: ['user-repos'],
  }
)

export const fetchGitHubUser = unstable_cache(
  async (id: string) => {
    const response = await axiosClient.get(GITHUB_PATHS.GET_USER_BY_ID(id))
    return response.data
  },
  ['user'],
  {
    revalidate: 3600,
    tags: ['user'],
  }
)

export const fetchGitHubUserRepos = unstable_cache(
  async ({ id, page }: { id: string; page: number }) => {
    const response = await axiosClient.get(GITHUB_PATHS.GET_USER_REPOS({ id, page }))
    return response.data
  },
  ['user-repos'],
  {
    revalidate: 3600,
    tags: ['user-repos'],
  }
)
