import type {
  EditInvitationById,
  UpdateInvitationInput,
  UpdateInvitationMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import InvitationForm from 'src/components/Invitation/InvitationForm'

export const QUERY: TypedDocumentNode<EditInvitationById> = gql`
  query EditInvitationById($id: String!) {
    invitation: invitation(id: $id) {
      id
      email
      familyId
      accessRole
    }
  }
`

const UPDATE_INVITATION_MUTATION: TypedDocumentNode<
  EditInvitationById,
  UpdateInvitationMutationVariables
> = gql`
  mutation UpdateInvitationMutation(
    $id: String!
    $input: UpdateInvitationInput!
  ) {
    updateInvitation(id: $id, input: $input) {
      id
      accessRole
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  invitation,
}: CellSuccessProps<EditInvitationById>) => {
  const [updateInvitation, { loading, error }] = useMutation(
    UPDATE_INVITATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Invitation updated')
        navigate(routes.invitations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateInvitationInput,
    id: EditInvitationById['invitation']['id']
  ) => {
    updateInvitation({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Invitation {invitation?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <InvitationForm
          invitation={invitation}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
