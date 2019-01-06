import classNames from 'class-names'
import { PureComponent, ReactNode } from 'react'
import { Footer } from './footer'
import styles from './layoutView.css'

export class LayoutView extends PureComponent {
  private isDarwin: boolean = process.platform === 'darwin'

  public render(): ReactNode {
    const { children } = this.props
    return (
      <div className={classNames(styles.layout, { [styles.darwin]: this.isDarwin })}>
        {this.isDarwin && <div className={styles.dragArea} />}

        <div className={styles.content}>{children}</div>

        <Footer />
      </div>
    )
  }
}
