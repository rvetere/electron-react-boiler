import { PureComponent, ReactNode } from 'react'
import { Footer } from './footer'
import styles from './layoutView.css'

export class LayoutView extends PureComponent {
  public render(): ReactNode {
    const { children } = this.props
    return (
      <div className={styles.layout}>
        <div className={styles.dragArea} />

        <div className={styles.content}>{children}</div>

        <Footer />
      </div>
    )
  }
}
