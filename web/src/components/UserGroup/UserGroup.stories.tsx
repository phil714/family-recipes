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

import { UserGroup } from './UserGroup'

const meta: Meta<typeof UserGroup> = {
  component: UserGroup,
  tags: ['autodocs'],
  args: {
    users: [
      {
        email: 'test@test.com',
        name: 'John Smith',
      },
      {
        email: 'test@test.com',
        name: 'John Smith',
      },
      {
        email: 'test@test.com',
        name: 'John Smith',
      },
      {
        email: 'test@test.com',
        name: 'John Smith',
      },
      {
        email: 'test@test.com',
        name: 'John Smith',
      },
      {
        email: 'test@test.com',
        name: 'John Smith',
      },
      {
        email: 'test@test.com',
        name: 'John Smith',
      },
    ],
  },
}

export default meta

type Story = StoryObj<typeof UserGroup>

export const Primary: Story = {}
