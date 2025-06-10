import { HTMLAttributes } from 'react'

import styles from './Feedback.module.scss'

interface FeedbackProps extends HTMLAttributes<HTMLDivElement> {
  label: string
}

const Feedback = ({ label, ...props }: FeedbackProps) => {
  return (
    <div className={styles.container} {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={styles.icon}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
        />
      </svg>
      <p className={styles.text}>{label}</p>
    </div>
  )
}

export default Feedback
