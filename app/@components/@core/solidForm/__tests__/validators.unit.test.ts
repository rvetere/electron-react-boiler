import { containsUpperCase, isZip, longerThan5 } from '../validators'

describe('longerThan5()', () => {
  test('passing a string with exactly 5 chars fails', () => {
    expect(longerThan5('12345').isValid).toBe(false)
  })

  test('passing a string with less than 5 chars fails', () => {
    expect(longerThan5('123').isValid).toBe(false)
  })

  test('passing a string with more than 5 chars works :)', () => {
    expect(longerThan5('12345666').isValid).toBe(true)
  })
})

describe('containsUpperCase()', () => {
  test('passing a string with no uppercase characters fails', () => {
    expect(containsUpperCase('nnn').isValid).toBe(false)
  })

  test('passing a string made up entirely of uppercase characters works', () => {
    expect(containsUpperCase('NNN').isValid).toBe(true)
  })

  test('passing a string made up of mixed case characters works', () => {
    expect(containsUpperCase('nMn').isValid).toBe(true)
  })
})

describe('isZip()', () => {
  test('passing a string with non-numeric fails', () => {
    expect(isZip('nnn').isValid).toBe(false)
  })

  test('passing a string with less than 4 digits fails', () => {
    expect(isZip('123').isValid).toBe(false)
  })

  test('passing a string with 4 digits works', () => {
    expect(isZip('1234').isValid).toBe(true)
  })
})
