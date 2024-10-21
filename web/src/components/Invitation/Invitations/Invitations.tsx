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
  DeleteInvitationMutationVariables,
  FindInvitations,
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
import { QUERY } from 'src/components/Invitation/InvitationsCell'
import { truncate } from 'src/lib/formatters'

const DELETE_INVITATION_MUTATION = gql`
  mutation DeleteInvitationMutation($id: String!) {
    deleteInvitation(id: $id) {
      id
    }
  }
`

const InvitationsList = ({ invitations }: FindInvitations) => {
  const [deleteInvitation] = useMutation(DELETE_INVITATION_MUTATION, {
    onCompleted: () => {
      toast.success('Invitation deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteInvitationMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete invitation ' + id + '?')) {
      deleteInvitation({ variables: { id } })
    }
  }

  const columnHelper = createColumnHelper<FindInvitations['invitations'][0]>()

  const data = useMemo(() => invitations, [invitations])

  const columns: ColumnDef<FindInvitations['invitations'][0]>[] = useMemo(
    () => [
      columnHelper.accessor((invitation) => invitation.email, {
        id: 'email',
        header: () => 'Email',
        cell: ({ getValue }) => getValue(),
        enableSorting: true,
        size: 220,
      }),
      columnHelper.accessor((invitation) => invitation.family.name, {
        id: 'family',
        header: () => 'Family',
        cell: ({ getValue }) => getValue(),
        enableSorting: true,
        size: 220,
      }),
      columnHelper.accessor((invitation) => invitation.accessRole, {
        id: 'accessRole',
        header: () => 'Access Role',
        cell: ({ getValue }) => getValue(), // TODO: translate
        size: 200,
      }),
      columnHelper.accessor((invitation) => invitation.id, {
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
                <Link to={routes.editInvitation({ id: row.original.id })}>
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
      onRowClick={(id) => navigate(routes.editInvitation({ id }))}
    />
  )
}

export default InvitationsList
