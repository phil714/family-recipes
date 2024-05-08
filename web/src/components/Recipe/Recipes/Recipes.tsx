import type {
  DeleteRecipeMutation,
  DeleteRecipeMutationVariables,
  FindRecipes,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Recipe/RecipesCell'
import { truncate } from 'src/lib/formatters'

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

const RecipesList = ({ recipes }: FindRecipes) => {
  const [deleteRecipe] = useMutation(DELETE_RECIPE_MUTATION, {
    onCompleted: () => {
      toast.success('Recipe deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteRecipeMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete recipe ' + id + '?')) {
      deleteRecipe({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Instructions</th>
            <th>Preparation time minutes</th>
            <th>Cooking time minutes</th>
            <th>Family id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe.id}>
              <td>{truncate(recipe.id)}</td>
              <td>{truncate(recipe.name)}</td>
              <td>{truncate(recipe.description)}</td>
              <td>{truncate(recipe.instructions)}</td>
              <td>{truncate(recipe.preparationTimeMinutes)}</td>
              <td>{truncate(recipe.cookingTimeMinutes)}</td>
              <td>{truncate(recipe.familyId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.recipe({ id: recipe.id })}
                    title={'Show recipe ' + recipe.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editRecipe({ id: recipe.id })}
                    title={'Edit recipe ' + recipe.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete recipe ' + recipe.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(recipe.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecipesList
