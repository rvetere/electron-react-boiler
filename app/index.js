import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from './@pages/_root'
import { configureStore, history } from '@store/configureStore'
import { verifyToken } from '@components/withAuth'
import './app.global.css'
import { signIn } from '@actions/auth'

const store = configureStore({
  auth: null
})

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./@pages/_root', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./@pages/_root').default
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
