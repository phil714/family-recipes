jest.mock('src/lib/file-upload')

import { I18nextProvider } from 'react-i18next'

import { MockProviders, render } from '@redwoodjs/testing/web'

import i18n from 'src/i18n'

import { InferredCurrentUser } from '../../../../.redwood/types/includes/all-currentUser'

import ProfilePage from './ProfilePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

export const user = {
  id: '1',
  name: 'Michel Tremblay',
  email: 'micheltremblay@gmail.com',
  isSuperAdmin: undefined,
  avatarUrl: 'https://picsum.photos/id/237/50',
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
      render(<ProfilePage />, {
        wrapper: ({ children }) => (
          <MockProviders>
            <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
          </MockProviders>
        ),
      })
    }).not.toThrow()
  })
})
