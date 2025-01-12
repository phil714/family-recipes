import { render } from '@redwoodjs/testing/web'

import MainRecipeImage from './MainRecipeImage'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MainRecipeImage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <MainRecipeImage
          recipe={{
            name: 'Tomate and Eggs',
            mainImageUrl: 'https://picsum.photos/200',
          }}
        />
      )
    }).not.toThrow()
  })
})
