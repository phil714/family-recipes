import { render } from '@redwoodjs/testing/web'

import AllRecipesRecipeDisplay from './AllRecipesRecipeDisplay'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AllRecipesRecipeDisplay', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <AllRecipesRecipeDisplay
          recipe={{
            id: '1',
            name: 'Test',
            description: 'Test',
            family: {
              id: '1',
              name: 'Test',
            },
            tags: [],
            ingredients: [],
          }}
        />
      )
    }).not.toThrow()
  })
})
