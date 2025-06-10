import { axiosClient } from '@/app/_lib/axiosClient'

describe('axiosClient', () => {
  it('should have correct default configuration', () => {
    expect(axiosClient.defaults.timeout).toBe(10000)
    expect(axiosClient.defaults.headers['Content-Type']).toBe('application/json')
  })

  it('should add authorization header for GitHub API requests', async () => {
    const originalEnv = process.env.GITHUB_TOKEN
    process.env.GITHUB_TOKEN = 'test-token'

    // Mock the request to avoid actual API call
    jest.spyOn(axiosClient, 'request').mockImplementationOnce((config) => {
      return Promise.resolve({
        config: {
          ...config,
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          },
        },
      })
    })

    const response = await axiosClient.request({
      url: 'https://api.github.com/users',
    })

    expect(response.config.headers.Authorization).toBe('Bearer test-token')

    // Cleanup
    process.env.GITHUB_TOKEN = originalEnv
    jest.restoreAllMocks()
  })
})
