import { useCallback, useMemo } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type {
  LeaveFamilyMutation,
  LeaveFamilyMutationVariables,
  ProfileFamilies,
  ProfileFamiliesVariables,
} from 'types/graphql'

import {
  useMutation,
  type CellFailureProps,
  type CellSuccessProps,
  type TypedDocumentNode,
} from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { Button } from '../Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../Card'
import DataTable from '../DataTable/DataTable'
import { DropdownMenuItem } from '../DropdownMenu/DropdownMenu'
import { Skeleton } from '../Skeleton'
import { UserGroup } from '../UserGroup/UserGroup'

export const QUERY: TypedDocumentNode<
  ProfileFamilies,
  ProfileFamiliesVariables
> = gql`
  query ProfileFamilies {
    families {
      id
      name
      recipes {
        id
      }
      familyMembers {
        id
        user {
          id
          name
          email
          avatarUrl
        }
      }
    }
  }
`

const LEAVE_FAMILY_MUTATION: TypedDocumentNode<
  LeaveFamilyMutation,
  LeaveFamilyMutationVariables
> = gql`
  mutation LeaveFamilyMutation($id: String!) {
    leaveFamily(id: $id) {
      id
    }
  }
`

export const Loading = () => (
  <Layout>
    <Skeleton />
  </Layout>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ families }: CellSuccessProps<ProfileFamilies>) => {
  const { t } = useTranslation()

  const [leaveFamily] = useMutation(LEAVE_FAMILY_MUTATION, {
    onCompleted: () => {
      toast.success('Left family')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onLeaveClick = useCallback(
    (id: LeaveFamilyMutationVariables['id']) => {
      if (confirm('Are you sure you want to leave this family ' + id + '?')) {
        leaveFamily({ variables: { id } })
      }
    },
    [leaveFamily]
  )

  const columnHelper = createColumnHelper<ProfileFamilies['families'][0]>()

  const columns: ColumnDef<ProfileFamilies['families'][0]>[] = useMemo(
    () => [
      columnHelper.accessor((family) => family.name, {
        id: 'family',
        header: () => 'Family',
        cell: ({ getValue }) => getValue(),
        size: 150,
      }),
      columnHelper.accessor((family) => family.familyMembers.length, {
        id: 'members',
        header: () => 'Members',
        cell: ({ row }) => (
          <UserGroup users={row.original.familyMembers.map((fM) => fM.user)} />
        ),
        size: 150,
      }),
      columnHelper.accessor((family) => family.recipes.length, {
        id: 'recipes',
        header: () => 'Recipes',
        cell: ({ getValue }) => getValue(),
        size: 150,
      }),
      columnHelper.display({
        id: 'actions',
        header: () => t('common:actions'),
        enableColumnFilter: false,
        enableSorting: false,
        size: 150,
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
                <DropdownMenuItem onClick={() => onLeaveClick(row.original.id)}>
                  {t('profile:leave-family')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ),
      }),
    ],
    [columnHelper, onLeaveClick, t]
  )

  const table = useReactTable({
    data: families,
    columns,
    getRowId: (original) => original.id,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Layout>
      <DataTable table={table} />
    </Layout>
  )
}

export const Layout = ({ children }) => (
  <Card className="w-full min-w-80 sm:w-fit">
    <CardHeader>
      <CardTitle>Families</CardTitle>
      <CardDescription>Manage your families.</CardDescription>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
)
