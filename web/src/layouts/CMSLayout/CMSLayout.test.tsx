import { render } from '@redwoodjs/testing/web'

import CMSLayout from './CMSLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CMSLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CMSLayout />)
    }).not.toThrow()
  })
})
