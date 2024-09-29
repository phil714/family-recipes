import { render } from '@redwoodjs/testing/web'

import { Command } from './Command'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Command', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Command />)
    }).not.toThrow()
  })
})
