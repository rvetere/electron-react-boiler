const colors = require('../@config/css/colors')
const cssConfig = require('../@config/css/cssConfig')
const breakpoints = require('../@config/css/breakpoints')
const transitions = require('../@config/css/transitions')
const spacings = require('../@config/css/spacings')
const fontSizes = require('../@config/css/fontSizes')
const fontWeights = require('../@config/css/fontWeights')
const zIndexes = require('../@config/css/zIndexes')

const flatten = variables => {
  const flattened = {}
  Object.keys(variables).forEach(key => {
    const value = variables[key]
    if (typeof value === 'object') {
      Object.keys(value).forEach(valueKey => {
        flattened[key + valueKey.charAt(0).toUpperCase() + valueKey.slice(1)] = value[valueKey]
      })
    }
  })
  return flattened
}

const prefix = (prefix, variables) => {
  const transformed = {}
  Object.keys(variables).forEach(key => {
    transformed[prefix + (key.charAt(0).toUpperCase() + key.slice(1))] = variables[key]
  })
  return transformed
}

const variables = {
  ...cssConfig,
  ...colors,
  ...prefix('breakpoint', flatten(breakpoints)),
  ...prefix('transition', flatten(transitions)),
  ...prefix('spacing', spacings),
  ...prefix('fontSize', fontSizes),
  ...prefix('fontWeight', fontWeights),
  ...prefix('zIndex', zIndexes)
}

module.exports = variables
