'use client'

import { useState } from 'react'

import styles from './FavButton.module.scss'

interface FavButtonProps {
  initialState?: boolean
  onToggle?: (isFavorite: boolean) => void
  className?: string
}

const FavButton = ({ initialState = false, onToggle, className = '' }: FavButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(initialState)

  const handleFavoriteClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault()
    const newState = !isFavorite
    setIsFavorite(newState)
    onToggle?.(newState)
  }

  return (
    <div
      className={`${styles.favorite_icon} ${isFavorite ? styles.favorite_active : ''} ${className}`}
      onClick={handleFavoriteClick}
      role="button"
      tabIndex={0}
      aria-label="Add to favorites"
      aria-pressed={isFavorite}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleFavoriteClick(e)
        }
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </div>
  )
}

export default FavButton
