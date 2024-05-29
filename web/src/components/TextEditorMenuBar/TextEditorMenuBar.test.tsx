import { render } from '@redwoodjs/testing/web'

import TextEditorMenuBar from './TextEditorMenuBar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TextEditorMenuBar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TextEditorMenuBar />)
    }).not.toThrow()
  })
})
