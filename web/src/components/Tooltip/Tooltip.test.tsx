import { render } from '@redwoodjs/testing/web'

import { Tooltip, TooltipProvider } from './Tooltip'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Tooltip', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip />
        </TooltipProvider>
      )
    }).not.toThrow()
  })
})
