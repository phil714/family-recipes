import { useState } from 'react'

import { render, renderHook } from '@redwoodjs/testing/web'

import { Empty, Failure, Loading, Success } from './RecipeTagsInputCell'
import { standard } from './RecipeTagsInputCell.mock'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//        https://redwoodjs.com/docs/testing#testing-cells
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('RecipeTagsInputCell', () => {
  it('renders Loading successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })

  it('renders Empty successfully', async () => {
    expect(() => {
      render(<Empty />)
    }).not.toThrow()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} tags={[]} />)
    }).not.toThrow()
  })

  // When you're ready to test the actual output of your component render
  // you could test that, for example, certain text is present:
  //
  // 1. import { screen } from '@redwoodjs/testing/web'
  // 2. Add test: expect(screen.getByText('Hello, world')).toBeInTheDocument()

  it('renders Success successfully', async () => {
    const hook = renderHook(() => useState<string[]>([]))
    const [tagIds, setTagIds] = hook.result.current

    expect(() => {
      render(
        <Success value={tagIds} onChange={setTagIds} tags={standard().tags} />
      )
    }).not.toThrow()
  })
})
