import { Link, routes } from '@redwoodjs/router'
import { useTranslation } from 'react-i18next'

import { useAuth } from 'src/auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/components/DropdownMenu/DropdownMenu'
import { User } from 'src/components/User/User'
import { Button } from '../Button'
import { MoreHorizontal } from 'lucide-react'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { QUERY } from '../FamilyInvitationsCell/FamilyInvitationsCell'
import { DeleteInvitationMutationVariables } from 'types/graphql'

const DELETE_INVITATION_MUTATION = gql`
  mutation DeleteInvitationMutation($id: String!) {
    deleteInvitation(id: $id) {
      id
    }
  }
`

const RESEND_INVITATION_MUTATION = gql`
  mutation ResendInvitationMutation($id: String!, $input: ResendInvitationInput!) {
    resendInvitation(id: $id, input: $input) {
      id
    }
  }
`

interface Props {
  invitation: {
    id: string;
    familyId: string;
  }
}

export const FamilyInvitationMenu: React.FC<Props> = (props) => {
  const { invitation: { id, familyId } } = props;

  const { t } = useTranslation()

  const [deleteInvitation] = useMutation(DELETE_INVITATION_MUTATION, {
    onCompleted: () => {
      toast.success('Invitation deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY, variables: { familyId } }],
    awaitRefetchQueries: true,
  })

  const [resendInvitation] = useMutation(RESEND_INVITATION_MUTATION, {
    onCompleted: () => {
      toast.success('Invitation re-sent')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteInvitationMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete invitation ' + id + '?')) {
      deleteInvitation({ variables: { id } })
    }
  }

  const onResendClick = (id: DeleteInvitationMutationVariables['id']) => {
    const redirectUrl = new URL(
      routes.invitationAccept({ code: ':code' }),
      window.location.origin
    )
    resendInvitation({ variables: { id, input: { redirectUrl } } })
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
        <DropdownMenuItem onClick={() => onResendClick(id)}>{t("invitation:resend")}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDeleteClick(id)}>{t("common:delete")}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
