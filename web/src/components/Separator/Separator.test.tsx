import { render } from '@redwoodjs/testing/web'

import { Separator } from './Separator'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Separator', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Separator />)
    }).not.toThrow()
  })
})
