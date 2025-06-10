import { useIntersectionObserver } from '@/app/_hooks/useIntersectionObserver'

import '@testing-library/jest-dom'
import { act, renderHook } from '@testing-library/react'

// Mock IntersectionObserver API
const mockObserverInstance = {
  observe: jest.fn(),
  disconnect: jest.fn(),
  unobserve: jest.fn(),
  takeRecords: () => [],
  root: null,
  rootMargin: '',
  thresholds: [],
}

// Create a constructor that matches IntersectionObserver's signature
const mockIntersectionObserver = jest.fn().mockImplementation(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (callback: IntersectionObserverCallback) => mockObserverInstance
)

window.IntersectionObserver =
  mockIntersectionObserver as unknown as typeof window.IntersectionObserver

describe('useIntersectionObserver', () => {
  beforeEach(() => {
    mockIntersectionObserver.mockClear()
    mockObserverInstance.observe.mockClear()
    mockObserverInstance.disconnect.mockClear()
    mockObserverInstance.unobserve.mockClear()
  })

  it('should return initial state', () => {
    const { result } = renderHook(() => useIntersectionObserver())

    expect(result.current.inView).toBe(false)
    expect(typeof result.current.ref).toBe('function')
  })

  it('should handle intersection', () => {
    const { result } = renderHook(() => useIntersectionObserver())

    act(() => {
      // Simulate ref setup
      result.current.ref(document.createElement('div'))
    })

    // Ensure the observer was created and is observing
    expect(mockIntersectionObserver).toHaveBeenCalled()
    expect(mockObserverInstance.observe).toHaveBeenCalled()

    act(() => {
      // Get the callback that was passed to IntersectionObserver
      const callback = mockIntersectionObserver.mock.calls[0][0] as IntersectionObserverCallback
      // Simulate intersection
      callback([{ isIntersecting: true } as IntersectionObserverEntry], mockObserverInstance)
    })

    expect(result.current.inView).toBe(true)
  })
})
