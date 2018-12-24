import { ISelectOption } from './types'

export const getSelectedOption = (givenValue: string | number | null, options: ISelectOption[]): ISelectOption | undefined =>
  options.find(({ value }: ISelectOption): boolean => value === givenValue)
