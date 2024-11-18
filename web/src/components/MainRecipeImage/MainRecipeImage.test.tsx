import { render } from '@redwoodjs/testing/web'

import MainRecipeImage from './MainRecipeImage'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MainRecipeImage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MainRecipeImage />)
    }).not.toThrow()
  })
})
