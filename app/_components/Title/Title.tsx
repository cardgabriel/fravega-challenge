import styles from './Title.module.scss'

export const Title = ({ label }: { label: string }) => {
  return <h1 className={styles.title}>{label}</h1>
}
