import classNames from 'class-names'
import styles from './styles.css'

const LoadingCircle = ({ inverted = false, centered = false, width = '16px', height = '16px' }) => (
  <span
    className={classNames('loader', styles.spinner, {
      [styles.inverted]: inverted,
      [styles.centered]: centered
    })}
    style={{
      width,
      height
    }}
  />
)

export default LoadingCircle
