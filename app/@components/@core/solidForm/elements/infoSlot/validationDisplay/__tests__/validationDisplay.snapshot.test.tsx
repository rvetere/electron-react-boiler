/* eslint-env jest */
import { getByClass } from '@testing/classQueries'
import { cleanup, render, waitForElement } from 'react-testing-library'
import { ValidationDisplay } from '..'
import { getValidationDisplayMock, validationMessage } from './__mocks__/validationDisplay.mock'

describe('ValidationDisplay', () => {
  afterEach(cleanup)
  const mockProps = getValidationDisplayMock()

  test('ValidationDisplay should render correctly', () => {
    const { container } = render(<ValidationDisplay {...mockProps} />)

    expect(container).toMatchSnapshot()
  })

  test('ValidationDisplay should show validation when touched', async () => {
    const { container, getByText } = render(
      <ValidationDisplay
        {...getValidationDisplayMock({
          config: {
            isValid: false,
            isTouched: true,
            hasValidation: true
          }
        })}
      />
    )

    const validationMessageEl = await waitForElement(() => getByClass(container, 'validationMessage'))
    expect(validationMessageEl).toBeTruthy()

    expect(container).toMatchSnapshot()
    expect(getByText(validationMessage)).toBeTruthy()
  })
})
