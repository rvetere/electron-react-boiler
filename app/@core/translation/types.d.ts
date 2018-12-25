import { GetTranslations } from '@graphql/types/generated'
import { ReactNode } from 'react'

export interface ITranslationProps {
  interpolations?: ReactNode[]
  children: string
}

export interface ITranslationRenderProps {
  keys: string | string[]
  errorReactNode?: ReactNode
  loadingReactNode?: ReactNode
  children: (getTranslation: TranslationFunc) => ReactNode
}

export type TranslationFunc = (key: string, interpolations?: Array<string | number>) => string

export interface ITranslations {
  [key: string]: string
}

export interface IGetTranslationParams {
  translation: GetTranslations.Translations
  interpolations: ReactNode[]
  search: string
}

export interface ITranslationProps {
  interpolations?: Array<string | ReactNode>
}

export interface ITransObj {
  de: string
  en: string
  fr: string
  it: string
}
