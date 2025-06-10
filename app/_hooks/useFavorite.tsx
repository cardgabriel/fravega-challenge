import { useCallback, useEffect, useState } from 'react'

interface User {
  avatar_url: string
  name: string
  id: number
}

const STORAGE_KEY = 'favorite_users'

// Get favorites from localStorage.
// This function runs on the client and gets the stored favorites.
const getFavoritesFromStorage = (): User[] => {
  if (typeof window === 'undefined') return []

  try {
    const storedFavorites = localStorage.getItem(STORAGE_KEY)
    return storedFavorites ? JSON.parse(storedFavorites) : []
  } catch (error) {
    console.error('Error reading favorites from localStorage:', error)
    return []
  }
}

export const useFavorite = () => {
  // Initialize state lazily with data from localStorage.
  const [favorites, setFavorites] = useState<User[]>(getFavoritesFromStorage)

  // This effect keeps the favorites in sync between different browser tabs.
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        try {
          const newFavorites = event.newValue ? JSON.parse(event.newValue) : []
          setFavorites(newFavorites)
        } catch (error) {
          console.error('Error parsing favorites from storage event:', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // This function updates the favorites in both localStorage and the state.
  const updateFavorites = useCallback((newFavorites: User[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites))
      setFavorites(newFavorites)
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }, [])

  // Add a user to favorites if they are not already there.
  const addFavorite = (user: User) => {
    // We read directly from storage to prevent race conditions between tabs.
    const currentFavorites = getFavoritesFromStorage()

    if (!currentFavorites.some((fav) => fav.id === user.id)) {
      const updatedFavorites = [...currentFavorites, user]
      updateFavorites(updatedFavorites)
    }
  }

  // Remove a user from favorites.
  const removeFavorite = (userId: number) => {
    // We read directly from storage to prevent race conditions.
    const currentFavorites = getFavoritesFromStorage()
    const updatedFavorites = currentFavorites.filter((user) => user.id !== userId)
    updateFavorites(updatedFavorites)
  }

  // Check if a user is in favorites.
  const isFavorite = (userId: number): boolean => {
    return favorites.some((user) => user.id === userId)
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  }
}
