import { RESULTS_PER_PAGE } from '@/app/_lib/constants'
import { UrlBuildParams } from '@/app/_models/types'

/**
 * Build URL with optional search and pagination parameters
 * per_page is always 40 for GitHub API consistency
 * @param baseUrl - Base URL
 * @param params - Optional object containing search and pagination parameters
 * @returns URL with query parameters if provided
 */
export function buildUrlWithParams(baseUrl: string, params?: UrlBuildParams): string {
  if (!params) {
    return `${baseUrl}?per_page=${RESULTS_PER_PAGE}`
  }

  const urlParams = new URLSearchParams()

  // Always add per_page first
  urlParams.append('per_page', RESULTS_PER_PAGE.toString())

  // Add search query if provided
  if (params.searchQuery) {
    urlParams.append('q', params.searchQuery)
  }

  // Add pagination parameters if provided
  if (params.since) {
    urlParams.append('since', params.since.toString())
  }

  if (params.page) {
    urlParams.append('page', params.page.toString())
  }

  return `${baseUrl}?${urlParams.toString()}`
}
