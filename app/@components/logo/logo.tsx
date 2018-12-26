import { Stackbee } from '@core/image/icon'
import styles from './logo.css'

export const Logo = (): JSX.Element => (
  <h1 className={styles.h1}>
    <span className={styles.logoContainer}>
      <Stackbee height={32} width={32} />
    </span>
    <span className={styles.logoTitle}>stackbee.io</span>
  </h1>
)
