import { axiosClient } from '@/app/_lib/axiosClient'
import { GITHUB_PATHS } from '@/app/_lib/constants'

export async function fetchGitHubUsers({ since }: { since?: number }) {
  const url = GITHUB_PATHS.GET_ALL_USERS({ since })
  const response = await axiosClient.get(url)
  return response.data
}

export async function fetchGitHubUser(id: string) {
  const response = await axiosClient.get(GITHUB_PATHS.GET_USER_BY_ID(id))
  return response.data
}

export async function fetchGitHubUserRepos({ id, page }: { id: string; page: number }) {
  const response = await axiosClient.get(GITHUB_PATHS.GET_USER_REPOS({ id, page }))
  return response.data
}
