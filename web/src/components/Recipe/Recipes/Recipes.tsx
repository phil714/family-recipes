import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useMemo } from 'react'
import { useReactTable, ColumnDef, createColumnHelper, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table'
import { Button } from 'src/components/Button'

import type {
  DeleteRecipeMutationVariables,
  FindRecipes,
} from 'types/graphql'

import { QUERY } from 'src/components/Recipe/RecipesCell'
import { truncate } from 'src/lib/formatters'
import DataTable from 'src/components/DataTable/DataTable'
import RecipeStatusDisplay from 'src/components/RecipeStatusDisplay/RecipeStatusDisplay'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from 'src/components/DropdownMenu/DropdownMenu'
import { MoreHorizontal } from 'lucide-react'
import { t } from 'i18next'

const DELETE_RECIPE_MUTATION = gql`
  mutation DeleteRecipeMutation($id: String!) {
    deleteRecipe(id: $id) {
      id
    }
  }
`

const RecipesList = ({ recipes }: FindRecipes) => {
  const [deleteRecipe] = useMutation(DELETE_RECIPE_MUTATION, {
    onCompleted: () => {
      toast.success('Recipe deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteRecipeMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete recipe ' + id + '?')) {
      deleteRecipe({ variables: { id } })
    }
  }

  const columnHelper = createColumnHelper<FindRecipes['recipes'][0]>();

  const data = useMemo(() => recipes, [recipes])

  const columns: ColumnDef<FindRecipes['recipes'][0]>[] = useMemo(
    () => [
      columnHelper.accessor((recipe) => recipe.status, {
        id: 'status',
        enableColumnFilter: false,
        enableSorting: false,
        enableResizing: false,
        size: 150,
        header: () => 'Status',
        cell: ({ getValue }) => <div className='flex flex-none justify-center'><RecipeStatusDisplay status={getValue()} /></div>,
      }),
      columnHelper.accessor((recipe) => recipe.name, {
        id: 'name',
        header: () => 'Name',
        cell: ({ getValue }) => getValue(),
        enableSorting: true,
        size: 220,
      }),
      columnHelper.accessor((recipe) => recipe.description, {
        id: 'description',
        header: () => 'Description',
        cell: ({ getValue }) => truncate(getValue()),
        enableColumnFilter: false,
        size: 300,
      }),
      columnHelper.accessor((recipe) => recipe.preparationTimeMinutes, {
        id: 'preparationTimeMinutes',
        header: () => 'Prep Time (min)',
        cell: ({ getValue }) => getValue(),
        enableSorting: true,
        sortingFn: 'alphanumeric',
        size: 150,
      }),
      columnHelper.accessor((recipe) => recipe.cookingTimeMinutes, {
        id: 'cookingTimeMinutes',
        header: () => 'Cook Time (min)',
        cell: ({ getValue }) => getValue(),
        enableSorting: true,
        sortingFn: 'alphanumeric',
        size: 150,
      }),
      columnHelper.accessor((recipe) => recipe.family.name, {
        id: 'family.name',
        header: () => 'Family',
        cell: ({ getValue }) => getValue(),
        enableColumnFilter: true,
        size: 200,
      }),
      columnHelper.accessor((recipe) => recipe.id, {
        id: 'actions',
        header: () => 'Actions',
        enableColumnFilter: false,
        enableSorting: false,
        size: 220,
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <Link to={routes.recipe({ id: row.original.id })}>
              <Button>Show</Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">{t("common:open-menu")}</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <Link to={routes.editRecipe({ id: row.original.id })}>
                  <DropdownMenuItem>{t("common:edit")}</DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => onDeleteClick(row.original.id)}>{t("common:delete")}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      }),
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    // onSortingChange: setSorting,
    // onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // onColumnVisibilityChange: setColumnVisibility,
    // onRowSelectionChange: setRowSelection,
    // state: {
    //   sorting,
    //   columnFilters,
    //   columnVisibility,
    //   rowSelection,
    // },
  })

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <DataTable table={table} />
    </div>
  )
}

export default RecipesList
