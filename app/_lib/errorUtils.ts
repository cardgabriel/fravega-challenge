import { ErrorResponse } from '@/app/_models/user.types'

import { NextResponse } from 'next/server'

import { AxiosError } from 'axios'

export const createErrorResponse = (
  message: string,
  status: number
): NextResponse<ErrorResponse> => {
  return NextResponse.json({ error: message }, { status })
}

export const handleAxiosError = (error: AxiosError): NextResponse<ErrorResponse> => {
  const GITHUB_ERROR_MAP: Record<number, { message: string; status: number }> = {
    404: { message: 'User not found', status: 404 },
    403: { message: 'API rate limit exceeded', status: 429 },
    422: { message: 'Invalid parameter format', status: 422 },
  }

  const status = error.response?.status
  const errorConfig = status ? GITHUB_ERROR_MAP[status] : null

  return errorConfig
    ? createErrorResponse(errorConfig.message, errorConfig.status)
    : createErrorResponse('GitHub API unavailable', 503)
}
