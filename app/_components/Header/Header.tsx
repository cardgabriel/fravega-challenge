'use client'

import { useCallback, useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import SearchInput from '../SearchInput/SearchInput'
import styles from './Header.module.scss'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const urlQuery = searchParams.get('q') || ''
    setSearchQuery(urlQuery)
  }, [searchParams])

  const handleSearch = useCallback(
    (query: string) => {
      const trimmedQuery = query.trim()
      setSearchQuery(trimmedQuery)

      if (trimmedQuery) {
        router.push(`/users?q=${encodeURIComponent(trimmedQuery)}`)
      } else {
        router.push('/users')
      }
    },
    [router]
  )

  const handleLogoClick = () => {
    router.push('/users')
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={handleLogoClick}>
          <h1>Github API</h1>
          <span>Challenge</span>
        </div>

        <div className={styles.searchSection}>
          <SearchInput
            onSearch={handleSearch}
            placeholder="Buscar usuarios por nombre..."
            initialValue={searchQuery}
          />
        </div>
      </div>
    </header>
  )
}
