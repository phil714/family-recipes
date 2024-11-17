import { useDeferredValue } from 'react'

import type { AllRecipesQuery, AllRecipesQueryVariables } from 'types/graphql'

import type {
  CellFailureProps,
  CellSuccessProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import AllRecipesRecipeDisplay from '../AllRecipesRecipeDisplay/AllRecipesRecipeDisplay'
import { AllRecipesRecipeDisplaySkeleton } from '../AllRecipesRecipeDisplay/AllRecipesRecipeDisplay.skeleton'

export const QUERY: TypedDocumentNode<
  AllRecipesQuery,
  AllRecipesQueryVariables
> = gql`
  query AllRecipesQuery($searchParams: AllRecipesSearchParams) {
    allRecipes(searchParams: $searchParams) {
      id
      name
      mainImageUrl
      description
      family {
        id
        name
      }
      ingredients {
        id
        name
        description
        color
      }
      tags {
        id
        name
        description
        color
      }
    }
  }
`

export const Loading = () => (
  <ul className="flex h-full w-full grid-cols-1 flex-wrap sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
    {Array.from({ length: 12 }).map((_, index) => (
      <AllRecipesRecipeDisplaySkeleton key={index} />
    ))}
  </ul>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ allRecipes }: CellSuccessProps<AllRecipesQuery>) => {
  const recipes = useDeferredValue(allRecipes)

  return (
    <ul className="flex h-full w-full grid-cols-1 flex-wrap sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
      {recipes?.map((item) => {
        return <AllRecipesRecipeDisplay recipe={item} key={item.id} />
      })}
    </ul>
  )
}
