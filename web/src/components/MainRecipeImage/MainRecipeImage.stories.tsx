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

import MainRecipeImage from './MainRecipeImage'

const meta: Meta<typeof MainRecipeImage> = {
  component: MainRecipeImage,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof MainRecipeImage>

export const Primary: Story = {}
