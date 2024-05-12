import type {
  FindInvitationById,
  FindInvitationByIdVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Invitation from 'src/components/Invitation/Invitation'

export const QUERY: TypedDocumentNode<
  FindInvitationById,
  FindInvitationByIdVariables
> = gql`
  query FindInvitationById($id: String!) {
    invitation: invitation(id: $id) {
      id
      email
      familyId
      accessRole
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Invitation not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindInvitationByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  invitation,
}: CellSuccessProps<FindInvitationById, FindInvitationByIdVariables>) => {
  return <Invitation invitation={invitation} />
}
