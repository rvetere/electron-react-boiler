// tslint:disable:typedef
import { action } from 'typesafe-actions'

export const LANG_CHANGE = '@lang/CHANGE'

export const changeLanguage = (lang: string) => action(LANG_CHANGE, lang)
