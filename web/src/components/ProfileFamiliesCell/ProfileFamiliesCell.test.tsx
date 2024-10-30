import { render } from '@redwoodjs/testing/web'

import { Loading, Failure, Success } from './ProfileFamiliesCell'
import { standard } from './ProfileFamiliesCell.mock'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//        https://redwoodjs.com/docs/testing#testing-cells
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('ProfileFamiliesCell', () => {
  it('renders Loading successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
  })

  // it('renders Success successfully', async () => {
  //   expect(() => {
  //     render(<Success profileFamilies={standard().profileFamilies} />)
  //   }).not.toThrow()
  // })
})
