import type { AllRecipesQuery, AllRecipesQueryVariables } from "types/graphql";

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from "@redwoodjs/web";
import AllRecipesRecipeDisplay from "../AllRecipesRecipeDisplay/AllRecipesRecipeDisplay";

export const QUERY: TypedDocumentNode<
  AllRecipesQuery,
  AllRecipesQueryVariables
> = gql`
  query AllRecipesQuery($searchParams: AllRecipesSearchParams) {
    allRecipes(searchParams: $searchParams) {
      id
      name
      description
      family {
        id
        name
      }
      ingredients {
        id
        name
      }
      tags {
        id
        name
        color
      }
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: "red" }}>Error: {error?.message}</div>
);

export const Success = ({ allRecipes }: CellSuccessProps<AllRecipesQuery>) => {
  return (
    <ul>
      {allRecipes.map((item) => {
        return <AllRecipesRecipeDisplay recipe={item} />;
      })}
    </ul>
  );
};
