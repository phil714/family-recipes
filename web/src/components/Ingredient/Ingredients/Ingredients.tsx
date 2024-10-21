import { useMemo } from 'react'

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
import type {
  DeleteIngredientMutationVariables,
  FindIngredients,
} from 'types/graphql'

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
import { QUERY } from 'src/components/Ingredient/IngredientsCell'
import TagDisplay from 'src/components/TagDisplay/TagDisplay'
import { truncate } from 'src/lib/formatters'

const DELETE_INGREDIENT_MUTATION = gql`
  mutation DeleteIngredientMutation($id: String!) {
    deleteIngredient(id: $id) {
      id
    }
  }
`

const IngredientsList = ({ ingredients }: FindIngredients) => {
  const [deleteIngredient] = useMutation(DELETE_INGREDIENT_MUTATION, {
    onCompleted: () => {
      toast.success('Ingredient deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteIngredientMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete ingredient ' + id + '?')) {
      deleteIngredient({ variables: { id } })
    }
  }

  const columnHelper = createColumnHelper<FindIngredients['ingredients'][0]>()

  const data = useMemo(() => ingredients, [ingredients])

  const columns: ColumnDef<FindIngredients['ingredients'][0]>[] = useMemo(
    () => [
      columnHelper.accessor((ingredient) => ingredient.name, {
        id: 'name',
        header: () => 'Name',
        cell: ({ getValue, row }) => <TagDisplay tag={row.original} />,
        enableSorting: true,
        size: 220,
      }),
      columnHelper.accessor((ingredient) => ingredient.description, {
        id: 'description',
        header: () => 'Description',
        cell: ({ getValue }) => getValue(),
        enableColumnFilter: false,
        size: 300,
      }),
      columnHelper.accessor((ingredient) => ingredient.id, {
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
                <Link to={routes.ingredient({ id: row.original.id })}>
                  <DropdownMenuItem>{t('common:open')}</DropdownMenuItem>
                </Link>
                <Link to={routes.editIngredient({ id: row.original.id })}>
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
    []
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
      onRowClick={(id) => navigate(routes.ingredient({ id }))}
    />
  )
}

export default IngredientsList
