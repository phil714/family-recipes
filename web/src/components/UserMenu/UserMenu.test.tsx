import { render } from '@redwoodjs/testing/web'

import UserMenu from './UserMenu'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UserMenu', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserMenu />)
    }).not.toThrow()
  })
})
