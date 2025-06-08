import { UrlBuildParams } from '@/app/_models/types'

/**
 * Extracts and processes pagination parameters from URL search params
 * @param searchParams - URL search parameters
 * @param defaultPerPage - Default value for per_page parameter (default: 40)
 * @returns Clean pagination object with only defined values
 */
export function extractPaginationParams(
  searchParams: URLSearchParams,
  defaultPerPage: number = 40
): UrlBuildParams | undefined {
  const since = searchParams.get('since')
  const per_page = searchParams.get('per_page')

  // Build pagination object with defaults
  const pagination = {
    since: since ? parseInt(since, 10) : undefined,
    per_page: per_page ? parseInt(per_page, 10) : defaultPerPage,
  }

  // Remove undefined values to keep the object clean
  const cleanPagination = Object.fromEntries(
    Object.entries(pagination).filter(([, value]) => value !== undefined)
  ) as UrlBuildParams

  // Return undefined if no pagination params were provided
  return Object.keys(cleanPagination).length > 0 ? cleanPagination : undefined
}

/**
 * Build URL with optional search and pagination parameters
 * @param baseUrl - Base URL
 * @param params - Optional object containing search and pagination parameters
 * @returns URL with query parameters if provided
 */
export function buildUrlWithParams(baseUrl: string, params?: UrlBuildParams): string {
  if (!params || (!params.searchQuery && !params.since && !params.per_page)) {
    return baseUrl
  }

  const urlParams = new URLSearchParams()

  // Add search query if provided
  if (params.searchQuery) {
    urlParams.append('q', params.searchQuery)
  }

  // Add pagination parameters if provided
  if (params.since) {
    urlParams.append('since', params.since.toString())
  }

  if (params.per_page) {
    urlParams.append('per_page', params.per_page.toString())
  }

  return urlParams.toString() ? `${baseUrl}?${urlParams.toString()}` : baseUrl
}
