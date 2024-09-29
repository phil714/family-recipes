import type {
  DeleteInvitationMutation,
  DeleteInvitationMutationVariables,
  FindInvitationById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_INVITATION_MUTATION: TypedDocumentNode<
  DeleteInvitationMutation,
  DeleteInvitationMutationVariables
> = gql`
  mutation DeleteInvitationMutation($id: String!) {
    deleteInvitation(id: $id) {
      id
    }
  }
`

interface Props {
  invitation: NonNullable<FindInvitationById['invitation']>
}

const Invitation = ({ invitation }: Props) => {
  const [deleteInvitation] = useMutation(DELETE_INVITATION_MUTATION, {
    onCompleted: () => {
      toast.success('Invitation deleted')
      navigate(routes.invitations())
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

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Invitation {invitation.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{invitation.id}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{invitation.email}</td>
            </tr>
            <tr>
              <th>Family id</th>
              <td>{invitation.familyId}</td>
            </tr>
            <tr>
              <th>Access role</th>
              <td>{invitation.accessRole}</td> {/*TODO: translate */}
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editInvitation({ id: invitation.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(invitation.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Invitation
