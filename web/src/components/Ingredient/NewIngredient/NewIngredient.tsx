import type {
  CreateIngredientMutation,
  CreateIngredientInput,
  CreateIngredientMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import IngredientForm from 'src/components/Ingredient/IngredientForm'

const CREATE_INGREDIENT_MUTATION: TypedDocumentNode<
  CreateIngredientMutation,
  CreateIngredientMutationVariables
> = gql`
  mutation CreateIngredientMutation($input: CreateIngredientInput!) {
    createIngredient(input: $input) {
      id
    }
  }
`

const NewIngredient = () => {
  const [createIngredient, { loading, error }] = useMutation(
    CREATE_INGREDIENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Ingredient created')
        navigate(routes.ingredients())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateIngredientInput) => {
    createIngredient({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Ingredient</h2>
      </header>
      <div className="rw-segment-main">
        <IngredientForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewIngredient
