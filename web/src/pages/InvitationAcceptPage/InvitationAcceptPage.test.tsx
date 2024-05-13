import { render } from '@redwoodjs/testing/web'

import InvitationAcceptPage from './InvitationAcceptPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('InvitationAcceptPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<InvitationAcceptPage />)
    }).not.toThrow()
  })
})
