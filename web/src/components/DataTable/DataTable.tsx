import { flexRender, type Table as ITable } from '@tanstack/react-table'

import { cn } from 'src/lib/utils'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../Table'

interface Props<T> {
  table: ITable<T>
  onRowClick?: (id: string) => void
}

function DataTable<T>(props: Props<T>) {
  const { table } = props

  const handleRowClick = (id: string) => {
    if (props.onRowClick) {
      return (event: React.MouseEvent<HTMLTableRowElement>) => {
        props.onRowClick(id)
        event.stopPropagation()
      }
    }
  }

  return (
    <Table className="rounded border border-gray-200">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && 'selected'}
            className={cn(
              props.onRowClick &&
              'cursor-pointer hover:text-secondary-foreground'
            )}
            onClick={handleRowClick(row.id)}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
        {table.getRowModel().rows.length === 0 && (
          <TableRow>
            <TableCell colSpan={table.getFlatHeaders().length}>Empty</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default DataTable
