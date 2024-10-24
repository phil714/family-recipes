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

import AccessRoleSelect from './AccessRoleSelect'

const meta: Meta<typeof AccessRoleSelect> = {
  component: AccessRoleSelect,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof AccessRoleSelect>

export const Primary: Story = {}
