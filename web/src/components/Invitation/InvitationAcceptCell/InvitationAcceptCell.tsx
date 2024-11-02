import type {
  FindInvitationByCodeQuery,
  FindInvitationByCodeQueryVariables,
} from 'types/graphql'

import { Redirect, routes } from '@redwoodjs/router'
import type {
  CellFailureProps,
  CellSuccessProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

export const QUERY: TypedDocumentNode<
  FindInvitationByCodeQuery,
  FindInvitationByCodeQueryVariables
> = gql`
  query FindInvitationByCodeQuery($code: String!) {
    invitationByCode(code: $code) {
      userId
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

export const Success = ({
  invitationByCode,
  queryResult,
}: CellSuccessProps<
  FindInvitationByCodeQuery,
  FindInvitationByCodeQueryVariables
>) => {
  /* Redirect to Sign Up page if user does not exist, else add him to the family */
  if (invitationByCode.userId || !('variables' in queryResult)) {
    // already added to family
    return <Redirect to={routes.home()} />
  }
  return <Redirect to={routes.signup({ code: queryResult.variables.code })} />
}
