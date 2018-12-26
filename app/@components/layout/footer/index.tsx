import { LogoSmall } from '@components/logo'
import { PureComponent, ReactNode } from 'react'
import styles from './styles.css'

export class Footer extends PureComponent {
  public render(): ReactNode {
    return (
      <div className={styles.footer}>
        <LogoSmall sticker />
      </div>
    )
  }
}
