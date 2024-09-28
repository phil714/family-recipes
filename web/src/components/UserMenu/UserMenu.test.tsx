import { render } from '@redwoodjs/testing/web'

import { UserMenu } from './UserMenu'

import 'src/i18n'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UserMenu', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserMenu />)
    }).not.toThrow()
  })
})
