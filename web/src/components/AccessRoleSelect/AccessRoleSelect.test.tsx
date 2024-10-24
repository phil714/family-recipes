import { noop } from '@tanstack/react-table'

import { render } from '@redwoodjs/testing/web'

import AccessRoleSelect from './AccessRoleSelect'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AccessRoleSelect', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AccessRoleSelect value={'ADMIN'} onChange={noop} />)
    }).not.toThrow()
  })
})
