const path = require('path')
const variables = require('./app/lib/@postcss/variables')
const forLoop = require('postcss-for')
const mixins = require('postcss-mixins')
const conditionals = require('postcss-conditionals')
const vars = require('postcss-simple-vars')
const functions = require('postcss-functions')
const cssNested = require('postcss-nested')
const cssNext = require('postcss-cssnext')
const postCssReporter = require('postcss-reporter')
const cssnano = require('cssnano')
const IS_DEV = process.env.NODE_ENV === 'development'

const plugins = [
  forLoop(),
  mixins({
    mixinsDir: path.join(process.cwd(), 'app', 'lib', '@postcss', 'mixins')
  }),
  vars({
    variables: () => variables
  }),
  functions({
    glob: path.join(process.cwd(), 'app', 'lib', '@postcss', 'functions', '*.js')
  }),
  conditionals(),
  cssNested(),
  cssNext({
    // Allow future CSS features to be used, also auto-prefixes the CSS...
    browsers: ['> 1%', 'last 2 versions', 'not ie <= 10'] // ...based on this browser list
  }),
  postCssReporter({
    // Posts messages from plugins to the terminal
    clearMessages: true
  })
]

if (!IS_DEV) {
  plugins.push(cssnano())
}

module.exports = {
  plugins
}
