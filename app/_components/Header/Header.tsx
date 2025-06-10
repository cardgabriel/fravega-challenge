import { Suspense } from 'react'

import Link from 'next/link'

import SearchInput from '../SearchInput/SearchInput'
import styles from './Header.module.scss'

export default async function Header() {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.container}>
        <nav className={styles.tabs} aria-label="Navegación principal">
          <Link
            href="/users"
            className={styles.tab}
            aria-current={
              typeof window !== 'undefined' && window.location.pathname === '/users'
                ? 'page'
                : undefined
            }
          >
            <span>Users</span>
          </Link>
          <Link
            href="/favorites"
            className={styles.tab}
            aria-current={
              typeof window !== 'undefined' && window.location.pathname === '/favorites'
                ? 'page'
                : undefined
            }
          >
            <span>Favorites</span>
          </Link>
        </nav>

        <div className={styles.searchSection}>
          <Suspense fallback={<div className={styles.searchInput} aria-hidden="true" />}>
            <SearchInput placeholder="Search users..." aria-label="Buscar usuarios" />
          </Suspense>
        </div>
      </div>
    </header>
  )
}
