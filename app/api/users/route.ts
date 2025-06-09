import { RESULTS_PER_PAGE } from '@/app/_lib/constants'
import { createErrorResponse, handleAxiosError } from '@/app/_lib/errorUtils'
import { GithubUser } from '@/app/_models/types'
import { fetchGitHubUsers } from '@/app/_services/githubApi'

import { NextRequest, NextResponse } from 'next/server'

import { AxiosError } from 'axios'

export async function GET(request: NextRequest) {
  try {
    const searchParams = new URL(request.url).searchParams
    const searchQuery = searchParams.get('q')?.trim() || ''
    const since = Number(searchParams.get('since')?.trim()) || (searchQuery ? 1 : 0)

    const users = await fetchGitHubUsers({ since, searchQuery })

    const transformedUsers = users.map((user: GithubUser) => ({
      avatar_url: user.avatar_url,
      name: user.login,
      id: user.id,
    }))

    const nextCursor =
      transformedUsers.length === RESULTS_PER_PAGE
        ? searchQuery
          ? since + 1
          : transformedUsers[transformedUsers.length - 1].id
        : null

    return NextResponse.json({
      users: transformedUsers,
      nextCursor,
    })
  } catch (error) {
    console.error('Error fetching users:', error)

    return error instanceof AxiosError
      ? handleAxiosError(error)
      : createErrorResponse('Internal server error', 500)
  }
}
