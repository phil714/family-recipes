import type {
  FindInvitationByCodeQuery,
  FindInvitationByCodeQueryVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

export const QUERY: TypedDocumentNode<
  FindInvitationByCodeQuery,
  FindInvitationByCodeQueryVariables
> = gql`
  query FindInvitationByCodeQuery($id: String!) {
    invitationByCode(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindInvitationByCodeQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

{
  /* Redirect to Sign Up page if user does not exist, else add him to the family */
}
export const Success = ({
  invitationByCode,
}: CellSuccessProps<
  FindInvitationByCodeQuery,
  FindInvitationByCodeQueryVariables
>) => {
  return <div>{JSON.stringify(invitationByCode)}</div>
}
