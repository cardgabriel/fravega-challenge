import { axiosClient } from '@/app/_lib/axiosClient'
import {
  fetchUserById,
  fetchUserRepositories,
  fetchUsersInfinite,
} from '@/app/_services/apiService'

jest.mock('@/app/_lib/axiosClient')
const mockedAxios = jest.mocked(axiosClient)

describe('apiService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch users with pagination', async () => {
    const mockUsers = [
      { id: 1, login: 'user1' },
      { id: 2, login: 'user2' },
    ]

    mockedAxios.get.mockResolvedValueOnce({
      data: {
        users: mockUsers,
        nextCursor: 2,
      },
    })

    const result = await fetchUsersInfinite({ pageParam: 0 })

    expect(result).toEqual({
      users: mockUsers,
      nextCursor: 2,
    })
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
  })

  it('should fetch user by id', async () => {
    const mockUser = {
      id: 1,
      login: 'user1',
      name: 'User One',
      avatar_url: 'https://example.com/avatar.jpg',
    }

    mockedAxios.get.mockResolvedValueOnce({
      data: mockUser,
    })

    const result = await fetchUserById('user1')

    expect(result).toEqual(mockUser)
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
  })

  it('should fetch user repositories with pagination', async () => {
    const mockRepos = [
      { id: 1, name: 'repo1' },
      { id: 2, name: 'repo2' },
    ]

    mockedAxios.get.mockResolvedValueOnce({
      data: {
        repositories: mockRepos,
        nextCursor: 2,
      },
    })

    const result = await fetchUserRepositories({ username: 'user1', pageParam: 1 })

    expect(result).toEqual({
      repositories: mockRepos,
      nextCursor: 2,
    })
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
  })
})
