import { axiosClient } from '@/app/_lib/axiosClient'
import { GET } from '@/app/api/users/route'

import { NextRequest } from 'next/server'

import { AxiosError } from 'axios'

// Mock axios client
jest.mock('@/app/_lib/axiosClient', () => ({
  axiosClient: {
    get: jest.fn(),
  },
}))

const mockedAxiosClient = axiosClient as jest.Mocked<typeof axiosClient>

describe('/api/users route', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Success cases', () => {
    it('should return all users when no username is provided', async () => {
      // Arrange
      const mockUsers = [
        { id: 1, login: 'user1', avatar_url: 'https://example.com/avatar1.jpg' },
        { id: 2, login: 'user2', avatar_url: 'https://example.com/avatar2.jpg' },
      ]

      mockedAxiosClient.get.mockResolvedValue({ data: mockUsers })

      const request = new NextRequest('http://localhost:3000/api/users')

      // Act
      const response = await GET(request)
      const data = await response.json()

      // Assert
      expect(response.status).toBe(200)
      expect(data).toEqual(mockUsers)
      expect(mockedAxiosClient.get).toHaveBeenCalledWith('https://api.github.com/users')
    })

    it('should search users when username is provided', async () => {
      // Arrange
      const username = 'testuser'
      const mockSearchResult = {
        total_count: 1,
        items: [{ id: 1, login: 'testuser', avatar_url: 'https://example.com/avatar.jpg' }],
      }

      mockedAxiosClient.get.mockResolvedValue({ data: mockSearchResult })

      const request = new NextRequest(`http://localhost:3000/api/users?q=${username}`)

      // Act
      const response = await GET(request)
      const data = await response.json()

      // Assert
      expect(response.status).toBe(200)
      expect(data).toEqual(mockSearchResult)
      expect(mockedAxiosClient.get).toHaveBeenCalledWith(
        `https://api.github.com/search/users?q=${username}`
      )
    })
  })

  describe('Error handling', () => {
    it('should return 404 error when user not found', async () => {
      // Arrange
      const axiosError = new AxiosError('Not Found')
      axiosError.response = { status: 404 } as any

      mockedAxiosClient.get.mockRejectedValue(axiosError)

      const request = new NextRequest('http://localhost:3000/api/users?q=nonexistentuser')

      // Act
      const response = await GET(request)
      const data = await response.json()

      // Assert
      expect(response.status).toBe(404)
      expect(data).toEqual({ error: 'User not found' })
    })

    it('should return 429 error when API rate limit is exceeded', async () => {
      // Arrange
      const axiosError = new AxiosError('Rate limit exceeded')
      axiosError.response = { status: 403 } as any

      mockedAxiosClient.get.mockRejectedValue(axiosError)

      const request = new NextRequest('http://localhost:3000/api/users?q=testuser')

      // Act
      const response = await GET(request)
      const data = await response.json()

      // Assert
      expect(response.status).toBe(429)
      expect(data).toEqual({ error: 'API rate limit exceeded' })
    })

    it('should return 500 error for generic errors', async () => {
      // Arrange
      const genericError = new Error('Generic error')

      mockedAxiosClient.get.mockRejectedValue(genericError)

      const request = new NextRequest('http://localhost:3000/api/users?q=testuser')

      // Act
      const response = await GET(request)
      const data = await response.json()

      // Assert
      expect(response.status).toBe(500)
      expect(data).toEqual({ error: 'Internal server error' })
    })
  })
})
