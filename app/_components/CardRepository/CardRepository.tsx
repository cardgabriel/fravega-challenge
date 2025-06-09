'use client'

import { formatDate } from '@/app/_lib/dateUtils'
import { Repository } from '@/app/_models/types'

import styles from './CardRepository.module.scss'

const CardRepository = ({ repository }: { repository: Repository }) => {
  const handleClick = () => {
    window.open(repository.html_url, '_blank', 'noopener,noreferrer')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div
      className={styles.repository_container}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      aria-label={`Repository ${repository.name}`}
      tabIndex={0}
    >
      <div className={styles.info}>
        <div className={styles.name}>
          <span>{repository.name}</span>
        </div>
        {repository.description && (
          <div className={styles.description}>
            <span>{repository.description}</span>
          </div>
        )}
        <div className={styles.metadata}>
          {repository.language && <span className={styles.language}>💻 {repository.language}</span>}
          {repository.stargazers_count > 0 && (
            <span className={styles.stars}>⭐ {repository.stargazers_count}</span>
          )}
          <span className={styles.updated}>📅 {formatDate(repository.updated_at)}</span>
        </div>
      </div>
    </div>
  )
}

export default CardRepository
