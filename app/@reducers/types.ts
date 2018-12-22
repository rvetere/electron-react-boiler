import { Dispatch, Store } from 'redux'

export interface ICounterStateType {
  counter: number
}

export interface IAction {
  type: string
}

export type GetState = () => ICounterStateType

export type IDispatch = Dispatch<IAction>

export type IStore = Store<GetState, IAction>
