// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import { InferredCurrentUser } from '../../../../.redwood/types/includes/all-currentUser'

import { FamilyMemberMenu } from './FamilyMemberMenu'

const userContext = {
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

const meta: Meta<typeof FamilyMemberMenu> = {
  component: FamilyMemberMenu,
  tags: ['autodocs'],
  args: {
    familyMember: { familyId: '1', id: '1' },
  },
}

export default meta

type Story = StoryObj<typeof FamilyMemberMenu>

export const Primary: Story = {
  render: (args) => {
    mockCurrentUser(userContext)
    return <FamilyMemberMenu {...args} />
  },
}
