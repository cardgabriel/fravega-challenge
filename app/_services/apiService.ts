import { axiosClient } from '@/app/_lib/axiosClient'
import { API_PATHS } from '@/app/_lib/paths'
import { DetailedUser, Repository, UrlBuildParams, User } from '@/app/_models/types'

export interface UsersPage {
  users: User[]
  nextCursor?: number
}

export async function fetchUsers(username?: string, urlParams?: UrlBuildParams): Promise<User[]> {
  const url = API_PATHS.USERS(urlParams)
  const response = await axiosClient.get(url)
  return response.data
}

export async function fetchUsersInfinite(pageParam: number = 0): Promise<UsersPage> {
  const urlParams: UrlBuildParams = {
    since: pageParam,
  }

  const url = API_PATHS.USERS(urlParams)
  const response = await axiosClient.get(url)

  // Extract users and nextCursor from the API response
  const { users, nextCursor } = response.data

  return {
    users,
    nextCursor,
  }
}

export async function fetchUserById(id: string): Promise<DetailedUser> {
  const url = API_PATHS.USER_BY_ID(id)
  const response = await axiosClient.get(url)
  return response.data
}

export async function fetchUserRepositories(id: string): Promise<Repository[]> {
  // GitHub API always returns 40 results per page by default
  const url = API_PATHS.USER_REPOS(id)
  const response = await axiosClient.get(url)
  return response.data
}
