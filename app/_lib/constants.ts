import { buildUrlWithParams } from './paginationUtils'

export const RESULTS_PER_PAGE = 40

export const QUERY_KEYS = {
  GET_USERS_INFINITE: 'get-users-infinite',
  GET_USER: 'get-user',
  GET_USER_REPOS: 'get-user-repos',
}

export const CLIENT_PATHS = {
  USERS: '/users',
  FAVORITES: '/favorites',
  USER_DETAILS: (username: string) => `/user/${username}`,
}

const BASE_API_PATH = '/api'
const BASE_GITHUB_API_URL = 'https://api.github.com'

export const API_PATHS = {
  USER_BY_ID: (id: string) => `${BASE_API_PATH}/user/${id}`,
  USERS: ({ searchQuery, since }: { searchQuery?: string; since?: number }) => {
    return buildUrlWithParams(`${BASE_API_PATH}/users`, {
      searchQuery,
      since,
    })
  },
  USER_REPOS: ({ username, page }: { username: string; page?: number }) => {
    return buildUrlWithParams(`${BASE_API_PATH}/user/${username}/repos`, {
      page,
    })
  },
}

export const GITHUB_PATHS = {
  GET_USER_BY_ID: (id: string) => `${BASE_GITHUB_API_URL}/users/${id}`,
  GET_ALL_USERS: ({ since }: { since?: number }) => {
    return buildUrlWithParams(`${BASE_GITHUB_API_URL}/users`, {
      since,
    })
  },
  SEARCH_USERS: ({ searchQuery, page }: { searchQuery: string; page: number }) =>
    buildUrlWithParams(`${BASE_GITHUB_API_URL}/search/users`, {
      searchQuery,
      page,
    }),
  GET_USER_REPOS: ({ id, page }: { id: string; page: number }) => {
    return buildUrlWithParams(`${BASE_GITHUB_API_URL}/users/${id}/repos`, {
      page,
    })
  },
}
