import { PaginationParams } from '@/app/_models/types'

import { buildUrlWithPagination } from './paginationUtils'

export const GITHUB_PATHS = {
  GET_ALL_USERS: (pagination?: PaginationParams) => {
    return buildUrlWithPagination('https://api.github.com/users', pagination)
  },
  SEARCH_USERS: (username: string) =>
    username ? `https://api.github.com/search/users?q=${username}` : '',
  GET_USER_BY_ID: (id: string) => `https://api.github.com/users/${id}`,
  GET_USER_REPOS: (id: string, pagination?: PaginationParams) => {
    return buildUrlWithPagination(`https://api.github.com/users/${id}/repos`, pagination)
  },
}
