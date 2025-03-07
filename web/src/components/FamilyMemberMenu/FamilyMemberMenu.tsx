import React from 'react'

import { MoreHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { DeleteFamilyMemberMutationVariables } from 'types/graphql'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { hasRole, useAuth } from 'src/auth'
import { Button } from 'src/components/Button/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from 'src/components/DropdownMenu/DropdownMenu'

import { QUERY } from '../FamilyMembersCell/FamilyMembersCell'

const DELETE_FAMILY_MEMBER_MUTATION = gql`
  mutation DeleteFamilyMemberMutation($id: String!) {
    deleteFamilyMember(id: $id) {
      id
    }
  }
`

interface Props {
  familyMember: {
    id: string
    familyId: string
  }
}

export const FamilyMemberMenu: React.FC<Props> = (props) => {
  const {
    familyMember: { id, familyId },
  } = props
  const { currentUser } = useAuth()
  const { t } = useTranslation()

  const [deleteFamilyMember] = useMutation(DELETE_FAMILY_MEMBER_MUTATION, {
    onCompleted: () => {
      toast.success('Family member removed')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY, variables: { familyId } }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteFamilyMemberMutationVariables['id']) => {
    if (confirm('Are you sure you want to remove family member ' + id + '?')) {
      deleteFamilyMember({ variables: { id } })
    }
  }

  if (!hasRole('ADMIN', currentUser, familyId)) {
    return <React.Fragment />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">{t('common:open-menu')}</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuLabel>{t('common:actions')}</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => onDeleteClick(id)}>
          {t('common:remove')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
