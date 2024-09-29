import type {
  DeleteInvitationMutation,
  DeleteInvitationMutationVariables,
  FindInvitations,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Invitation/InvitationsCell'
import { truncate } from 'src/lib/formatters'

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

const InvitationsList = ({ invitations }: FindInvitations) => {
  const [deleteInvitation] = useMutation(DELETE_INVITATION_MUTATION, {
    onCompleted: () => {
      toast.success('Invitation deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteInvitationMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete invitation ' + id + '?')) {
      deleteInvitation({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Family id</th>
            <th>Access role</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {invitations.map((invitation) => (
            <tr key={invitation.id}>
              <td>{truncate(invitation.id)}</td>
              <td>{truncate(invitation.email)}</td>
              <td>{truncate(invitation.familyId)}</td>
              <td>{invitation.accessRole}</td> {/*TODO: translate */}
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.invitation({ id: invitation.id })}
                    title={'Show invitation ' + invitation.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editInvitation({ id: invitation.id })}
                    title={'Edit invitation ' + invitation.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete invitation ' + invitation.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(invitation.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default InvitationsList
