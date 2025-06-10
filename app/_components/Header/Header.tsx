import { Suspense } from 'react'

import Link from 'next/link'

import { CLIENT_PATHS } from '../../_lib/constants'
import SearchInput from '../SearchInput/SearchInput'
import styles from './Header.module.scss'

export default async function Header() {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.container}>
        <nav className={styles.tabs} aria-label="Navegación principal">
          <Link href={CLIENT_PATHS.USERS} className={styles.tab}>
            <span>Users</span>
          </Link>
          <Link href={CLIENT_PATHS.FAVORITES} className={styles.tab}>
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
