import type { FindInvitations, FindInvitationsVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Invitations from 'src/components/Invitation/Invitations'

export const QUERY: TypedDocumentNode<
  FindInvitations,
  FindInvitationsVariables
> = gql`
  query FindInvitations {
    invitations {
      id
      email
      familyId
      accessRole
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No invitations yet. '}
      <Link to={routes.newInvitation()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindInvitations>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  invitations,
}: CellSuccessProps<FindInvitations, FindInvitationsVariables>) => {
  return <Invitations invitations={invitations} />
}
