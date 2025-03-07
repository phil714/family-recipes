import type { Meta, StoryObj } from '@storybook/react'

import { Failure, Loading, Success } from './ProfileFamiliesCell'
import { standard } from './ProfileFamiliesCell.mock'

const meta: Meta = {
  title: 'Cells/ProfileFamiliesCell',
  tags: ['autodocs'],
}

export default meta

export const loading: StoryObj<typeof Loading> = {
  render: () => {
    return Loading ? <Loading /> : <></>
  },
}

export const failure: StoryObj<typeof Failure> = {
  render: (args) => {
    return Failure ? <Failure error={new Error('Oh no')} {...args} /> : <></>
  },
}

export const success: StoryObj<typeof Success> = {
  render: (args) => {
    return Success ? <Success {...standard()} {...args} /> : <></>
  },
}
