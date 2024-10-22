import { useCallback, useMemo } from 'react'

import {
  useReactTable,
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table'
import { t } from 'i18next'
import { MoreHorizontal } from 'lucide-react'
import type { DeleteTagMutationVariables, FindTags } from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { Button } from 'src/components/Button'
import DataTable from 'src/components/DataTable/DataTable'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from 'src/components/DropdownMenu/DropdownMenu'
import { QUERY } from 'src/components/Tag/TagsCell'
import TagDisplay from 'src/components/TagDisplay/TagDisplay'

const DELETE_TAG_MUTATION = gql`
  mutation DeleteTagMutation($id: String!) {
    deleteTag(id: $id) {
      id
    }
  }
`

const TagsList = ({ tags }: FindTags) => {
  const [deleteTag] = useMutation(DELETE_TAG_MUTATION, {
    onCompleted: () => {
      toast.success('Tag deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = useCallback(
    (id: DeleteTagMutationVariables['id']) => {
      if (confirm('Are you sure you want to delete tag ' + id + '?')) {
        deleteTag({ variables: { id } })
      }
    },
    [deleteTag]
  )

  const columnHelper = createColumnHelper<FindTags['tags'][0]>()

  const data = useMemo(() => tags, [tags])

  const columns: ColumnDef<FindTags['tags'][0]>[] = useMemo(
    () => [
      columnHelper.accessor((tag) => tag.name, {
        id: 'name',
        header: () => 'Name',
        cell: ({ row }) => <TagDisplay tag={row.original} />,
        enableSorting: true,
        size: 220,
      }),
      columnHelper.accessor((tag) => tag.description, {
        id: 'description',
        header: () => 'Description',
        cell: ({ getValue }) => getValue(),
        enableColumnFilter: false,
        size: 150,
      }),
      columnHelper.accessor((tag) => tag.id, {
        id: 'actions',
        header: () => t('common:actions'),
        enableColumnFilter: false,
        enableSorting: false,
        size: 220,
        cell: ({ row }) => (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">{t('common:open-menu')}</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                onClick={(e) => e.stopPropagation()}
              >
                <DropdownMenuLabel>{t('common:actions')}</DropdownMenuLabel>
                <Link to={routes.tag({ id: row.original.id })}>
                  <DropdownMenuItem>{t('common:open')}</DropdownMenuItem>
                </Link>
                <Link to={routes.editTag({ id: row.original.id })}>
                  <DropdownMenuItem>{t('common:edit')}</DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  onClick={() => onDeleteClick(row.original.id)}
                >
                  {t('common:delete')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ),
      }),
    ],
    [columnHelper, onDeleteClick]
  )

  const table = useReactTable({
    data,
    columns,
    getRowId: (original) => original.id,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <DataTable
      table={table}
      onRowClick={(id) => navigate(routes.tag({ id }))}
    />
  )
}

export default TagsList
