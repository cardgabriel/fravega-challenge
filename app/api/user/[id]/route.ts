import { createErrorResponse, handleAxiosError } from '@/app/_lib/errorUtils'
import { DetailedUser } from '@/app/_models/user.types'
import { fetchGitHubUser } from '@/app/_services/githubApi'

import { NextRequest, NextResponse } from 'next/server'

import { AxiosError } from 'axios'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!id || id.trim() === '') {
      return createErrorResponse('User ID is required', 400)
    }

    const userData = await fetchGitHubUser(id)

    const transformedData: DetailedUser = {
      avatar: userData.avatar_url,
      username: userData.login,
      name: userData.name ?? null,
      company: userData.company ?? null,
      location: userData.location ?? null,
      followers_count: userData.followers || 0,
      following_count: userData.following || 0,
    }

    return NextResponse.json(transformedData)
  } catch (error) {
    console.error('Error fetching user details:', error)

    return error instanceof AxiosError
      ? handleAxiosError(error)
      : createErrorResponse('Internal server error', 500)
  }
}
