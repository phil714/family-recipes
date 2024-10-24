import { useState } from 'react'

import { render, renderHook } from '@redwoodjs/testing/web'

import MultiSelect from './MultiSelect'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MultiSelect', () => {
  it('renders successfully', () => {
    const hook = renderHook(() => useState<string[]>([]))
    const [value, onChange] = hook.result.current

    expect(() => {
      render(
        <MultiSelect
          options={[
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
          ]}
          placeholder={'Select...'}
          value={value}
          onValueChange={onChange}
        />
      )
    }).not.toThrow()
  })
})
