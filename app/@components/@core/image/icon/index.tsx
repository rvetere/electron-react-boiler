import classNames from 'class-names'

import { IIconProps } from '@core/image/icon/types'
import aidKit from './components/AidKit'
import styles from './styles.css'

type JsxOrNull = JSX.Element | null

/* tslint:disable no-any variable-name */
export const wrapIcon = (Icon: any, { width = 16, height = 16, className }: IIconProps): JsxOrNull => (
  <Icon width={width} height={height} className={classNames(styles.digicon, className)} />
)

export const AidKit: React.SFC<IIconProps> = (props: IIconProps): JsxOrNull => wrapIcon(aidKit, props)
