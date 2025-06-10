'use client'

import { CLIENT_PATHS } from '@/app/_lib/constants'

import { useCallback, useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import styles from './SearchInput.module.scss'

interface SearchInputProps {
  placeholder?: string
}

export default function SearchInput({ placeholder = 'Search users...' }: SearchInputProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')

  useEffect(() => {
    const urlQuery = searchParams.get('q') || ''
    setQuery(urlQuery)
  }, [searchParams])

  const handleSearch = useCallback(() => {
    const trimmedQuery = query.trim()
    if (trimmedQuery) {
      router.push(`${CLIENT_PATHS.USERS}?q=${encodeURIComponent(trimmedQuery)}`)
    } else {
      router.push(CLIENT_PATHS.USERS)
    }
  }, [query, router])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleClear = () => {
    setQuery('')
    router.push(CLIENT_PATHS.USERS)
  }

  return (
    <div className={styles.searchContainer} role="search">
      <div className={styles.inputWrapper}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={styles.searchInput}
          aria-label={placeholder}
        />
        {query && (
          <button
            onClick={handleClear}
            className={styles.clearButton}
            aria-label="Limpiar búsqueda"
            type="button"
          >
            ✕
          </button>
        )}
        <button
          onClick={handleSearch}
          className={styles.searchButton}
          aria-label="Buscar"
          type="submit"
        >
          SEARCH
        </button>
      </div>
    </div>
  )
}
