import { axiosClient } from '@/app/_lib/axiosClient'
import { API_PATHS } from '@/app/_lib/constants'
import { DetailedUser, RepositoriesPage, UsersPage } from '@/app/_models/types'

export async function fetchUsersInfinite({
  pageParam,
  searchQuery,
}: {
  pageParam: number
  searchQuery?: string
}): Promise<UsersPage> {
  const url = API_PATHS.USERS({
    since: pageParam,
    searchQuery,
  })
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

export async function fetchUserRepositories({
  username,
  pageParam,
}: {
  username: string
  pageParam: number
}): Promise<RepositoriesPage> {
  const url = API_PATHS.USER_REPOS({ username, page: pageParam })
  const response = await axiosClient.get(url)

  const { repositories, nextCursor } = response.data

  return {
    repositories,
    nextCursor: nextCursor ?? null,
  }
}
