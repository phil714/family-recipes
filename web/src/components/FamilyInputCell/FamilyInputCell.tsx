import type {
  FamilyInputCellData,
  FamilyInputCellDataVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import { Combobox } from '../Combobox/Combobox'

export const QUERY: TypedDocumentNode<
  FamilyInputCellData,
  FamilyInputCellDataVariables
> = gql`
  query FamilyInputCellData {
    families {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FamilyInputCellDataVariables>) => (
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
}: CellSuccessProps<FamilyInputCellData, FamilyInputCellDataVariables> &
  InputProps) => {
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
