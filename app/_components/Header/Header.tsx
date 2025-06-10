import { Suspense } from 'react'

import Link from 'next/link'

import SearchInput from '../SearchInput/SearchInput'
import styles from './Header.module.scss'

export default async function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.tabs}>
          <Link href="/users" className={styles.tab}>
            <span>Users</span>
          </Link>
          <Link href="/favorites" className={styles.tab}>
            <span>Favorites</span>
          </Link>
        </div>

        <div className={styles.searchSection}>
          <Suspense fallback={<div className={styles.searchInput} />}>
            <SearchInput placeholder="Search users..." />
          </Suspense>
        </div>
      </div>
    </header>
  )
}
