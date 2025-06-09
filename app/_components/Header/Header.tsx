import { Suspense } from 'react'

import Link from 'next/link'

import SearchInput from '../SearchInput/SearchInput'
import styles from './Header.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/users" className={styles.logo}>
          <h1>Github API</h1>
        </Link>

        <div className={styles.searchSection}>
          <Suspense fallback={<div className={styles.searchInput} />}>
            <SearchInput placeholder="Search users..." />
          </Suspense>
        </div>
      </div>
    </header>
  )
}
