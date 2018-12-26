/* tslint:disable */

/** The `Upload` scalar type represents a file upload promise that resolves anobject containing `stream`, `filename`, `mimetype` and `encoding`. */
export type Upload = any

export interface Query {
  hello?: string | null
  csvData: CsvDataResponse
}

export interface CsvDataResponse {
  edges?: CsvDataEntity[] | null
  total?: number | null
}

export interface CsvDataEntity {
  hash: string
  userRef: string
  accountingId?: string | null
  taskType?: string | null
  documentName: string
  printDate: string
  printQuality: string
  copies: number
  paperType: string
  paperUsedM2?: string | null
  status?: string | null
  costs?: CostData[] | null
  createdAt: string
}

export interface CostData {
  blub?: string | null
}

export interface Mutation {
  signIn: SignInResponse
}

export interface SignInResponse {
  status: string
  token?: string | null
}

export interface UserEntity {
  name: string
  email: string
  password: string
  domain: string
  modules?: string[] | null
  roles?: string[] | null
  provider?: UserProvider | null
  owncloudMeta?: UserOwncloudMeta | null
  createdAt: string
  updatedAt?: string | null
  rememberPwCode?: string | null
  rememberPwCodeAt?: string | null
}

export interface UserProvider {
  blub?: string | null
}

export interface UserOwncloudMeta {
  blub?: string | null
}
export interface CsvDataQueryArgs {
  email: string
  limit?: number | null
  skip?: number | null
  sort?: string | null
}
export interface SignInMutationArgs {
  username: string
  password: string
}

export enum CacheControlScope {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}

export namespace GetWorld {
  export type Variables = {}

  export type Query = {
    __typename?: 'Query'
    hello?: string | null
  }
}

export namespace SignIn {
  export type Variables = {
    username: string
    password: string
  }

  export type Mutation = {
    __typename?: 'Mutation'
    signIn: SignIn
  }

  export type SignIn = {
    __typename?: 'SignInResponse'
    status: string
    token?: string | null
  }
}
