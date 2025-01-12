jest.mock('src/lib/file-upload')

import { I18nextProvider } from 'react-i18next'

import { MockProviders, render } from '@redwoodjs/testing/web'

import i18n from 'src/i18n'

import { FamilyMemberMenu } from './FamilyMemberMenu'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FamilyMemberMenu', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FamilyMemberMenu familyMember={{ familyId: '1', id: '1' }} />, {
        wrapper: ({ children }) => (
          <MockProviders>
            <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
          </MockProviders>
        ),
      })
    }).not.toThrow()
  })
})
