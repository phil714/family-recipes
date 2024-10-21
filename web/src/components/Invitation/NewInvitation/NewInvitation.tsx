import type {
  CreateInvitationMutation,
  CreateInvitationInput,
  CreateInvitationMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import InvitationForm from 'src/components/Invitation/InvitationForm'

const CREATE_INVITATION_MUTATION: TypedDocumentNode<
  CreateInvitationMutation,
  CreateInvitationMutationVariables
> = gql`
  mutation CreateInvitationMutation($input: CreateInvitationInput!) {
    createInvitation(input: $input) {
      id
    }
  }
`

interface Props {
  familyId: string
}

const NewInvitation = (props: Props) => {
  const [createInvitation, { loading, error }] = useMutation(
    CREATE_INVITATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Invitation created')
        navigate(routes.invitations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateInvitationInput) => {
    const redirectUrl = new URL(
      routes.invitationAccept({ code: ':code' }),
      window.location.origin
    )
    createInvitation({
      variables: {
        input: {
          ...input,
          redirectUrl: redirectUrl.toString(),
          familyId: props.familyId,
        },
      },
    })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Invitation</h2>
      </header>
      <div className="rw-segment-main">
        <InvitationForm
          onSave={onSave}
          loading={loading}
          error={error}
          familyId={props.familyId}
        />
      </div>
    </div>
  )
}

export default NewInvitation
