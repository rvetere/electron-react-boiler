import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import auth from './auth'
import lang from './lang'

// tslint:disable-next-line:no-any
export default function createRootReducer(history: any): any {
  return combineReducers({
    router: connectRouter(history),
    auth,
    lang
  })
}
