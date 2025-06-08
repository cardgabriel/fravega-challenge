import { UrlBuildParams } from '@/app/_models/types'

import { buildUrlWithParams } from './paginationUtils'

export const API_PATHS = {
  USERS: (urlParams?: UrlBuildParams) => {
    return buildUrlWithParams('/api/users', {
      searchQuery: urlParams?.searchQuery,
      since: urlParams?.since,
      per_page: urlParams?.per_page,
    })
  },
  USER_BY_ID: (id: string) => `/api/user/${id}`,
  USER_REPOS: (id: string, urlParams?: UrlBuildParams) => {
    return buildUrlWithParams(`/api/user/${id}/repos`, {
      since: urlParams?.since,
      per_page: urlParams?.per_page,
    })
  },
}

export const GITHUB_PATHS = {
  GET_ALL_USERS: (urlParams?: UrlBuildParams) => {
    return buildUrlWithParams('https://api.github.com/users', {
      since: urlParams?.since,
      per_page: urlParams?.per_page,
    })
  },
  SEARCH_USERS: (username: string, urlParams?: UrlBuildParams) =>
    buildUrlWithParams('https://api.github.com/search/users', {
      searchQuery: username,
      since: urlParams?.since,
      per_page: urlParams?.per_page,
    }),
  GET_USER_BY_ID: (id: string) => `https://api.github.com/users/${id}`,
  GET_USER_REPOS: (id: string, urlParams?: UrlBuildParams) => {
    return buildUrlWithParams(`https://api.github.com/users/${id}/repos`, {
      since: urlParams?.since,
      per_page: urlParams?.per_page,
    })
  },
}
