import { render } from '@redwoodjs/testing/web'

import TextEditor from './TextEditor'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TextEditor', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TextEditor />)
    }).not.toThrow()
  })
})
