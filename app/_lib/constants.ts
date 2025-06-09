import { buildUrlWithParams } from './paginationUtils'

export const RESULTS_PER_PAGE = 40

export const QUERY_KEYS = {
  GET_USERS_INFINITE: 'get-users-infinite',
  GET_USER: 'get-user',
  GET_USER_REPOS: 'get-user-repos',
}

export const API_PATHS = {
  USER_BY_ID: (id: string) => `/api/user/${id}`,
  USERS: ({ searchQuery, since }: { searchQuery?: string; since?: number }) => {
    return buildUrlWithParams('/api/users', {
      searchQuery,
      since,
    })
  },
  USER_REPOS: ({ username, page }: { username: string; page?: number }) => {
    return buildUrlWithParams(`/api/user/${username}/repos`, {
      page,
    })
  },
}

export const GITHUB_PATHS = {
  GET_USER_BY_ID: (id: string) => `https://api.github.com/users/${id}`,
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
  GET_USER_REPOS: ({ id, page }: { id: string; page: number }) => {
    return buildUrlWithParams(`https://api.github.com/users/${id}/repos`, {
      page,
    })
  },
}
