import { useState } from 'react'

import { render, renderHook } from '@redwoodjs/testing/web'

import { Combobox } from './Combobox'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Combobox', () => {
  it('renders successfully', () => {
    const hook = renderHook(() => useState<string>(''))
    const [value, onChange] = hook.result.current

    expect(() => {
      render(
        <Combobox
          options={[
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' },
          ]}
          value={value}
          onChange={onChange}
        />
      )
    }).not.toThrow()
  })
})
