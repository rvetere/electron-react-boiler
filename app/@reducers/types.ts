export interface ICounterStateType {
  counter: number
}

export interface IAction {
  type: string
}

export type GetState = () => ICounterStateType

export type Dispatch = ReduxDispatch<IAction>

export type Store = ReduxStore<GetState, IAction>
