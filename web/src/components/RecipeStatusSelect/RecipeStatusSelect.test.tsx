import { render } from '@redwoodjs/testing/web'

import RecipeStatusSelect from './RecipeStatusSelect'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RecipeStatusSelect', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RecipeStatusSelect />)
    }).not.toThrow()
  })
})
