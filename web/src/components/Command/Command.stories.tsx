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

import Command from './Command'

const meta: Meta<typeof Command> = {
  component: Command,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Command>

export const Primary: Story = {}
