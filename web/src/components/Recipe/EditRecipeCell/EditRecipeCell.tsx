import type {
  EditRecipeById,
  UpdateRecipeInput,
  UpdateRecipeMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import RecipeForm from 'src/components/Recipe/RecipeForm'

export const QUERY: TypedDocumentNode<EditRecipeById> = gql`
  query EditRecipeById($id: String!) {
    recipe: recipe(id: $id) {
      id
      name
      description
      instructions
      preparationTimeMinutes
      cookingTimeMinutes
      familyId
    }
  }
`

const UPDATE_RECIPE_MUTATION: TypedDocumentNode<
  EditRecipeById,
  UpdateRecipeMutationVariables
> = gql`
  mutation UpdateRecipeMutation($id: String!, $input: UpdateRecipeInput!) {
    updateRecipe(id: $id, input: $input) {
      id
      name
      description
      instructions
      preparationTimeMinutes
      cookingTimeMinutes
      familyId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ recipe }: CellSuccessProps<EditRecipeById>) => {
  const [updateRecipe, { loading, error }] = useMutation(
    UPDATE_RECIPE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Recipe updated')
        navigate(routes.recipes())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateRecipeInput,
    id: EditRecipeById['recipe']['id']
  ) => {
    updateRecipe({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Recipe {recipe?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <RecipeForm
          recipe={recipe}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
