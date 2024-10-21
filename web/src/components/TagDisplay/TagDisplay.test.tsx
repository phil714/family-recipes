import { render } from '@redwoodjs/testing/web'

import TagDisplay from './TagDisplay'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TagDisplay', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TagDisplay />)
    }).not.toThrow()
  })
})
