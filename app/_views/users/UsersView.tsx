'use client'

import CardUser from '@/app/_components/CardUser/CardUser'
import Feedback from '@/app/_components/Feedback/Feedback'
import Spinner from '@/app/_components/Spinner/Spinner'
import { Title } from '@/app/_components/Title/Title'
import { useGetUsers } from '@/app/_hooks/useGetUsers'

import { useSearchParams } from 'next/navigation'

import styles from './UsersView.module.scss'

export default function UsersView() {
  const searchParams = useSearchParams()

  const searchQuery = searchParams.get('q') || ''

  const { users, triggerRef, isFetchingNextPage, isLoading, isError } = useGetUsers(searchQuery)

  return (
    <div className={styles.container}>
      <Title label="Github Users List" />

      {searchQuery && (
        <p className={styles.searchInfo}>
          Results for: <strong>&quot;{searchQuery}&quot;</strong>
        </p>
      )}

      <div className={styles.usersList}>
        {isLoading && <Spinner />}
        {users.map((user) => (
          <CardUser key={user.id} user={user} />
        ))}
        {!users.length && !isLoading && <Feedback label="No users found" />}
        {isError && <Feedback label="Error loading users" />}
      </div>

      <div ref={triggerRef} className={styles.loadingTrigger}>
        {isFetchingNextPage && <Spinner />}
      </div>
    </div>
  )
}
