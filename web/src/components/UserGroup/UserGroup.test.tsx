import { render } from '@redwoodjs/testing/web'

import UserGroup from './UserGroup'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UserGroup', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserGroup />)
    }).not.toThrow()
  })
})
