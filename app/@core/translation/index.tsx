import TranslationWithoutRenderProps from '@core/translation/translationWithoutRenderProps'
import TranslationWithRenderProps from '@core/translation/translationWithRenderProps'
import { ITranslationProps, ITranslationRenderProps } from '@core/translation/types'
import { PureComponent, ReactNode } from 'react'

export default class Translation extends PureComponent<ITranslationProps | ITranslationRenderProps> {
  public render(): ReactNode {
    if (typeof this.props.children === 'function') {
      const props = this.props as ITranslationRenderProps
      return <TranslationWithRenderProps keys={props.keys}>{props.children}</TranslationWithRenderProps>
    } else {
      const props = this.props as ITranslationProps
      return <TranslationWithoutRenderProps interpolations={props.interpolations}>{props.children}</TranslationWithoutRenderProps>
    }
  }
}
