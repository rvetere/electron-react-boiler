/* tslint:disable */

export const isValueOnWindowDefined = (value: string): boolean => typeof window[value] !== 'undefined'

export default (): boolean => typeof window !== 'undefined'
