import { Button } from '@core'
import {
  Checkbox,
  FieldWithLimitType,
  FormController,
  InputPassword,
  InputText,
  InputWithLimit,
  IRadioProps,
  RadioGroup,
  RadioOption,
  Select,
  TextArea
} from '@core/solidForm'
import { IFormControllerActions, IFormValues } from '@core/solidForm/formController/types'
import { LabelPosition } from '@core/solidForm/types'
import { containsUpperCase, longerThan5 } from '@core/solidForm/validators'
import gridCss from '@postcss/utils/grid.css'
import React, { PureComponent, ReactNode } from 'react'
import { getSelectOptions, selectOptions } from './helpers'
import styles from './styles.css'

export default class SolidFormSample extends PureComponent {
  public render(): ReactNode {
    const validators = [longerThan5, containsUpperCase]

    return (
      <FormController onSubmit={this.onSubmit} onUpdate={this.onUpdate} onInvalid={this.onInvalid}>
        {({ submitForm, resetForm, inputProps, formState }: IFormControllerActions): JSX.Element => (
          <>
            <br />
            <h3>Default inputs</h3>
            <div className={gridCss.row}>
              <fieldset className={gridCss.col8}>
                <InputText
                  required
                  autoFocus
                  name="basicInput"
                  inputProps={inputProps}
                  onClick={this.clickHandler}
                  validators={validators}
                  label="label"
                  labelAppendix="appendix"
                  placeholder="Hallohallo"
                  value="test"
                />
              </fieldset>
              <fieldset className={gridCss.col4}>
                <InputPassword required name="password" inputProps={inputProps} label="password" placeholder="a password" />
              </fieldset>
            </div>

            <TextArea required name="textArea" inputProps={inputProps} label="text area" placeholder="Hallohallo" />

            <br />

            <h3>With Limit</h3>
            <InputWithLimit
              type={FieldWithLimitType.TextArea}
              required
              name="basicInputLimit"
              inputProps={inputProps}
              label="limit input"
              placeholder="a limited text"
              limit={30}
            />

            <br />

            <h3>Select & Multi-Select</h3>
            <Select required name="select-single" placeholder="Single select" inputProps={inputProps} options={selectOptions} />
            <Select multi name="select-multi" placeholder="Multi select" inputProps={inputProps} options={selectOptions} label="multi" />
            <br />
            <Select
              multiCheckbox
              name="select-multi-checkbox"
              placeholder="Multi select checkbox"
              inputProps={inputProps}
              options={selectOptions}
              label="with checkbox options"
            />
            <br />
            <Select
              multiCheckbox
              name="select-multi-async"
              placeholder="Multi select checkbox, asnyc"
              inputProps={inputProps}
              loadOptions={getSelectOptions}
              label="async, searchable"
            />
            <br />
            <br />

            <h3>Checkboxes</h3>
            <Checkbox name={'checkbox0'} inputProps={inputProps} disabled>
              checkbox Label 0
            </Checkbox>
            <Checkbox name={'checkbox1'} inputProps={inputProps} checked disabled>
              checkbox Label 1
            </Checkbox>
            <Checkbox name={'checkbox2'} inputProps={inputProps} required>
              checkbox Label 2
            </Checkbox>
            <Checkbox name={'checkbox3'} inputProps={inputProps} checked labelPosition={LabelPosition.LabelLeft}>
              checkbox Label 3
            </Checkbox>
            <div style={{ background: '#e60020' }}>
              <Checkbox name={'checkbox4'} inputProps={inputProps} inverted>
                checkbox Label 4
              </Checkbox>
            </div>
            <div style={{ background: '#f67858' }}>
              <Checkbox name={'checkbox5'} inputProps={inputProps} checked inverted>
                checkbox Label 5
              </Checkbox>
            </div>
            <div style={{ background: '#dcb814' }}>
              <Checkbox name={'checkbox6'} inputProps={inputProps} checked inverted disabled>
                checkbox Label 6
              </Checkbox>
            </div>
            <div style={{ background: '#84d160' }}>
              <Checkbox name={'checkbox7'} inputProps={inputProps} inverted disabled>
                checkbox Label 7
              </Checkbox>
            </div>

            <br />
            <br />

            <h3>Radio Groups</h3>
            <RadioGroup name="radioGroup1" inputProps={inputProps} onClick={this.clickHandler} required>
              {(radioProps: IRadioProps): JSX.Element => (
                <>
                  <RadioOption disabled value="test1" radioProps={radioProps}>
                    test 1 Label
                  </RadioOption>
                  <RadioOption value="test2" radioProps={radioProps}>
                    test 2 Label
                  </RadioOption>
                  <RadioOption value="test3" labelPosition={LabelPosition.LabelLeft} radioProps={radioProps}>
                    test 3 Label
                  </RadioOption>
                  <div style={{ background: '#004478' }}>
                    <RadioOption inverted value="test4" radioProps={radioProps}>
                      test 4 Label
                    </RadioOption>
                  </div>
                  <div style={{ background: '#9014c5' }}>
                    <RadioOption inverted disabled value="test5" radioProps={radioProps}>
                      test 4 Label
                    </RadioOption>
                  </div>
                </>
              )}
            </RadioGroup>
            <RadioGroup name="radioGroup2" inputProps={inputProps} onClick={this.clickHandler} required sideBySide>
              {(radioProps: IRadioProps): JSX.Element => (
                <>
                  <RadioOption value="gender0" radioProps={radioProps}>
                    männlich
                  </RadioOption>
                  <RadioOption checked value="gender1" radioProps={radioProps}>
                    weiblich
                  </RadioOption>
                </>
              )}
            </RadioGroup>

            <h3>Inverted</h3>
            <div className={styles.inverted}>
              <InputText required inverted name="basicInput" inputProps={inputProps} label="label" labelAppendix="inverted" placeholder="inverted" />
              <Checkbox required name={'checkbox4'} inputProps={inputProps} inverted>
                checkbox Label 4
              </Checkbox>
            </div>

            <br />
            <br />
            <Button primary inverted type="submit" loading={formState.isLoading} onClick={submitForm}>
              Submit
            </Button>
            <Button outline inverted onClick={resetForm} disabled={formState.isLoading}>
              Reset
            </Button>
            <br />
            <br />
          </>
        )}
      </FormController>
    )
  }

  private clickHandler = (e: React.MouseEvent<HTMLInputElement>): void => {
    const input = e.target as HTMLInputElement
    const val = input.value
    // tslint:disable-next-line:no-console
    console.log('CLICK ', val)
  }

  private onSubmit(formData: IFormValues): Promise<void> {
    return new Promise(
      (resolve: () => void, _reject: () => void): void => {
        // tslint:disable-next-line:no-console
        console.log('START SUBMIT ', formData)
        setTimeout(() => {
          // tslint:disable-next-line:no-console
          console.log('END SUBMIT ', formData)
          resolve()
        }, 2000)
      }
    )
  }

  private onInvalid(): void {
    // tslint:disable-next-line:no-console
    console.log('REJECT')
  }

  private onUpdate = (): void => {
    // tslint:disable-next-line:no-console
    console.log('UPDATE')
  }
}
