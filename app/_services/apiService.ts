import { axiosClient } from '@/app/_lib/axiosClient'
import { API_PATHS } from '@/app/_lib/constants'
import { DetailedUser, RepositoriesPage, UrlBuildParams, UsersPage } from '@/app/_models/types'

export async function fetchUsersInfinite(
  pageParam: number = 0,
  searchQuery?: string
): Promise<UsersPage> {
  const urlParams: UrlBuildParams = {
    since: pageParam,
    searchQuery,
  }

  const url = API_PATHS.USERS(urlParams)
  const response = await axiosClient.get(url)

  const { users, nextCursor } = response.data

  return {
    users,
    nextCursor: nextCursor ?? null,
  }
}

export async function fetchUserById(id: string): Promise<DetailedUser> {
  const url = API_PATHS.USER_BY_ID(id)
  const response = await axiosClient.get(url)
  return response.data
}

export async function fetchUserRepositories(
  username: string,
  pageParam: number = 1
): Promise<RepositoriesPage> {
  const urlParams: UrlBuildParams = {
    page: pageParam,
  }

  const url = API_PATHS.USER_REPOS(username, urlParams)
  const response = await axiosClient.get(url)

  const { repositories, nextCursor } = response.data

  return {
    repositories,
    nextCursor: nextCursor ?? null,
  }
}
