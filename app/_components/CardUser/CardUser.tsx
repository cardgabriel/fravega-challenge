'use client'

import { User } from '@/app/_models/types'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import styles from './CardUser.module.scss'

interface CardUserProps {
  user: User
  onClick?: (user: User) => void
}

const CardUser = ({ user, onClick }: CardUserProps) => {
  const router = useRouter()

  const handleClick = () => {
    if (onClick) {
      onClick(user)
    } else {
      router.push(`/user/${user.name}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div
      className={styles.user_container}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      aria-label={`Usuario ${user.name}`}
      tabIndex={0}
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
    </div>
  )
}

export default CardUser
