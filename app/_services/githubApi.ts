import { axiosClient } from '@/app/_lib/axiosClient'
import { GITHUB_PATHS } from '@/app/_lib/paths'
import { PaginationParams } from '@/app/_models/types'

export async function fetchGitHubUsers(username?: string, pagination?: PaginationParams) {
  const url = username
    ? GITHUB_PATHS.SEARCH_USERS(username)
    : GITHUB_PATHS.GET_ALL_USERS(pagination)
  const response = await axiosClient.get(url)
  return username ? response.data.items : response.data
}

export async function fetchGitHubUser(id: string) {
  const response = await axiosClient.get(GITHUB_PATHS.GET_USER_BY_ID(id))
  return response.data
}

export async function fetchGitHubUserRepos(id: string, pagination?: PaginationParams) {
  const response = await axiosClient.get(GITHUB_PATHS.GET_USER_REPOS(id, pagination))
  return response.data
}
