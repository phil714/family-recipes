jest.mock('src/lib/file-upload')

import { I18nextProvider } from 'react-i18next'

import { MockProviders, render } from '@redwoodjs/testing/web'

import i18n from 'src/i18n'

import { Empty, Failure, Loading, Success } from './FamilyMembersCell'
import { standard } from './FamilyMembersCell.mock'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//        https://redwoodjs.com/docs/testing#testing-cells
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('FamilyMembersCell', () => {
  it('renders Loading successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })

  it('renders Empty successfully', async () => {
    expect(() => {
      render(<Empty />)
    }).not.toThrow()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
  })

  // When you're ready to test the actual output of your component render
  // you could test that, for example, certain text is present:
  //
  // 1. import { screen } from '@redwoodjs/testing/web'
  // 2. Add test: expect(screen.getByText('Hello, world')).toBeInTheDocument()

  it('renders Success successfully', async () => {
    expect(() => {
      render(<Success familyMembers={standard().familyMembers} />, {
        wrapper: ({ children }) => (
          <MockProviders>
            <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
          </MockProviders>
        ),
      })
    }).not.toThrow()
  })
})
