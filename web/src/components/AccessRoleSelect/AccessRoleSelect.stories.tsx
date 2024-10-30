import type { Meta, StoryObj } from '@storybook/react'
import { noop } from '@tanstack/react-table'

import AccessRoleSelect from './AccessRoleSelect'

const meta: Meta<typeof AccessRoleSelect> = {
  component: AccessRoleSelect,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof AccessRoleSelect>

export const Primary: Story = {
  render: () => {
    return <AccessRoleSelect value={'USER'} onChange={noop} />
  },
}
