jest.mock('src/lib/file-upload')

import { noop } from '@tanstack/react-table'

import { render } from '@redwoodjs/testing/web'

import { FileInput } from './FileInput'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FileInput', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FileInput onChange={noop} />)
    }).not.toThrow()
  })
})
