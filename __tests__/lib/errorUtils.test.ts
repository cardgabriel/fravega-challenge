import { createErrorResponse, handleAxiosError } from '@/app/_lib/errorUtils'

import { AxiosError } from 'axios'

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: (data: any, init: any) => ({
      ...data,
      ...init,
    }),
  },
}))

describe('errorUtils', () => {
  it('should create error response with correct format', () => {
    const response = createErrorResponse('Test error', 400)
    expect(response).toEqual({
      error: 'Test error',
      status: 400,
    })
  })

  it('should handle GitHub 404 error correctly', () => {
    const error = new AxiosError()
    error.response = { status: 404 } as any

    const response = handleAxiosError(error)
    expect(response).toEqual({
      error: 'User not found',
      status: 404,
    })
  })
})
