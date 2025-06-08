'use client'

import { DetailedUser, Repository } from '@/app/_models/types'
import { fetchGitHubUser, fetchGitHubUserRepos } from '@/app/_services/githubApi'

import { useQuery } from '@tanstack/react-query'

import styles from './UserView.module.scss'

interface UserViewProps {
  userId: string
}

export const UserView = ({ userId }: UserViewProps) => {
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useQuery<DetailedUser>({
    queryKey: ['user', userId],
    queryFn: () => fetchGitHubUser(userId),
    enabled: !!userId,
  })

  const {
    data: repos,
    isLoading: reposLoading,
    error: reposError,
  } = useQuery<Repository[]>({
    queryKey: ['userRepos', userId],
    queryFn: () => fetchGitHubUserRepos(userId),
    enabled: !!userId,
  })

  if (!userId) {
    return (
      <div className={styles.noUserId}>
        <p>No user ID provided</p>
      </div>
    )
  }

  if (userLoading) {
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
      {/* User Details Section */}
      <div className={styles.userCard}>
        <div className={styles.userInfo}>
          <img src={user.avatar} alt={`${user.username} avatar`} className={styles.avatar} />
          <div>
            <h1 className={styles.userName}>{user.name || user.username}</h1>
            <p>@{user.username}</p>
            {user.company && <p>🏢 {user.company}</p>}
            {user.location && <p>📍 {user.location}</p>}
            <div>
              <span>👥 {user.followers_count} followers</span>
              <span>👤 {user.following_count} following</span>
            </div>
          </div>
        </div>
      </div>

      {/* Repositories Section */}
      <div className={styles.reposSection}>
        <h2 className={styles.reposTitle}>Repositories</h2>

        {reposLoading ? (
          <p>Loading repositories...</p>
        ) : reposError ? (
          <p>Error loading repositories</p>
        ) : !repos || repos.length === 0 ? (
          <p>No repositories found</p>
        ) : (
          <div className={styles.reposGrid}>
            {repos.map((repo) => (
              <div key={repo.id} className={styles.repoCard}>
                <div>
                  <div>
                    <h3>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.repoName}
                      >
                        {repo.name}
                      </a>
                    </h3>
                    {repo.description && <p>{repo.description}</p>}
                    <div>
                      {repo.language && <span>💻 {repo.language}</span>}
                      <span>⭐ {repo.stargazers_count}</span>
                      <span>📅 Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
