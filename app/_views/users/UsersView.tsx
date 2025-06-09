'use client'

import CardUser from '@/app/_components/CardUser/CardUser'
import { useGetUsers } from '@/app/_hooks/useGetUsers'

import { useSearchParams } from 'next/navigation'

import styles from './UsersView.module.scss'

export default function UsersView() {
  const searchParams = useSearchParams()

  const searchQuery = searchParams.get('q') || ''

  const { users, isLoading, error, isError, triggerRef, isFetchingNextPage, hasNextPage } =
    useGetUsers(searchQuery)

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <h1>Cargando usuarios...</h1>
      </div>
    )
  }

  const displayError = isError ? (error as Error)?.message : null
  if (displayError) {
    return (
      <div className={styles.error}>
        <h1>Error</h1>
        <p>Error loading users: {displayError}</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Users List</h1>

      {searchQuery && (
        <p className={styles.searchInfo}>
          Resultados para: <strong>&quot;{searchQuery}&quot;</strong>
        </p>
      )}

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className={styles.usersList}>
          {users.map((user) => (
            <CardUser key={user.id} user={user} />
          ))}
        </div>
      )}

      <div ref={triggerRef} className={styles.loadingTrigger}>
        {isFetchingNextPage && <p className={styles.loadingMore}>Loading more users...</p>}
        {!hasNextPage && users.length > 0 && (
          <p className={styles.endMessage}>No more users to show</p>
        )}
      </div>
    </div>
  )
}
