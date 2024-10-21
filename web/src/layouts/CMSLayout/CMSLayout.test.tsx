import { render } from '@redwoodjs/testing/web'

import CMSLayout from './CMSLayout'

import 'src/i18n'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CMSLayout', () => {
  it('renders successfully', () => {
    mockCurrentUser({
      id: '1',
      name: 'Michel Tremblay',
      email: 'micheltremblay@gmail.com',
    })

    expect(() => {
      render(<CMSLayout />)
    }).not.toThrow()
  })
})
