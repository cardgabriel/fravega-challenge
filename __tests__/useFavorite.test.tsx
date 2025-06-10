import { useFavorite } from '@/app/_hooks/useFavorite'

import '@testing-library/jest-dom'
import { act, renderHook } from '@testing-library/react'

// Mock localStorage
const mockStorage: { [key: string]: string } = {}

beforeEach(() => {
  // Clear storage before each test
  Object.keys(mockStorage).forEach((key) => delete mockStorage[key])

  // Mock localStorage methods
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn((key) => mockStorage[key] || null),
      setItem: jest.fn((key, value) => {
        mockStorage[key] = value.toString()
      }),
      removeItem: jest.fn((key) => delete mockStorage[key]),
    },
    writable: true,
  })
})

describe('useFavorite', () => {
  it('should add a favorite user', () => {
    const { result } = renderHook(() => useFavorite())
    const testUser = { id: 1, name: 'Test User', avatar_url: 'test.jpg' }

    act(() => {
      result.current.addFavorite(testUser)
    })

    expect(result.current.favorites).toContainEqual(testUser)
    expect(result.current.isFavorite(1)).toBe(true)
  })

  it('should remove a favorite user', () => {
    const { result } = renderHook(() => useFavorite())
    const testUser = { id: 1, name: 'Test User', avatar_url: 'test.jpg' }

    act(() => {
      result.current.addFavorite(testUser)
      result.current.removeFavorite(1)
    })

    expect(result.current.favorites).toHaveLength(0)
    expect(result.current.isFavorite(1)).toBe(false)
  })

  it('should persist favorites in localStorage', () => {
    const { result } = renderHook(() => useFavorite())
    const testUser = { id: 1, name: 'Test User', avatar_url: 'test.jpg' }

    act(() => {
      result.current.addFavorite(testUser)
    })

    expect(localStorage.setItem).toHaveBeenCalled()
    expect(JSON.parse(mockStorage['favorite_users'])).toContainEqual(testUser)
  })
})
