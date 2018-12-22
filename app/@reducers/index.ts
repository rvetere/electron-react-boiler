import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
// import counter from './counter';

// tslint:disable-next-line:no-any
export default function createRootReducer(history: any): any {
  return combineReducers({
    router: connectRouter(history)
    // counter
  })
}
