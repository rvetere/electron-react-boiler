import { Fragment, ReactNode } from 'react'

export class TranslationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'TranslationError'
    this.message = message
  }
}

export const containsPlaceholder = (value: string): boolean => value.indexOf('[') !== -1
export const getPlaceholderIndex = (value: string): number => +value.slice(value.indexOf('[') + 1, value.indexOf(']'))
export const getTranslationParts = (translation: string): string[] =>
  translation
    .replace(/{/g, '[')
    .replace(/}/g, ']')
    .split(/(\[\d+\])/g)

export const getInterpolatedTranslation = (translation: string, interpolations: ReactNode[]): ReactNode => {
  const parts = getTranslationParts(translation)

  return parts.map((val: string, i: number) => {
    if (containsPlaceholder(val)) {
      const interpolation = interpolations[getPlaceholderIndex(val)]

      if (typeof interpolation === 'string' || typeof interpolation === 'number') {
        return interpolation
      }

      return <Fragment key={i}>{interpolation}</Fragment>
    }

    return val
  })
}
