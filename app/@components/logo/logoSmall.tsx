import { Link } from '@core'
import { Stackbee } from '@core/image/icon'
import classNames from 'class-names'
import styles from './logoSmall.css'
import { ILogoSmallProps } from './types'

export const LogoSmall = ({ sticker }: ILogoSmallProps): JSX.Element => (
  <div title="home" className={classNames(styles.sticker, { [styles.nonSticker]: !sticker })}>
    {sticker && (
      <Link link="/">
        <Stackbee height={32} width={32} />
      </Link>
    )}
    {!sticker && <Stackbee height={32} width={32} />}
  </div>
)
