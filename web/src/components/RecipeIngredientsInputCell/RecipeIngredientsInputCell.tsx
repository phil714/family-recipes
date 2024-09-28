import type { FindIngredients, FindIngredientsVariables, FindTags, FindTagsVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import MultiSelectFormField from 'src/components/MultiSelect/MultiSelect'

export const QUERY: TypedDocumentNode<FindIngredients, FindIngredientsVariables> = gql`
  query FindIngredients {
    ingredients {
      id
      name
      description
    }
  }
`
export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return <div className="rw-text-center">Empty</div>
}

export const Failure = ({ error }: CellFailureProps<FindTags>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

interface InputProps {
  onChange: (value: string[]) => void
  value: string[]
}

export const Success = ({
  ingredients,
  onChange,
  value,
}: CellSuccessProps<FindIngredients, FindIngredientsVariables> & InputProps) => {
  return (
    <MultiSelectFormField
      name="ingredients"
      options={ingredients.map((ingredient) => ({ value: ingredient.id, label: ingredient.name }))}
      defaultValue={value}
      onValueChange={onChange}
      placeholder="Select options"
      variant="inverted"
    />
  )
}
