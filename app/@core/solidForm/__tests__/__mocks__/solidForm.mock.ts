import { IFormControllerInputProps, IFormControllerPayload } from '@core/solidForm/formController/types'

export const getValidFormData = () => ({
  one: {
    isValid: true,
    isTouched: false,
    value: 'one',
    reset: () => {},
    touch: () => {},
    focus: () => {}
  },
  two: {
    isValid: true,
    isTouched: false,
    value: 'two',
    reset: () => {},
    touch: () => {},
    focus: () => {}
  }
})

export const getInvalidFormData = () => ({
  one: {
    isValid: true,
    isTouched: false,
    value: 'one',
    reset: () => {},
    touch: () => {},
    focus: () => {}
  },
  two: {
    isValid: false,
    isTouched: false,
    value: 'two',
    reset: () => {},
    touch: () => {},
    focus: () => {}
  }
})

export const getInputProps = (): IFormControllerInputProps => ({
  updateForm: jest.fn(),
  registerInput: jest.fn(),
  deRegisterInput: jest.fn()
})

export const getInputPropsOverrideRegisterInput = (registerInput: (payload: IFormControllerPayload) => void): IFormControllerInputProps => ({
  updateForm: jest.fn(),
  registerInput: registerInput,
  deRegisterInput: jest.fn()
})
