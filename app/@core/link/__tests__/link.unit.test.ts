/* eslint-env jest */
import { checkAndApplyAnchor, checkAndApplyParameters, checkAndApplyParts } from '../helpers'

describe('Link test checkAndApplyParts', () => {
  test('without parameters the given url is returned', () => {
    expect(checkAndApplyParts('/some/action')).toBe('/some/action')
  })

  test('with empty parameters the given url is returned', () => {
    expect(checkAndApplyParts('/some/action', [])).toBe('/some/action')
  })

  test('single parameter is applied to a given url', () => {
    expect(checkAndApplyParts('/some', ['action'])).toBe('/some/action')
  })

  test('multiple parameters are applied to a given url', () => {
    expect(checkAndApplyParts('/some', ['other', 'action'])).toBe('/some/other/action')
  })
})

describe('Link test checkAndApplyParameters', () => {
  test('without parameter the given url is returned', () => {
    expect(checkAndApplyParameters('/someUrl/someAction')).toBe('/someUrl/someAction')
  })

  test('withth empty parameters array the given url is returned', () => {
    expect(checkAndApplyParameters('/someUrl/someAction', [])).toBe('/someUrl/someAction')
  })

  test('single parameter is applied to a given url', () => {
    expect(checkAndApplyParameters('/someUrl/someAction', [{ key: 'someKey', value: 'someValue' }])).toBe('/someUrl/someAction?someKey=someValue')
  })

  test('multiple parameters are applied to a given url', () => {
    expect(checkAndApplyParameters('/someUrl/someAction', [{ key: 'someKey', value: 'someValue' }, { key: 'someOtherKey', value: 'someOtherValue' }])).toBe(
      '/someUrl/someAction?someKey=someValue&someOtherKey=someOtherValue'
    )
  })
})

describe('Link test checkAndApplyAnchor', () => {
  test('with empty string as hash parameter the given url is returned', () => {
    expect(checkAndApplyAnchor('?key=value', '')).toBe('?key=value')
  })

  test('hash is applied to a given url', () => {
    expect(checkAndApplyAnchor('?key=value', 'someHash')).toBe('?key=value#someHash')
  })
})
