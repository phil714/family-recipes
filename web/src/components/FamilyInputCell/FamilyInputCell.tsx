import type { FindFamilies, FindFamiliesVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import { Combobox } from '../Combobox/Combobox'

export const QUERY: TypedDocumentNode<
  FindFamilies,
  FindFamiliesVariables
> = gql`
  query FindFamilies {
    families {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps<FindFamiliesVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

interface InputProps {
  onChange: (value: string) => void
  value: string
}

export const Success = ({
  families,
  onChange,
  value,
}: CellSuccessProps<FindFamilies, FindFamiliesVariables> & InputProps) => {
  return (
    <Combobox
      onChange={onChange}
      value={value}
      options={
        families.map((family) => ({
          value: family.id,
          label: family.name,
        })) || []
      }
    />
  )
}
