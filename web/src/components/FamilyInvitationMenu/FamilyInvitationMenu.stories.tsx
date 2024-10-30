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

import { FamilyInvitationMenu } from './FamilyInvitationMenu'

const meta: Meta<typeof FamilyInvitationMenu> = {
  component: FamilyInvitationMenu,
  tags: ['autodocs'],
  args: {
    invitation: { familyId: '1', id: '1' },
  },
}

export default meta

type Story = StoryObj<typeof FamilyInvitationMenu>

export const Primary: Story = {}
