import { render } from '@redwoodjs/testing/web'

import InvitationAccept from './InvitationAccept'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('InvitationAccept', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<InvitationAccept />)
    }).not.toThrow()
  })
})
