'use client'

import CardUser from '@/app/_components/CardUser/CardUser'
import Feedback from '@/app/_components/Feedback/Feedback'
import { Title } from '@/app/_components/Title/Title'
import { useFavorite } from '@/app/_hooks/useFavorite'

import styles from './FavoritesView.module.scss'

export default function FavoritesView() {
  const { favorites } = useFavorite()

  return (
    <section className={styles.container} aria-label="Favorite users list">
      <Title label="Favorites Users List" />
      <div className={styles.usersList} role="feed" aria-label="Favorite users">
        {favorites.map((user) => (
          <CardUser key={`favorite-${user.id}`} user={user} />
        ))}
        {!favorites.length && (
          <Feedback label="No saved favorites" role="status" aria-live="polite" />
        )}
      </div>
    </section>
  )
}
