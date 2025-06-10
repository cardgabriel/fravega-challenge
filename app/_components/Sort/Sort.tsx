'use client'

import { useState } from 'react'

import styles from './Sort.module.scss'

export const Sort = ({ onSort }: { onSort: (direction: 'asc' | 'desc') => void }) => {
  const [direction, setDirection] = useState<'asc' | 'desc'>('asc')

  // Simplified toggle function using object literal
  const toggleDirection = {
    asc: 'desc',
    desc: 'asc',
  } as const

  const handleSort = () => {
    const newDirection = toggleDirection[direction]
    setDirection(newDirection)
    onSort(newDirection)
  }

  const ariaLabel = `Sort ${direction === 'asc' ? 'A to Z' : 'Z to A'}`
  const buttonText = direction === 'asc' ? 'A-Z' : 'Z-A'

  return (
    <button onClick={handleSort} className={styles.sortButton} aria-label={ariaLabel}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${styles.icon} ${styles[direction]}`}
      >
        <path d="M7 15l5 5 5-5" />
        <path d="M7 9l5-5 5 5" />
      </svg>
      {buttonText}
    </button>
  )
}
