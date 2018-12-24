/* eslint-env jest */
import { getByClass } from '@testing/classQueries'
import { ReactNode } from 'react'
import { cleanup, render, waitForElement } from 'react-testing-library'
import { InfoSlot } from '..'
import { getInfoSlotMock } from '../__mocks__/infoSlot.mock'

describe('InfoSlot', () => {
  afterEach(cleanup)
  const mockProps = getInfoSlotMock()

  test('InfoSlot should render correctly', async () => {
    const { container } = render(<InfoSlot {...mockProps} />)

    const validationMessageEl = await waitForElement(() => getByClass(container, 'validationMessage'))
    expect(validationMessageEl).toBeTruthy()

    expect(container).toMatchSnapshot()
  })

  test('InfoSlot should render override when given', async () => {
    const { container, getByText } = render(
      <InfoSlot
        {...getInfoSlotMock({
          slotOverride: (): ReactNode => <div>an override</div>
        })}
      />
    )

    expect(container).toMatchSnapshot()
    expect(getByText('an override')).toBeTruthy()
  })
})
