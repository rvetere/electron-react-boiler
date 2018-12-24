import Circle from './circle'
import branch from '@decorators/branch'
import renderComponent from '@decorators/renderComponent'
import renderNothing from '@decorators/renderNothing'
import styles from './styles.css'

const isLoading = props => {
  if (props) {
    for (const key of Object.keys(props)) {
      if (props[key] && props[key].hasOwnProperty('loading') && props[key].loading) {
        return true
      }
    }
  }
  return false
}

export const Loading = () => (
  <span className={styles.loading}>
    <Circle />
  </span>
)

export const LoadingNoSpinner = branch(isLoading, renderNothing)

export default branch(isLoading, renderComponent(Loading))
