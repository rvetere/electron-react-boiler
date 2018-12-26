/**
 * Base webpack config used across other specific configs
 */

import path from 'path'
import webpack from 'webpack'
import { dependencies } from '../package.json'

export default {
  externals: [...Object.keys(dependencies || {})],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }
    ]
  },

  output: {
    path: path.join(__dirname, '..', 'app'),
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@actions': path.resolve(__dirname, '../app/@actions'),
      '@core': path.resolve(__dirname, '../app/@core'),
      '@pages': path.resolve(__dirname, '../app/@pages'),
      '@components': path.resolve(__dirname, '../app/@components'),
      '@actions': path.resolve(__dirname, '../app/@actions'),
      '@reducers': path.resolve(__dirname, '../app/@reducers'),
      '@store': path.resolve(__dirname, '../app/@store'),
      '@config': path.resolve(__dirname, '../app/lib/@config'),
      '@constants': path.resolve(__dirname, '../app/lib/@constants'),
      '@decorators': path.resolve(__dirname, '../app/lib/@decorators'),
      '@graphql': path.resolve(__dirname, '../app/lib/@graphql'),
      '@helpers': path.resolve(__dirname, '../app/lib/@helpers'),
      '@postcss': path.resolve(__dirname, '../app/lib/@postcss')
    }
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),

    new webpack.ProvidePlugin({
      React: 'react'
    }),

    new webpack.NamedModulesPlugin()
  ]
}
