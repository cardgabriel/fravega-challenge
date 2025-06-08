import { axiosClient } from '@/app/_lib/axiosClient'
import { GITHUB_PATHS } from '@/app/_lib/paths'
import { UrlBuildParams } from '@/app/_models/types'

export async function fetchGitHubUsers(username?: string, urlParams?: UrlBuildParams) {
  const url = username
    ? GITHUB_PATHS.SEARCH_USERS(username, urlParams)
    : GITHUB_PATHS.GET_ALL_USERS(urlParams)
  const response = await axiosClient.get(url)
  return username ? response.data.items : response.data
}

export async function fetchGitHubUser(id: string) {
  const response = await axiosClient.get(GITHUB_PATHS.GET_USER_BY_ID(id))
  return response.data
}

export async function fetchGitHubUserRepos(id: string, urlParams?: UrlBuildParams) {
  const response = await axiosClient.get(GITHUB_PATHS.GET_USER_REPOS(id, urlParams))
  return response.data
}
