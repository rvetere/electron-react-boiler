/* tslint:disable */

/** The `Upload` scalar type represents a file upload promise that resolves anobject containing `stream`, `filename`, `mimetype` and `encoding`. */
export type Upload = any

export interface Query {
  hello?: string | null
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
