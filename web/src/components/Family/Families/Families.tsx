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
import type { DeleteFamilyMutationVariables, FindFamilies } from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import { Button } from 'src/components/Button'
import DataTable from 'src/components/DataTable/DataTable'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from 'src/components/DropdownMenu/DropdownMenu'
import { QUERY } from 'src/components/Family/FamiliesCell'
import { UserGroup } from 'src/components/UserGroup/UserGroup'

const DELETE_FAMILY_MUTATION = gql`
  mutation DeleteFamilyMutation($id: String!) {
    deleteFamily(id: $id) {
      id
    }
  }
`

const FamiliesList = ({ families }: FindFamilies) => {
  const { currentUser } = useAuth()

  const [deleteFamily] = useMutation(DELETE_FAMILY_MUTATION, {
    onCompleted: () => {
      toast.success('Family deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteFamilyMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete family ' + id + '?')) {
      deleteFamily({ variables: { id } })
    }
  }

  const columnHelper = createColumnHelper<FindFamilies['families'][0]>()

  const data = useMemo(() => families, [families])

  const columns: ColumnDef<FindFamilies['families'][0]>[] = useMemo(
    () => [
      columnHelper.accessor((family) => family.name, {
        id: 'name',
        header: () => 'Name',
        cell: ({ getValue }) => getValue(),
        enableSorting: true,
        size: 220,
      }),
      columnHelper.accessor((family) => family.familyMembers.length, {
        id: 'members',
        header: () => 'Members',
        cell: ({ row }) => (
          <UserGroup users={row.original.familyMembers.map((fM) => fM.user)} />
        ),
        enableSorting: true,
        size: 220,
      }),
      columnHelper.accessor((family) => family.recipes.length, {
        id: 'recipes',
        header: () => 'Recipes',
        cell: ({ getValue }) => getValue(),
        enableSorting: true,
        size: 220,
      }),
      columnHelper.accessor((family) => family.id, {
        id: 'actions',
        header: () => 'Actions',
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
                <Link to={routes.editFamily({ id: row.original.id })}>
                  <DropdownMenuItem>{t('common:edit')}</DropdownMenuItem>
                </Link>
                {/* <DropdownMenuItem onClick={() => onDeleteClick(row.original.id)}>{t("common:delete")}</DropdownMenuItem> */}
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
      onRowClick={(id) => navigate(routes.editFamily({ id }))}
    />
  )
}

export default FamiliesList
