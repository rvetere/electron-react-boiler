import React from 'react'
import { Switch, Route } from 'react-router'
import { PrivateRoute } from '@components/withAuth'
import routes from '@constants/routes'
import App from '@pages/_app'
import Home from '@pages/home'
import Styleguide from '@pages/styleguide'

export default () => (
  <App>
    <Switch>
      <PrivateRoute path={routes.STYLEGUIDE} component={Styleguide} adminOnly />
      <Route path={routes.HOME} component={Home} />
    </Switch>
  </App>
)
