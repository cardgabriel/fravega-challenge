'use client'

import CardRepository from '@/app/_components/CardRepository/CardRepository'
import Feedback from '@/app/_components/Feedback/Feedback'
import Spinner from '@/app/_components/Spinner/Spinner'
import { Title } from '@/app/_components/Title/Title'
import { useGetUser } from '@/app/_hooks/useGetUser'
import { useGetUserRepositories } from '@/app/_hooks/useGetUserRepositories'
import { Repository } from '@/app/_models/types'

import Image from 'next/image'

import styles from './UserView.module.scss'

export const UserView = ({ username }: { username: string }) => {
  const { user, isLoading: userLoading, isError: userError } = useGetUser(username)
  const {
    repositories,
    isLoading: reposLoading,
    isError: reposError,
    isFetchingNextPage,
    hasNextPage,
    triggerRef,
  } = useGetUserRepositories(username)

  if (userLoading) {
    return <Spinner />
  }

  if (userError) {
    return <Feedback label="Error loading user" />
  }

  return (
    <div className={styles.container}>
      <div className={styles.userCard}>
        <div className={styles.userHeader}>
          <Image
            src={user?.avatar ?? ''}
            alt={`${user?.username} avatar`}
            className={styles.avatar}
            width={120}
            height={120}
          />
          <div className={styles.userBasicInfo}>
            <Title label={user?.name || user?.username || ''} />
            <p className={styles.username}>@{user?.username}</p>
          </div>
        </div>

        <div className={styles.userDetails}>
          {(user?.company || user?.location) && (
            <div className={styles.userMeta}>
              {user?.company && (
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
              <span className={styles.statNumber}>{user?.followers_count}</span>
              <span className={styles.statLabel}>followers</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{user?.following_count}</span>
              <span className={styles.statLabel}>following</span>
            </div>
          </div>
        </div>
      </div>

      {reposLoading && <Spinner />}
      {reposError && <Feedback label="Error loading repositories" />}
      <div className={styles.reposSection}>
        <Title label="Repositories" />
        <div className={styles.reposGrid}>
          {repositories.map((repo: Repository) => (
            <CardRepository key={`${repo.id}-${repo.full_name}`} repository={repo} />
          ))}
        </div>
        {hasNextPage && (
          <div ref={triggerRef} className={styles.loadingMore}>
            {isFetchingNextPage ? 'Loading more...' : ''}
          </div>
        )}
      </div>
    </div>
  )
}
