import { ISelectOption } from '../../types'
import { unClearableOptions } from '../helpers'

describe('unClearableOptions', () => {
  test('must set all options to clearableValue=false', () => {
    const options = [{ label: 'option', value: 0, clearableValue: true }]
    const result = unClearableOptions(options).filter((o: ISelectOption): boolean => o.clearableValue === false)
    expect(result.length).toEqual(1)
  })
})
