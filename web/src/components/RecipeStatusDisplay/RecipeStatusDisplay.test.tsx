import { render } from '@redwoodjs/testing/web'

import RecipeStatusDisplay from './RecipeStatusDisplay'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RecipeStatusDisplay', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RecipeStatusDisplay />)
    }).not.toThrow()
  })
})
