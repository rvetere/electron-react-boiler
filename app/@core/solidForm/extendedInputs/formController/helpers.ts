import {
  CurryUpdateState,
  IFormControllerField,
  IFormControllerFields,
  IFormControllerPayload,
  IFormControllerState,
  IFormValues
} from '../formController/types'

export const isFormValid = (fields: IFormControllerFields): boolean => Object.values(fields).every(({ isValid }: IFormControllerField): boolean => isValid)

export const getFormValues = (fields: IFormControllerFields): IFormValues =>
  Object.keys(fields).reduce(
    (accumulatedValues: {}, name: string): IFormValues => ({
      ...accumulatedValues,
      [name]: fields[name].value
    }),
    {}
  )

export const updateFormFields = ({ name, ...submittedFields }: IFormControllerPayload): CurryUpdateState => ({
  fields: previousFields
}: Pick<IFormControllerState, 'fields'>): Pick<IFormControllerState, 'fields'> => ({
  fields: {
    ...previousFields,
    [name]: {
      ...submittedFields
    }
  }
})
