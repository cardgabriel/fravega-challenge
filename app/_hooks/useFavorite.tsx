import { useCallback, useEffect, useState } from 'react'

interface User {
  avatar_url: string
  name: string
  id: number
}

const STORAGE_KEY = 'favorite_users'

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
  const [favorites, setFavorites] = useState<User[]>(getFavoritesFromStorage)

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

  const updateFavorites = useCallback((newFavorites: User[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites))
      setFavorites(newFavorites)
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }, [])

  const addFavorite = (user: User) => {
    const currentFavorites = getFavoritesFromStorage()

    if (!currentFavorites.some((fav) => fav.id === user.id)) {
      const updatedFavorites = [...currentFavorites, user]
      updateFavorites(updatedFavorites)
    }
  }

  const removeFavorite = (userId: number) => {
    const currentFavorites = getFavoritesFromStorage()
    const updatedFavorites = currentFavorites.filter((user) => user.id !== userId)
    updateFavorites(updatedFavorites)
  }

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
