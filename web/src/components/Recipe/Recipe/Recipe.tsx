import type {
  DeleteRecipeMutation,
  DeleteRecipeMutationVariables,
  FindRecipeById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {} from 'src/lib/formatters'

const DELETE_RECIPE_MUTATION: TypedDocumentNode<
  DeleteRecipeMutation,
  DeleteRecipeMutationVariables
> = gql`
  mutation DeleteRecipeMutation($id: String!) {
    deleteRecipe(id: $id) {
      id
    }
  }
`

interface Props {
  recipe: NonNullable<FindRecipeById['recipe']>
}

const Recipe = ({ recipe }: Props) => {
  const [deleteRecipe] = useMutation(DELETE_RECIPE_MUTATION, {
    onCompleted: () => {
      toast.success('Recipe deleted')
      navigate(routes.recipes())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteRecipeMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete recipe ' + id + '?')) {
      deleteRecipe({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Recipe {recipe.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{recipe.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{recipe.name}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{recipe.description}</td>
            </tr>
            <tr>
              <th>Instructions</th>
              <td>{recipe.instructions}</td>
            </tr>
            <tr>
              <th>Preparation time minutes</th>
              <td>{recipe.preparationTimeMinutes}</td>
            </tr>
            <tr>
              <th>Cooking time minutes</th>
              <td>{recipe.cookingTimeMinutes}</td>
            </tr>
            <tr>
              <th>Family id</th>
              <td>{recipe.familyId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editRecipe({ id: recipe.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(recipe.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Recipe
