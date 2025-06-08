import { PaginationParams } from '@/app/_models/types'

/**
 * Extracts and processes pagination parameters from URL search params
 * @param searchParams - URL search parameters
 * @param defaultPerPage - Default value for per_page parameter (default: 40)
 * @returns Clean pagination object with only defined values
 */
export function extractPaginationParams(
  searchParams: URLSearchParams,
  defaultPerPage: number = 40
): PaginationParams | undefined {
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
  ) as PaginationParams

  // Return undefined if no pagination params were provided
  return Object.keys(cleanPagination).length > 0 ? cleanPagination : undefined
}

/**
 * Helper function to build URL with pagination params
 * @param baseUrl - The base URL to append pagination params to
 * @param pagination - Optional pagination parameters
 * @returns URL with pagination parameters if provided
 */
export const buildUrlWithPagination = (baseUrl: string, pagination?: PaginationParams): string => {
  if (!pagination) return baseUrl

  const params = new URLSearchParams()
  if (pagination.since) params.append('since', pagination.since.toString())
  if (pagination.per_page) params.append('per_page', pagination.per_page.toString())

  return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl
}
