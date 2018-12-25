import { SyntheticEvent } from 'react'

// TODO ...props sollte entfernt werden und die erlaubten Eigenschaften explizit hier aufgeführt werden
export interface IButtonProps {
  type?: string
  loading?: boolean
  primary?: boolean
  secondary?: boolean
  small?: boolean
  outline?: boolean
  big?: boolean
  inverted?: boolean
  block?: boolean
  mobileNoBlock?: boolean
  fullSize?: boolean
  disabled?: boolean
  title?: string
  tabIndex?: number
  onClick?: (event: SyntheticEvent) => void
  onMouseDown?: (event: SyntheticEvent) => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export interface IButtonStylings {
  className: string
  otherProps: object
}
