import type { FindFamilyById, FindFamilyByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Family from 'src/components/Family/Family'

export const QUERY: TypedDocumentNode<FindFamilyById, FindFamilyByIdVariables> =
  gql`
    query FindFamilyById($id: String!) {
      family: family(id: $id) {
        id
        name
      }
    }
  `

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Family not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindFamilyByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  family,
}: CellSuccessProps<FindFamilyById, FindFamilyByIdVariables>) => {
  return <Family family={family} />
}
