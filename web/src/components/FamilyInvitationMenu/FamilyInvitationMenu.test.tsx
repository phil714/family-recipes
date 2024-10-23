import { render } from '@redwoodjs/testing/web'

import { FamilyInvitationMenu } from './FamilyInvitationMenu'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FamilyInvitationMenu', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FamilyInvitationMenu invitation={{ familyId: '1', id: '1' }} />)
    }).not.toThrow()
  })
})
