'use client'

import { User } from '@/app/_models/types'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import styles from './CardUser.module.scss'

const CardUser = ({ user }: { user: User }) => {
  const searchParams = useSearchParams()
  const urlQuery = searchParams.get('q') || ''

  return (
    <Link
      href={`/user/${user.name}?q=${encodeURIComponent(urlQuery)}`}
      className={styles.user_container}
      aria-label={`Usuario ${user.name}`}
    >
      <div className={styles.avatar}>
        <Image
          src={user.avatar_url}
          alt={`Avatar de ${user.name}`}
          width={100}
          height={100}
          loading="lazy"
        />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>
          <span>{user.name}</span>
        </div>
        <div className={styles.id}>
          <span>ID: {user.id}</span>
        </div>
      </div>
    </Link>
  )
}

export default CardUser
