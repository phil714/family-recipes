import { useCallback, useMemo } from 'react'

import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { t } from 'i18next'
import { MoreHorizontal } from 'lucide-react'
import type { DeleteRecipeMutationVariables, FindRecipes } from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { hasRole, useAuth } from 'src/auth'
import { Button } from 'src/components/Button'
import DataTable from 'src/components/DataTable/DataTable'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from 'src/components/DropdownMenu/DropdownMenu'
import { QUERY } from 'src/components/Recipe/RecipesCell'
import RecipeStatusDisplay from 'src/components/RecipeStatusDisplay/RecipeStatusDisplay'
import { truncate } from 'src/lib/formatters'

const DELETE_RECIPE_MUTATION = gql`
  mutation DeleteRecipeMutation($id: String!) {
    deleteRecipe(id: $id) {
      id
    }
  }
`

const RecipesList = ({ recipes }: FindRecipes) => {
  const { currentUser } = useAuth()

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

  const onDeleteClick = useCallback(
    (id: DeleteRecipeMutationVariables['id']) => {
      if (confirm('Are you sure you want to delete recipe ' + id + '?')) {
        deleteRecipe({ variables: { id } })
      }
    },
    [deleteRecipe]
  )

  const columnHelper = createColumnHelper<FindRecipes['recipes'][0]>()

  const data = useMemo(() => recipes, [recipes])

  const columns: ColumnDef<FindRecipes['recipes'][0]>[] = useMemo(() => {
    const IsRecipeCreator = (recipe: FindRecipes['recipes'][0]) => {
      const familyMember = currentUser.familyMembers.find(
        (fm) => fm.familyId === recipe.family.id
      )
      return (
        familyMember.accessRole === 'USER' &&
        recipe.familyMemberId === familyMember.id
      )
    }

    return [
      columnHelper.accessor((recipe) => recipe.status, {
        id: 'status',
        enableColumnFilter: false,
        enableSorting: false,
        enableResizing: false,
        size: 150,
        header: () => 'Status',
        cell: ({ getValue }) => (
          <div className="flex flex-none justify-center">
            <RecipeStatusDisplay status={getValue()} />
          </div>
        ),
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
          <>
            {(hasRole(['ADMIN'], currentUser, row.original.family.id) ||
              IsRecipeCreator(row.original)) && (
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
                  <Link to={routes.editRecipe({ id: row.original.id })}>
                    <DropdownMenuItem>{t('common:edit')}</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    onClick={() => onDeleteClick(row.original.id)}
                  >
                    {t('common:delete')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </>
        ),
      }),
    ]
  }, [columnHelper, onDeleteClick, currentUser])

  const table = useReactTable({
    data,
    columns,
    // onSortingChange: setSorting,
    // onColumnFiltersChange: setColumnFilters,
    getRowId: (original) => original.id,
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
    <DataTable
      table={table}
      onRowClick={(id) => navigate(routes.recipe({ id }))}
    />
  )
}

export default RecipesList
