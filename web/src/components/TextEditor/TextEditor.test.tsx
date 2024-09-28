import { render, renderHook } from '@redwoodjs/testing/web'
import { TextEditor } from './TextEditor'
import { useState } from 'react';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TextEditor', () => {
  it('renders successfully', () => {
    const hook = renderHook(() => useState(''))
    const [content, setContent] = hook.result.current;

    expect(() => {
      render(<TextEditor value={content} onChange={setContent} />)
    }).not.toThrow()
  })
})
