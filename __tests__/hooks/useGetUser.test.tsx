import { useGetUser } from '@/app/_hooks/useGetUser'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@testing-library/jest-dom'
import { renderHook } from '@testing-library/react'

// Wrapper with QueryClientProvider for tests
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
  return Wrapper
}

describe('useGetUser', () => {
  it('should start with loading state', () => {
    const { result } = renderHook(() => useGetUser('testUser'), {
      wrapper: createWrapper(),
    })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.user).toBeUndefined()
  })

  it('should not fetch if userId is empty', () => {
    const { result } = renderHook(() => useGetUser(''), {
      wrapper: createWrapper(),
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.user).toBeUndefined()
  })
})
