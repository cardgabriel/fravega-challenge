'use client'

import { API_PATHS } from '@/app/_lib/paths'

import { useEffect, useState } from 'react'

import styles from './UsersView.module.scss'

interface User {
  avatar_url: string
  name: string
  id: number
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Function to fetch users from API
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await fetch(API_PATHS.USERS({ searchQuery: 'js' }))

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }

        const userData = await response.json()
        setUsers(userData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading users')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) {
    return (
      <div className={styles.loading}>
        <h1>Cargando usuarios...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h1>Error</h1>
        <p>Error al cargar los usuarios: {error}</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Usuarios</h1>

      {users.length === 0 ? (
        <p>No se encontraron usuarios.</p>
      ) : (
        <div className={styles.usersList}>
          {users.map((user) => (
            <div key={user.id} className={styles.userCard}>
              <img src={user.avatar_url} alt={`Avatar de ${user.name}`} className={styles.avatar} />
              <div>
                <h3>{user.name}</h3>
                <p>ID: {user.id}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
