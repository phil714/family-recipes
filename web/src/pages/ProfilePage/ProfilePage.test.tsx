import { render } from '@redwoodjs/testing/web'

import { InferredCurrentUser } from '../../../../.redwood/types/includes/all-currentUser'

import ProfilePage from './ProfilePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

export const user = {
  id: '1',
  name: 'Michel Tremblay',
  email: 'micheltremblay@gmail.com',
  isSuperAdmin: undefined,
}

export const userContext = {
  ...user,
  roles: ['ADMIN'],
  familyMembers: [
    {
      id: '1',
      familyId: '1',
      accessRole: 'ADMIN',
    },
  ],
} satisfies InferredCurrentUser

describe('ProfilePage', () => {
  it('renders successfully', () => {
    mockCurrentUser(userContext)
    expect(() => {
      render(<ProfilePage />)
    }).not.toThrow()
  })
})
