'use client'

import CardUser from '@/app/_components/CardUser/CardUser'
import Feedback from '@/app/_components/Feedback/Feedback'
import { Sort } from '@/app/_components/Sort/Sort'
import { Title } from '@/app/_components/Title/Title'
import { useFavorite } from '@/app/_hooks/useFavorite'

import { useMemo, useState } from 'react'

import styles from './FavoritesView.module.scss'

export default function FavoritesView() {
  const { favorites } = useFavorite()
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const sortedFavorites = useMemo(
    () =>
      [...favorites].sort((a, b) => {
        const order = sortDirection === 'asc' ? 1 : -1
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase()) * order
      }),
    [favorites, sortDirection]
  )

  return (
    <section className={styles.container} aria-label="Favorite users list">
      <div className={styles.titleContainer}>
        <Title label="Favorites Users List" />
        <Sort onSort={setSortDirection} />
      </div>
      <div className={styles.usersList} role="feed" aria-label="Favorite users">
        {sortedFavorites.map((user) => (
          <CardUser key={`favorite-${user.id}`} user={user} />
        ))}
        {!favorites.length && (
          <Feedback label="No saved favorites" role="status" aria-live="polite" />
        )}
      </div>
    </section>
  )
}
