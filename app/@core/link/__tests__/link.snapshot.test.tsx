import React from 'react'
import renderer from 'react-test-renderer'
import { Link } from '../link'

describe('Link', () => {
  test('Link component should render correctly with absoluteUrl', async () => {
    const link = {
      absoluteUrl: '/some/action',
      parameters: []
    }
    const linkText = 'someText'
    const app = renderer.create(<Link link={link}>{linkText}</Link>)
    expect(app.toJSON()).toMatchSnapshot()
  })

  test('Link component should render correctly with route properties', () => {
    const link = {
      absoluteUrl: null,
      type: 'Sale',
      actionName: 'Default',
      actionValue: {
        id: 'someId',
        name: 'someName'
      },
      parameters: [
        {
          key: 'someKey',
          value: 'someValue'
        },
        {
          key: 'someOtherKey',
          value: 'someOtherValue'
        }
      ],
      anchor: null,
      sectorId: null
    }
    const linkText = 'someText'
    const app = renderer.create(<Link link={link}>{linkText}</Link>)

    expect(app.toJSON()).toMatchSnapshot()
  })
})
