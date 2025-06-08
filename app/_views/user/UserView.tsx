'use client'

import CardRepository from '@/app/_components/CardRepository/CardRepository'
import { useGetUser } from '@/app/_hooks/useGetUser'
import { useGetUserRepositories } from '@/app/_hooks/useGetUserRepositories'
import { Repository } from '@/app/_models/types'

import Image from 'next/image'

import styles from './UserView.module.scss'

interface UserViewProps {
  userId: string
}

export const UserView = ({ userId }: UserViewProps) => {
  const { user, isLoading: userLoading, error: userError } = useGetUser(userId)
  const {
    repositories,
    isLoading: reposLoading,
    error: reposError,
  } = useGetUserRepositories(userId)

  if (!userId) {
    return (
      <div className={styles.noUserId}>
        <p>No user ID provided</p>
      </div>
    )
  }

  if (userLoading || reposLoading) {
    return (
      <div className={styles.loading}>
        <p>Loading user details...</p>
      </div>
    )
  }

  if (userError || !user) {
    return (
      <div className={styles.error}>
        <p>Error loading user details</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.userCard}>
        <div className={styles.userHeader}>
          <Image
            src={user.avatar}
            alt={`${user.username} avatar`}
            className={styles.avatar}
            width={120}
            height={120}
          />
          <div className={styles.userBasicInfo}>
            <h1 className={styles.userName}>{user.name || user.username}</h1>
            <p className={styles.username}>@{user.username}</p>
          </div>
        </div>

        <div className={styles.userDetails}>
          {(user.company || user.location) && (
            <div className={styles.userMeta}>
              {user.company && (
                <div className={styles.metaItem}>
                  <span className={styles.metaIcon}>🏢</span>
                  <span>{user.company}</span>
                </div>
              )}
              {user.location && (
                <div className={styles.metaItem}>
                  <span className={styles.metaIcon}>📍</span>
                  <span>{user.location}</span>
                </div>
              )}
            </div>
          )}

          <div className={styles.userStats}>
            <div className={styles.statItem}>
              <span className={styles.statIcon}>👥</span>
              <span className={styles.statNumber}>{user.followers_count}</span>
              <span className={styles.statLabel}>followers</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statIcon}>👤</span>
              <span className={styles.statNumber}>{user.following_count}</span>
              <span className={styles.statLabel}>following</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.reposSection}>
        <h2 className={styles.reposTitle}>Repositories</h2>
        {reposError ? (
          <p>Error loading repositories</p>
        ) : !repositories?.length ? (
          <p>No repositories found</p>
        ) : (
          <div className={styles.reposGrid}>
            {repositories.map((repo: Repository) => (
              <CardRepository key={repo.id} repository={repo} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
