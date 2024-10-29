import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { noop } from '@tanstack/react-table'
import { AccessRole } from 'types/graphql'

import { renderHook } from '@redwoodjs/testing/web'

import AccessRoleSelect from './AccessRoleSelect'

const meta: Meta<typeof AccessRoleSelect> = {
  component: AccessRoleSelect,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof AccessRoleSelect>

export const Primary: Story = {
  render: () => {
    // const hook = renderHook(() => useState<AccessRole>('USER'))
    // const [value, onChange] = hook.result.current

    return <AccessRoleSelect value={'USER'} onChange={noop} />
  },
}
