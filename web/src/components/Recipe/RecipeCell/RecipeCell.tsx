import type { FindRecipeById, FindRecipeByIdVariables } from 'types/graphql'

import type {
  CellFailureProps,
  CellSuccessProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Recipe from 'src/components/Recipe/Recipe'

export const QUERY: TypedDocumentNode<FindRecipeById, FindRecipeByIdVariables> =
  gql`
    query FindRecipeById($id: String!) {
      recipe: recipe(id: $id) {
        id
        name
        mainImageUrl
        description
        instructions
        preparationTimeMinutes
        cookingTimeMinutes
        family {
          id
          name
        }
        tags {
          id
          name
          description
          color
        }
        ingredients {
          id
          name
          description
          color
        }
      }
    }
  `

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Recipe not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindRecipeByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  recipe,
}: CellSuccessProps<FindRecipeById, FindRecipeByIdVariables>) => {
  return <Recipe recipe={recipe} />
}
