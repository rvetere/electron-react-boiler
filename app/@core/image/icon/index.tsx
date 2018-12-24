import classNames from 'class-names'
import React from 'react'

import { IIconProps } from '@core/image/icon/types'
import checkbox from './components/Checkbox'
import checkboxActive from './components/CheckboxActive'
import chevronDown from './components/ChevronDown'
import chevronLeft from './components/ChevronLeft'
import chevronRight from './components/ChevronRight'
import chevronUp from './components/ChevronUp'
import close from './components/Close'
import eye from './components/Eye'
import eyeClosed from './components/EyeClosed'
import radio from './components/Radio'
import radioActive from './components/RadioActive'

import styles from './styles.css'

type JsxOrNull = JSX.Element | null

/* tslint:disable no-any variable-name */
export const wrapIcon = (Icon: any, { width = 16, height = 16, className }: IIconProps): JsxOrNull => (
  <Icon width={width} height={height} className={classNames(styles.digicon, className)} />
)

export const ChevronDown: React.SFC<IIconProps> = (props: IIconProps): JsxOrNull => wrapIcon(chevronDown, props)
export const ChevronLeft: React.SFC<IIconProps> = (props: IIconProps): JsxOrNull => wrapIcon(chevronLeft, props)
export const ChevronRight: React.SFC<IIconProps> = (props: IIconProps): JsxOrNull => wrapIcon(chevronRight, props)
export const ChevronUp: React.SFC<IIconProps> = (props: IIconProps): JsxOrNull => wrapIcon(chevronUp, props)
export const Checkbox: React.SFC<IIconProps> = (props: IIconProps): JsxOrNull => wrapIcon(checkbox, props)
export const CheckboxActive: React.SFC<IIconProps> = (props: IIconProps): JsxOrNull => wrapIcon(checkboxActive, props)
export const Close: React.SFC<IIconProps> = (props: IIconProps): JsxOrNull => wrapIcon(close, props)
export const Eye: React.SFC<IIconProps> = (props: IIconProps): JsxOrNull => wrapIcon(eye, props)
export const EyeClosed: React.SFC<IIconProps> = (props: IIconProps): JsxOrNull => wrapIcon(eyeClosed, props)
export const Radio: React.SFC<IIconProps> = (props: IIconProps): JsxOrNull => wrapIcon(radio, props)
export const RadioActive: React.SFC<IIconProps> = (props: IIconProps): JsxOrNull => wrapIcon(radioActive, props)
