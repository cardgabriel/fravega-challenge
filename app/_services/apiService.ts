import { axiosClient } from '@/app/_lib/axiosClient'
import { API_PATHS } from '@/app/_lib/paths'
import { DetailedUser, Repository, UrlBuildParams, User } from '@/app/_models/types'

export async function fetchUsers(username?: string, urlParams?: UrlBuildParams): Promise<User[]> {
  const url = API_PATHS.USERS(urlParams)
  const response = await axiosClient.get(url)
  return response.data
}

export async function fetchUserById(id: string): Promise<DetailedUser> {
  const response = await axiosClient.get(API_PATHS.USER_BY_ID(id))
  return response.data
}

export async function fetchUserRepositories(
  id: string,
  urlParams?: UrlBuildParams
): Promise<Repository[]> {
  const url = API_PATHS.USER_REPOS(id, urlParams)
  const response = await axiosClient.get(url)
  return response.data
}
