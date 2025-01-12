import { render } from '@redwoodjs/testing/web'

import { InferredCurrentUser } from '../../../../.redwood/types/includes/all-currentUser'

import CMSLayout from './CMSLayout'

import 'src/i18n'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

export const userContext = {
  id: '1',
  name: 'Michel Tremblay',
  email: 'micheltremblay@gmail.com',
  isSuperAdmin: undefined,
  roles: ['ADMIN'],
  avatarUrl: 'https://picsum.photos/id/237/50',
  familyMembers: [
    {
      id: '1',
      familyId: '1',
      accessRole: 'ADMIN',
    },
  ],
} satisfies InferredCurrentUser

describe('CMSLayout', () => {
  it('renders successfully', () => {
    mockCurrentUser(userContext)

    expect(() => {
      render(<CMSLayout />)
    }).not.toThrow()
  })
})
