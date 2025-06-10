import { useGetUsers } from '@/app/_hooks/useGetUsers'

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

describe('useGetUsers', () => {
  it('should return initial state', () => {
    const { result } = renderHook(() => useGetUsers(), {
      wrapper: createWrapper(),
    })

    expect(result.current.users).toEqual([])
    expect(result.current.isLoading).toBe(true)
  })

  it('should handle search query', () => {
    const { result } = renderHook(() => useGetUsers('test'), {
      wrapper: createWrapper(),
    })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.users).toEqual([])
  })

  it('should provide trigger ref for infinite scroll', () => {
    const { result } = renderHook(() => useGetUsers(), {
      wrapper: createWrapper(),
    })

    expect(result.current.triggerRef).toBeDefined()
    expect(typeof result.current.triggerRef).toBe('function')
  })
})
