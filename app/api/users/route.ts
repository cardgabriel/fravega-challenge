import { createErrorResponse, handleAxiosError } from '@/app/_lib/errorUtils'
import { extractPaginationParams } from '@/app/_lib/paginationUtils'
import { GithubUser } from '@/app/_models/types'
import { fetchGitHubUsers } from '@/app/_services/githubApi'

import { NextRequest, NextResponse } from 'next/server'

import { AxiosError } from 'axios'

export async function GET(request: NextRequest) {
  try {
    const searchParams = new URL(request.url).searchParams
    const username = searchParams.get('q')?.trim() || undefined

    const pagination = extractPaginationParams(searchParams)

    const users = await fetchGitHubUsers(username, pagination)

    const transformedUsers = users.map((user: GithubUser) => ({
      avatar_url: user.avatar_url,
      name: user.login,
      id: user.id,
    }))

    return NextResponse.json(transformedUsers)
  } catch (error) {
    console.error('Error fetching users:', error)

    return error instanceof AxiosError
      ? handleAxiosError(error)
      : createErrorResponse('Internal server error', 500)
  }
}
