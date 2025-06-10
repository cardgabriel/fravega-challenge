'use client'

import Spinner from '@/app/_components/Spinner/Spinner'
import { Title } from '@/app/_components/Title/Title'
import { useFavorite } from '@/app/_hooks/useFavorite'

import dynamic from 'next/dynamic'

import styles from './FavoritesView.module.scss'

const CardUser = dynamic(() => import('@/app/_components/CardUser/CardUser'), {
  ssr: false,
})

const Feedback = dynamic(() => import('@/app/_components/Feedback/Feedback'), {
  ssr: false,
  loading: () => <Spinner />,
})

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
