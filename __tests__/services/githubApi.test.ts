import { axiosClient } from '@/app/_lib/axiosClient'
import { fetchGitHubUser, fetchGitHubUserRepos, fetchGitHubUsers } from '@/app/_services/githubApi'

jest.mock('@/app/_lib/axiosClient')
const mockedAxios = jest.mocked(axiosClient)

// Mock unstable_cache
jest.mock('next/cache', () => ({
  unstable_cache: (fn: (...args: any[]) => any) => fn,
}))

describe('githubApi', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch users with search query', async () => {
    const mockUsers = [
      { id: 1, login: 'user1' },
      { id: 2, login: 'user2' },
    ]

    mockedAxios.get.mockResolvedValueOnce({
      data: {
        items: mockUsers,
      },
    })

    const result = await fetchGitHubUsers({ searchQuery: 'test' })

    expect(result).toEqual(mockUsers)
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
  })

  it('should fetch user details', async () => {
    const mockUser = {
      id: 1,
      login: 'user1',
      name: 'User One',
      avatar_url: 'https://example.com/avatar.jpg',
    }

    mockedAxios.get.mockResolvedValueOnce({
      data: mockUser,
    })

    const result = await fetchGitHubUser('user1')

    expect(result).toEqual(mockUser)
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
  })

  it('should fetch user repositories', async () => {
    const mockRepos = [
      { id: 1, name: 'repo1' },
      { id: 2, name: 'repo2' },
    ]

    mockedAxios.get.mockResolvedValueOnce({
      data: mockRepos,
    })

    const result = await fetchGitHubUserRepos({ id: 'user1', page: 1 })

    expect(result).toEqual(mockRepos)
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
  })
})
