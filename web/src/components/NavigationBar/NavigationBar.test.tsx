import { render } from '@redwoodjs/testing/web'

import { InferredCurrentUser } from '../../../../.redwood/types/includes/all-currentUser'
import { TooltipProvider } from '../Tooltip/Tooltip'

import { NavigationBar } from './NavigationBar'

import 'src/i18n'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

export const userContext = {
  id: '1',
  name: 'Michel Tremblay',
  email: 'micheltremblay@gmail.com',
  isSuperAdmin: undefined,
  roles: ['ADMIN'],
  familyMembers: [
    {
      id: '1',
      familyId: '1',
      accessRole: 'ADMIN',
    },
  ],
} satisfies InferredCurrentUser

describe('NavigationBar', () => {
  it('renders successfully', () => {
    mockCurrentUser(userContext)

    expect(() => {
      render(
        <TooltipProvider delayDuration={0}>
          <NavigationBar />
        </TooltipProvider>
      )
    }).not.toThrow()
  })
})
