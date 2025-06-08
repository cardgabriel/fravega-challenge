import { createErrorResponse, handleAxiosError } from '@/app/_lib/errorUtils'
import { extractPaginationParams } from '@/app/_lib/paginationUtils'
import { GithubRepository, Repository } from '@/app/_models/types'
import { fetchGitHubUserRepos } from '@/app/_services/githubApi'

import { NextRequest, NextResponse } from 'next/server'

import { AxiosError } from 'axios'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    if (!id || id.trim() === '') {
      return createErrorResponse('User ID is required', 400)
    }

    const searchParams = new URL(request.url).searchParams

    const pagination = extractPaginationParams(searchParams)

    const userRepos = await fetchGitHubUserRepos(id, pagination)

    const transformedRepos: Repository[] = userRepos.map((repo: GithubRepository) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count,
      language: repo.language,
      updated_at: repo.updated_at,
    }))

    return NextResponse.json(transformedRepos)
  } catch (error) {
    console.error('Error fetching user repositories:', error)

    return error instanceof AxiosError
      ? handleAxiosError(error)
      : createErrorResponse('Internal server error', 500)
  }
}
