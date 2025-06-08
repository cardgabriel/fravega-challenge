import { axiosClient } from '@/app/_lib/axiosClient'
import { ErrorResponse, GithubUser, User } from '@/app/_models/user.types'
import { GITHUB_PATHS } from '@/app/_paths/paths'

import { NextRequest, NextResponse } from 'next/server'

import { AxiosError } from 'axios'

// Error mappings - Configuration
const ERROR_MAP = {
  404: { message: 'User not found', status: 404 },
  403: { message: 'API rate limit exceeded', status: 429 },
  422: { message: 'Invalid username format', status: 422 },
} as const

// Pure functions - Single Responsibility
const extractUsername = (request: NextRequest): string | undefined => {
  const username = new URL(request.url).searchParams.get('q')
  return username?.trim() || undefined
}

const createErrorResponse = (message: string, status: number): NextResponse<ErrorResponse> => {
  return NextResponse.json({ error: message }, { status })
}

const handleAxiosError = (error: AxiosError): NextResponse<ErrorResponse> => {
  const status = error.response?.status as keyof typeof ERROR_MAP
  const errorConfig = ERROR_MAP[status]

  return errorConfig
    ? createErrorResponse(errorConfig.message, errorConfig.status)
    : createErrorResponse('GitHub API unavailable', 503)
}

const fetchGitHubUsers = async (username?: string): Promise<User[]> => {
  const url = username ? GITHUB_PATHS.SEARCH_USERS(username) : GITHUB_PATHS.GET_ALL_USERS()
  const response = await axiosClient.get(url)

  // Handle different response structures
  const users = username ? response.data.items : response.data

  // Transform users to only include avatar_url and login (as name)
  return users.map((user: GithubUser) => ({
    avatar_url: user.avatar_url,
    name: user.login,
  }))
}

// Main handler
export async function GET(request: NextRequest) {
  try {
    const username = extractUsername(request)
    const userData = await fetchGitHubUsers(username)

    return NextResponse.json(userData)
  } catch (error) {
    console.error('Error fetching users:', error)

    return error instanceof AxiosError
      ? handleAxiosError(error)
      : createErrorResponse('Internal server error', 500)
  }
}
