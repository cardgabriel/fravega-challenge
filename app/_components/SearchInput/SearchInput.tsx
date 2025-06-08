'use client'

import { useState } from 'react'

import styles from './SearchInput.module.scss'

interface SearchInputProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export default function SearchInput({
  onSearch,
  placeholder = 'Buscar usuarios...',
}: SearchInputProps) {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    onSearch(query)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={styles.searchInput}
        />
        {query && (
          <button
            onClick={handleClear}
            className={styles.clearButton}
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
        <button onClick={handleSearch} className={styles.searchButton} aria-label="Buscar">
          BUSCAR
        </button>
      </div>
    </div>
  )
}
