'use client'

import CardUser from '@/app/_components/CardUser/CardUser'
import { QUERY_KEYS } from '@/app/_lib/queryKeys'
import { fetchUsers } from '@/app/_services/apiService'

import { useQuery } from '@tanstack/react-query'

import styles from './UsersView.module.scss'

export default function UsersView() {
  const {
    data: users,
    isLoading,
    error: queryError,
    isError,
  } = useQuery({
    queryKey: QUERY_KEYS.GET_USERS,
    queryFn: () => fetchUsers(),
  })

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <h1>Cargando usuarios...</h1>
      </div>
    )
  }

  const displayError = isError ? (queryError as Error)?.message : null
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

      {users?.length === 0 ? (
        <p>No se encontraron usuarios.</p>
      ) : (
        <div className={styles.usersList}>
          {users?.map((user) => <CardUser key={user.id} user={user} />)}
        </div>
      )}
    </div>
  )
}
