import styles from './styles.css'

export const IconToggle = ({ children }) => (
  <span className={styles.wrapper}>
    <span className={styles.static}>{children[0]}</span>
    <span className={styles.hover}>{children[1]}</span>
  </span>
)

export default IconToggle
