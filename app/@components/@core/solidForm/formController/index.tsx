import logger from '@helpers/logger'
import noop from '@helpers/noop'
import { PureComponent, ReactNode } from 'react'
import { getFormValues, isFormValid, updateFormFields } from './helpers'
import { IFormControllerField, IFormControllerPayload, IFormControllerProps, IFormControllerState } from './types'

export class FormController extends PureComponent<IFormControllerProps, IFormControllerState> {
  public readonly state: IFormControllerState = { fields: {}, isLoading: false }

  public render(): ReactNode {
    const { children, className, hideWrappingFormTag = false } = this.props
    const childrenJsx = children({
      inputProps: {
        updateForm: this.updateForm,
        registerInput: this.registerInput,
        deRegisterInput: this.deRegisterInput
      },
      submitForm: this.submitForm,
      resetForm: this.resetForm,
      formState: this.state
    })

    if (hideWrappingFormTag) {
      return childrenJsx
    }

    return (
      <form className={className} onSubmit={this.handleSubmit}>
        {childrenJsx}
      </form>
    )
  }

  private updateForm = (submittedData: IFormControllerPayload): void => {
    const { onUpdate = noop } = this.props
    const { fields } = this.state

    if (fields.hasOwnProperty(submittedData.name)) {
      if (fields[submittedData.name].value !== submittedData.value) {
        this.setState(updateFormFields(submittedData), () => onUpdate(getFormValues(this.state.fields)))
      }
    } else {
      logger.warn(`Unregistered form input ${submittedData.name} attempted to update.`)
    }
  }

  private registerInput = (submittedData: IFormControllerPayload): void => {
    this.setState(updateFormFields(submittedData))
  }

  private deRegisterInput = (submittedData: IFormControllerPayload): void => {
    const { fields } = this.state
    delete fields[submittedData.name]
    this.setState({ fields })
  }

  private handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    this.submitForm()
  }

  private submitForm = async (): Promise<void> => {
    const { onSubmit = noop } = this.props
    const { fields } = this.state

    this.touchForm()
    if (isFormValid(fields)) {
      this.setState({ isLoading: true })
      try {
        await onSubmit(getFormValues(fields), this.resetForm)
        this.setState({ isLoading: false })
      } catch (e) {
        logger.error('Could not submit form!', e)
        this.setState({ isLoading: false })
      }
    } else {
      this.handleInvalid()
    }
  }

  private handleInvalid = (): void => {
    const { onInvalid = noop } = this.props
    onInvalid()
  }

  private touchForm = (): void => {
    const { fields } = this.state

    Object.values(fields).forEach(({ touch }: IFormControllerField): void => touch())
  }

  private resetForm = (): void => {
    const { onReset = noop } = this.props
    const { fields } = this.state

    Object.values(fields).forEach(({ reset }: IFormControllerField): void => reset())
    onReset()
  }
}
