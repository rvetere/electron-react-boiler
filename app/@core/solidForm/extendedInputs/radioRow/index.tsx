import { RadioOption } from '@core/solidForm/baseInputs/radioGroup/radio'
import { PureComponent } from 'react'
import styles from './styles.css'
import { IRadioRowProps } from './types'

export class RadioRow extends PureComponent<IRadioRowProps> {
  public render(): JSX.Element {
    const { optionValue, optionName, optionDetail, disabled, radioProps, checked = false } = this.props

    return (
      <div className={styles.radioRow}>
        <RadioOption value={optionValue} disabled={disabled} radioProps={radioProps} checked={checked}>
          <div className={styles.optionName}>{optionName}</div>
        </RadioOption>
        {optionDetail && <div className={styles.optionDetail}>{optionDetail}</div>}
      </div>
    )
  }
}
