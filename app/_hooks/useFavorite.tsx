import { useEffect, useState } from 'react'

interface User {
  avatar_url: string
  name: string
  id: number
}

const STORAGE_KEY = 'favorite_users'

export const useFavorite = () => {
  const [favorites, setFavorites] = useState<User[]>([])

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem(STORAGE_KEY)
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  // Save user to favorites
  const addFavorite = (user: User) => {
    const updatedFavorites = [...favorites, user]
    setFavorites(updatedFavorites)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites))
  }

  // Remove user from favorites
  const removeFavorite = (userId: number) => {
    const updatedFavorites = favorites.filter((user) => user.id !== userId)
    setFavorites(updatedFavorites)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites))
  }

  // Check if a user is in favorites
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
