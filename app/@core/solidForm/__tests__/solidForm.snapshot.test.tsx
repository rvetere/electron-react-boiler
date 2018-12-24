/* eslint-env jest */
import { selectOptions } from '@misc/styleguide/solidForm/sample/helpers'
import { getByClass } from '@testing/classQueries'
import { ReactNode } from 'react'
import { cleanup, fireEvent, render, RenderResult, waitForElement } from 'react-testing-library'
import { Checkbox, FormController, IFormControllerActions, InputText, IRadioProps, RadioGroup, RadioOption, Select, TextArea } from '..'

enum InputTypes {
  InputText = 'InputText',
  Select = 'Select',
  Checkbox = 'Checkbox',
  RadioGroup = 'RadioGroup',
  TextArea = 'TextArea'
}

type FormRenderResult = RenderResult & {
  onUpdateMock: jest.Mock<{}>
  onResetMock: jest.Mock<{}>
  renderProps: IFormControllerActions
}

describe('FormController', () => {
  afterEach(cleanup)

  test('Integration: InputText child of FormController must display validationMessages on submit attempt', async () => {
    const { container, onUpdateMock, onResetMock, renderProps } = renderAndSubmitForm(InputTypes.InputText)
    let validationDisplay = await waitForElement(() => getByClass(container, 'validationMessage'))
    expect(validationDisplay).toBeTruthy()

    // check update functionality
    const inputEl = container.querySelector('input')
    fireEvent.change(inputEl!, { target: { value: 'a change' } })

    expect(onUpdateMock).toBeCalledTimes(1)

    // check reset functionality
    renderProps.resetForm()
    expect(onResetMock).toBeCalledTimes(1)
    expect(inputEl!.value).toEqual('')

    // check validationDisplay logic again after reset
    const formEl = container.querySelector('form')
    fireEvent.submit(formEl!)

    validationDisplay = await waitForElement(() => getByClass(container, 'validationMessage'))
    expect(validationDisplay).toBeTruthy()
  })

  test('Integration: Checkbox child of FormController must display validationMessages on submit attempt', async () => {
    const { container } = renderAndSubmitForm(InputTypes.Checkbox)
    const validationDisplay = await waitForElement(() => getByClass(container, 'validationMessage'))
    expect(validationDisplay).toBeTruthy()
  })

  test('Integration: RadioGroup child of FormController must display validationMessages on submit attempt', async () => {
    const { container } = renderAndSubmitForm(InputTypes.RadioGroup)
    const validationDisplay = await waitForElement(() => getByClass(container, 'validationMessage'))
    expect(validationDisplay).toBeTruthy()
  })

  test('Integration: Select child of FormController must display validationMessages on submit attempt', async () => {
    const { container } = renderAndSubmitForm(InputTypes.Select)
    const validationDisplay = await waitForElement(() => getByClass(container, 'validationMessage'))
    expect(validationDisplay).toBeTruthy()
  })

  test('Integration: TextArea child of FormController must display validationMessages on submit attempt', async () => {
    const { container } = renderAndSubmitForm(InputTypes.TextArea)
    const validationDisplay = await waitForElement(() => getByClass(container, 'validationMessage'))
    expect(validationDisplay).toBeTruthy()
  })
})

const getInputByType = (type: InputTypes, renderProps: IFormControllerActions): ReactNode => {
  switch (type) {
    case InputTypes.InputText:
      return <InputText name="inputText" label="InputText" inputProps={renderProps.inputProps} required />

    case InputTypes.TextArea:
      return <TextArea name="textArea" label="TextArea" inputProps={renderProps.inputProps} required />

    case InputTypes.Checkbox:
      return (
        <Checkbox name="checkbox" inputProps={renderProps.inputProps} required>
          a checkbox
        </Checkbox>
      )

    case InputTypes.RadioGroup:
      return (
        <RadioGroup name="radioGroup" inputProps={renderProps.inputProps} required>
          {(radioProps: IRadioProps): ReactNode => (
            <>
              <RadioOption disabled value="test1" radioProps={radioProps}>
                test 1 Label
              </RadioOption>
              <RadioOption value="test2" radioProps={radioProps}>
                test 2 Label
              </RadioOption>
            </>
          )}
        </RadioGroup>
      )

    case InputTypes.Select:
      return <Select name="select" label="Select" inputProps={renderProps.inputProps} required options={selectOptions} />
  }
}

const renderAndSubmitForm = (type: InputTypes = InputTypes.InputText): FormRenderResult => {
  const onSubmitMock = jest.fn()
  const onUpdateMock = jest.fn()
  const onInvalidMock = jest.fn()
  const onResetMock = jest.fn()

  let resultRenderProps: IFormControllerActions | null = null
  const result = render(
    <FormController onSubmit={onSubmitMock} onUpdate={onUpdateMock} onInvalid={onInvalidMock} onReset={onResetMock}>
      {(renderProps: IFormControllerActions): ReactNode => {
        expect(renderProps).toBeDefined()
        resultRenderProps = renderProps
        return getInputByType(type, renderProps)
      }}
    </FormController>
  )

  const formEl = result.container.querySelector('form')
  fireEvent.submit(formEl!)

  expect(onInvalidMock).toBeCalledTimes(1)
  expect(result.container).toMatchSnapshot()

  return { ...result, onUpdateMock, onResetMock, renderProps: resultRenderProps! }
}
