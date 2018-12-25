import { getInterpolatedTranslation } from '@core/translation/helpers'
import { ITranslationRenderProps, ITranslations } from '@core/translation/types'
import { PureComponent, ReactNode } from 'react'

export default class TranslationWithRenderProps extends PureComponent<ITranslationRenderProps> {
  public getTranslation = (key: string, interpolations?: ReactNode[]): string => {
    return interpolations && interpolations.length ? (getInterpolatedTranslation(key, interpolations) as string) : key
  }

  public render(): ReactNode {
    return this.props.children(this.getTranslation)
  }
}
