import { RESULTS_PER_PAGE } from '@/app/_lib/constants'
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

    const isInfiniteScroll = searchParams.has('since')

    if (isInfiniteScroll) {
      const nextCursor =
        transformedUsers.length === RESULTS_PER_PAGE
          ? transformedUsers[transformedUsers.length - 1].id
          : undefined

      return NextResponse.json({
        users: transformedUsers,
        nextCursor,
      })
    }

    return NextResponse.json({ users: transformedUsers })
  } catch (error) {
    console.error('Error fetching users:', error)

    return error instanceof AxiosError
      ? handleAxiosError(error)
      : createErrorResponse('Internal server error', 500)
  }
}
