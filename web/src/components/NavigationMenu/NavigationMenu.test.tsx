import { render } from '@redwoodjs/testing/web'

import NavigationMenu from './NavigationMenu'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NavigationMenu', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NavigationMenu />)
    }).not.toThrow()
  })
})
