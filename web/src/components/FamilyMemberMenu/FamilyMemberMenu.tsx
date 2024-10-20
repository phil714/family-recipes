import { MoreHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from 'src/components/DropdownMenu/DropdownMenu'
import { Button } from '../Button'
import { QUERY } from '../FamilyMembersCell/FamilyMembersCell'
import { toast } from '@redwoodjs/web/toast'
import { useMutation } from '@redwoodjs/web'

import { DeleteFamilyMemberMutationVariables } from 'types/graphql'

const DELETE_FAMILY_MEMBER_MUTATION = gql`
  mutation DeleteFamilyMemberMutation($id: String!) {
    deleteFamilyMember(id: $id) {
      id
    }
  }
`

interface Props {
  familyMember: {
    id: string;
  }
}

export const FamilyMemberMenu: React.FC<Props> = (props) => {
  const { familyMember: { id } } = props;
  const { t } = useTranslation()

  const [deleteFamilyMember] = useMutation(DELETE_FAMILY_MEMBER_MUTATION, {
    onCompleted: () => {
      toast.success('Family member removed')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteFamilyMemberMutationVariables['id']) => {
    if (confirm('Are you sure you want to remove family member ' + id + '?')) {
      deleteFamilyMember({ variables: { id } })
    }
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">{t("common:open-menu")}</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuLabel>{t("common:actions")}</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => onDeleteClick(id)}>{t("common:remove")}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
