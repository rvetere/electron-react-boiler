import { getFormValues, isFormValid } from '../formController/helpers'
import { getInvalidFormData, getValidFormData } from './__mocks__/solidForm.mock'

describe('isFormValid()', () => {
  test('testing a valid form returns false', () => {
    expect(isFormValid(getValidFormData())).toBe(true)
  })

  test('testing an invalid form returns false', () => {
    expect(isFormValid(getInvalidFormData())).toBe(false)
  })
})

describe('getFormValues()', () => {
  test('gathering form data from valid form', () => {
    const expected = {
      one: 'one',
      two: 'two'
    }
    expect(getFormValues(getValidFormData())).toEqual(expected)
  })
})
