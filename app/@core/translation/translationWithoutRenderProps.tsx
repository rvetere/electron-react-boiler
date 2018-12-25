import { ITranslationProps } from '@core/translation/types'
import { PureComponent, ReactNode } from 'react'
import { getInterpolatedTranslation } from './helpers'

export default class TranslationWithoutRenderProps extends PureComponent<ITranslationProps> {
  public render(): ReactNode {
    const { interpolations = [], children } = this.props

    const translation = children
    return interpolations.length ? getInterpolatedTranslation(translation, interpolations) : translation
  }
}
