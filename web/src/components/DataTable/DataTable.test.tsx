import { getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { render, renderHook } from '@redwoodjs/testing/web'

import DataTable from './DataTable'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DataTable', () => {
  it('renders successfully', () => {
    expect(() => {
      const hook = renderHook(() =>
        useReactTable({
          columns: [],
          data: [],
          getCoreRowModel: getCoreRowModel(),
        })
      )

      render(<DataTable table={hook.result.current} />)
    }).not.toThrow()
  })
})
