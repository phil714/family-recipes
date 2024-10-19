import { flexRender, type Table as ITable } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../Table';
import { cn } from 'src/lib/utils';

interface Props<T> {
  table: ITable<T>
  onRowClick?: (id: string) => void
}

function DataTable<T>(props: Props<T>) {
  const { table } = props;

  const handleRowClick = (id: string) => {
    if (props.onRowClick) {
      return (event: React.MouseEvent<HTMLTableRowElement>) => {
        props.onRowClick(id)
        event.stopPropagation()
      }
    }
  }

  return (
    <Table className='border border-gray-200 rounded'>
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
        {
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className={cn(props.onRowClick && 'hover:text-secondary-foreground cursor-pointer')}
              onClick={handleRowClick(row.id)}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;

