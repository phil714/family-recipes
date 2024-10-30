import type { Meta, StoryObj } from '@storybook/react'

import { Avatar, AvatarFallback, AvatarImage } from './Avatar'

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Avatar>

export const Primary: Story = {
  render: () => {
    return (
      <Avatar className="h-20 w-20">
        <AvatarImage
          src={
            'https://styles.redditmedia.com/t5_2rdw8/styles/communityIcon_nosw8cfhlcn51.jpg?format=pjpg&s=6fd4f9571c6d8df1900cdb4214d9970de9275b41'
          }
        />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    )
  },
}
