import { TooltipProvider } from '@radix-ui/react-tooltip'

import { render } from '@redwoodjs/testing/web'

import TagDisplay from './TagDisplay'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TagDisplay', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <TooltipProvider>
          <TagDisplay
            tag={{
              id: '1',
              name: 'Chinese',
              color: '#FF0000',
              description: 'A traditional cuisine from China',
            }}
          />
        </TooltipProvider>
      )
    }).not.toThrow()
  })
})
