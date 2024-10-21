import { render } from '@redwoodjs/testing/web'

import AccessRoleSelect from './AccessRoleSelect'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AccessRoleSelect', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AccessRoleSelect />)
    }).not.toThrow()
  })
})
