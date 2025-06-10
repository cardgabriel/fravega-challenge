import { useGetUserRepositories } from '@/app/_hooks/useGetUserRepositories'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@testing-library/jest-dom'
import { renderHook } from '@testing-library/react'

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

describe('useGetUserRepositories', () => {
  it('should return initial state', () => {
    const { result } = renderHook(() => useGetUserRepositories('testUser'), {
      wrapper: createWrapper(),
    })

    expect(result.current.repositories).toEqual([])
    expect(result.current.isLoading).toBe(true)
  })

  it('should have correct pagination state initially', () => {
    const { result } = renderHook(() => useGetUserRepositories('testUser'), {
      wrapper: createWrapper(),
    })

    expect(result.current.hasNextPage).toBe(false)
    expect(result.current.isFetchingNextPage).toBe(false)
  })

  it('should provide trigger ref for infinite scroll', () => {
    const { result } = renderHook(() => useGetUserRepositories('testUser'), {
      wrapper: createWrapper(),
    })

    expect(result.current.triggerRef).toBeDefined()
    expect(typeof result.current.triggerRef).toBe('function')
  })
})
