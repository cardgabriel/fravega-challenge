import { UrlBuildParams } from '@/app/_models/types'

import { buildUrlWithParams } from './paginationUtils'

export const RESULTS_PER_PAGE = 40

export const QUERY_KEYS = {
  GET_USERS_INFINITE: 'get-users-infinite',
  GET_USER: 'get-user',
  GET_USER_REPOS: 'get-user-repos',
}

export const API_PATHS = {
  USERS: (urlParams?: Pick<UrlBuildParams, 'searchQuery' | 'since' | 'page'>) => {
    return buildUrlWithParams('/api/users', {
      searchQuery: urlParams?.searchQuery,
      since: urlParams?.since,
    })
  },
  USER_BY_ID: (id: string) => `/api/user/${id}`,
  USER_REPOS: (username: string, urlParams?: Pick<UrlBuildParams, 'page'>) => {
    return buildUrlWithParams(`/api/user/${username}/repos`, {
      page: urlParams?.page,
    })
  },
}

export const GITHUB_PATHS = {
  GET_ALL_USERS: ({ since }: { since?: number }) => {
    return buildUrlWithParams('https://api.github.com/users', {
      since,
    })
  },
  SEARCH_USERS: ({ searchQuery, page }: { searchQuery: string; page: number }) =>
    buildUrlWithParams('https://api.github.com/search/users', {
      searchQuery,
      page,
    }),
  GET_USER_BY_ID: (id: string) => `https://api.github.com/users/${id}`,
  GET_USER_REPOS: ({ id, page }: { id: string; page: number }) => {
    return buildUrlWithParams(`https://api.github.com/users/${id}/repos`, {
      page,
    })
  },
}
