'use client'

import CardUser from '@/app/_components/CardUser/CardUser'
import SearchInput from '@/app/_components/SearchInput/SearchInput'
import { useUsersInfiniteScroll } from '@/app/_hooks/useUsersInfiniteScroll'

import { useCallback, useState } from 'react'

import styles from './UsersView.module.scss'

export default function UsersView() {
  const [searchQuery, setSearchQuery] = useState('')

  const { users, isLoading, error, isError, triggerRef, isFetchingNextPage, hasNextPage } =
    useUsersInfiniteScroll(searchQuery)

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query.trim())
  }, [])

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

      <SearchInput onSearch={handleSearch} placeholder="Buscar usuarios por nombre..." />

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
