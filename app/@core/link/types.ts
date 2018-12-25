import { IButtonProps } from '@core'

export interface ILinkProps extends IButtonProps {
  link: string
  text: string
  target?: string
  rel?: string
  button?: boolean
  inverted?: boolean
  fullSize?: boolean
  onMouseDown?: () => void
  onMouseMove?: (event: React.MouseEvent) => void
}
