'use client'

import CardUser from '@/app/_components/CardUser/CardUser'
import { useUsersInfiniteScroll } from '@/app/_hooks/useUsersInfiniteScroll'

import { useSearchParams } from 'next/navigation'

import styles from './UsersView.module.scss'

export default function UsersView() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q') || ''

  const { users, isLoading, error, isError, triggerRef, isFetchingNextPage, hasNextPage } =
    useUsersInfiniteScroll(searchQuery)

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
        <p>Error al cargar los usuarios: {displayError}</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Usuarios</h1>

      {searchQuery && (
        <p className={styles.searchInfo}>
          Resultados para: <strong>&quot;{searchQuery}&quot;</strong>
        </p>
      )}

      {users.length === 0 ? (
        <p>No se encontraron usuarios.</p>
      ) : (
        <div className={styles.usersList}>
          {users.map((user) => (
            <CardUser key={user.id} user={user} />
          ))}
        </div>
      )}

      <div ref={triggerRef} className={styles.loadingTrigger}>
        {isFetchingNextPage && <p className={styles.loadingMore}>Cargando más usuarios...</p>}
        {!hasNextPage && users.length > 0 && (
          <p className={styles.endMessage}>No hay más usuarios para mostrar</p>
        )}
      </div>
    </div>
  )
}
