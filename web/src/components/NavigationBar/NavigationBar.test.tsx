import { render } from '@redwoodjs/testing/web'

import { NavigationBar } from './NavigationBar'
import { TooltipProvider } from '../Tooltip/Tooltip'

import 'src/i18n'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NavigationBar', () => {
  it('renders successfully', () => {
    mockCurrentUser({ id: '1', name: 'Michel Tremblay', email: 'micheltremblay@gmail.com' })

    expect(() => {
      render(
        <TooltipProvider delayDuration={0}><NavigationBar /></TooltipProvider>)
    }).not.toThrow()
  })
})
