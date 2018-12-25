import routes from '@constants/routes.json'
import React, { PureComponent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.css'

export default class Home extends PureComponent<{}> {
  public render(): ReactNode {
    return (
      <div className={styles.container} data-tid="container">
        <h1>Home</h1>
        <Link to={routes.STYLEGUIDE}>to Styleguide</Link>
      </div>
    )
  }
}
