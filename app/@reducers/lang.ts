import { LANG_CHANGE } from '@actions/lang'

// tslint:disable-next-line:no-any
export default (state: string, action: any): any => {
  switch (action.type) {
    case LANG_CHANGE:
      return action.payload
    default:
      return state || localStorage.getItem('lang') || 'de'
  }
}
