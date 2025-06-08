import { UrlBuildParams } from '@/app/_models/types'

import { buildUrlWithParams } from './paginationUtils'

export const RESULTS_PER_PAGE = 40

export const QUERY_KEYS = {
  GET_USERS_INFINITE: 'get-users-infinite',
}

export const API_PATHS = {
  USERS: (urlParams?: UrlBuildParams) => {
    return buildUrlWithParams('/api/users', {
      searchQuery: urlParams?.searchQuery,
      since: urlParams?.since,
    })
  },
  USER_BY_ID: (id: string) => `/api/user/${id}`,
  USER_REPOS: (id: string) => {
    return buildUrlWithParams(`/api/user/${id}/repos`)
  },
}

export const GITHUB_PATHS = {
  GET_ALL_USERS: (urlParams?: UrlBuildParams) => {
    return buildUrlWithParams('https://api.github.com/users', {
      since: urlParams?.since,
    })
  },
  SEARCH_USERS: (username: string) =>
    buildUrlWithParams('https://api.github.com/search/users', {
      searchQuery: username,
    }),
  GET_USER_BY_ID: (id: string) => `https://api.github.com/users/${id}`,
  GET_USER_REPOS: (id: string) => {
    return buildUrlWithParams(`https://api.github.com/users/${id}/repos`)
  },
}
