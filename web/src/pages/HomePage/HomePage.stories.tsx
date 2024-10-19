import type { Meta, StoryObj } from '@storybook/react'
import { MockProviders } from '@redwoodjs/testing/web'
import HomePage from './HomePage'

const meta: Meta<typeof HomePage> = {
  component: HomePage,
}

export default meta

type Story = StoryObj<typeof HomePage>

export const Primary: Story = {
  render: () => <MockProviders>
    <HomePage />
  </MockProviders>
}
