import type { FindFamilies, FindFamiliesVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Families from 'src/components/Family/Families'

export const QUERY: TypedDocumentNode<
  FindFamilies,
  FindFamiliesVariables
> = gql`
  query FindFamilies {
    families {
      id
      name
      recipes {
        id
      }
      familyMembers {
        id
        user {
          id
          name
          email
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No families yet. '}
      <Link to={routes.newFamily()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindFamilies>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  families,
}: CellSuccessProps<FindFamilies, FindFamiliesVariables>) => {
  return <Families families={families} />
}
