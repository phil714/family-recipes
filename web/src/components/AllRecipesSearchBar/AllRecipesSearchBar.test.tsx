import { noop } from '@tanstack/react-table'

import { render } from '@redwoodjs/testing/web'

import AllRecipesSearchBar from './AllRecipesSearchBar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AllRecipesSearchBar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AllRecipesSearchBar onChange={noop} />)
    }).not.toThrow()
  })
})
