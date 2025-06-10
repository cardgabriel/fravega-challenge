import { RESULTS_PER_PAGE } from '@/app/_lib/constants'
import { buildUrlWithParams } from '@/app/_lib/paginationUtils'

describe('paginationUtils', () => {
  const baseUrl = 'https://api.example.com/users'

  it('should build URL with only per_page parameter when no params provided', () => {
    const url = buildUrlWithParams(baseUrl)
    expect(url).toBe(`${baseUrl}?per_page=${RESULTS_PER_PAGE}`)
  })

  it('should build URL with all provided parameters', () => {
    const url = buildUrlWithParams(baseUrl, {
      searchQuery: 'test',
      page: 2,
      since: 100,
    })
    expect(url).toBe(`${baseUrl}?per_page=${RESULTS_PER_PAGE}&q=test&since=100&page=2`)
  })
})
