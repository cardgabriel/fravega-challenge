'use client'

import FavButton from '@/app/_components/FavButton/FavButton'
import { useFavorite } from '@/app/_hooks/useFavorite'
import { User } from '@/app/_models/types'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import styles from './CardUser.module.scss'

const CardUser = ({ user }: { user: User }) => {
  const searchParams = useSearchParams()
  const urlQuery = searchParams.get('q') || ''
  const { addFavorite, removeFavorite, isFavorite } = useFavorite()

  const handleFavoriteToggle = (isFavorite: boolean) => {
    if (isFavorite) {
      addFavorite(user)
    } else {
      removeFavorite(user.id)
    }
  }

  const isUserFavorite = isFavorite(user.id)

  return (
    <Link
      href={`/user/${user.name}?q=${encodeURIComponent(urlQuery)}`}
      className={styles.user_container}
      aria-label={`View ${user.name}'s profile`}
    >
      <div className={styles.avatar} aria-hidden="true">
        <Image
          src={user.avatar_url}
          alt={`${user.name}'s avatar`}
          width={100}
          height={100}
          loading="lazy"
        />
      </div>
      <div className={styles.info} role="group" aria-label={`Information about ${user.name}`}>
        <div className={styles.name}>
          <span>{user.name}</span>
        </div>
        <div className={styles.id}>
          <span>ID: {user.id}</span>
        </div>
      </div>
      <FavButton
        initialState={isUserFavorite}
        onToggle={handleFavoriteToggle}
        aria-label={
          isUserFavorite ? `Remove ${user.name} from favorites` : `Add ${user.name} to favorites`
        }
      />
    </Link>
  )
}

export default CardUser
