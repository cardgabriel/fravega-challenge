import { createErrorResponse, handleAxiosError } from '@/app/_lib/errorUtils'
import { GithubUser } from '@/app/_models/user.types'
import { fetchGitHubUsers } from '@/app/_services/githubApi'

import { NextRequest, NextResponse } from 'next/server'

import { AxiosError } from 'axios'

export async function GET(request: NextRequest) {
  try {
    const username = new URL(request.url).searchParams.get('q')?.trim() || undefined
    const users = await fetchGitHubUsers(username)

    const transformedUsers = users.map((user: GithubUser) => ({
      avatar_url: user.avatar_url,
      name: user.login,
    }))

    return NextResponse.json(transformedUsers)
  } catch (error) {
    console.error('Error fetching users:', error)

    return error instanceof AxiosError
      ? handleAxiosError(error)
      : createErrorResponse('Internal server error', 500)
  }
}
