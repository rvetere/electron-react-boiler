/* eslint-env jest */
import { getByClass } from '@testing/classQueries'
import { cleanup, render, waitForElement } from 'react-testing-library'
import { Label } from '..'
import { ILabelProps } from '../types'

describe('Label', () => {
  afterEach(cleanup)
  const mockProps: ILabelProps = {
    label: 'a label',
    inverted: false
  }

  test('Label component should render correctly', () => {
    const { container } = render(<Label {...mockProps}>label text</Label>)

    expect(container).toMatchSnapshot()
  })

  test('Label should support appendix', async () => {
    const expected = 'addon'
    const { container, getByText } = render(
      <Label {...mockProps} appendix={expected}>
        label text
      </Label>
    )

    const appendix = await waitForElement(() => getByClass(container, 'appendix'))
    expect(appendix).toBeTruthy()

    expect(getByText(expected)).toBeTruthy()
  })
})
