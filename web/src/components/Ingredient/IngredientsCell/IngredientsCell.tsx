import type { FindIngredients, FindIngredientsVariables } from "types/graphql";

import { Link, routes } from "@redwoodjs/router";
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from "@redwoodjs/web";

import Ingredients from "src/components/Ingredient/Ingredients";

export const QUERY: TypedDocumentNode<
  FindIngredients,
  FindIngredientsVariables
> = gql`
  query FindIngredients {
    ingredients {
      id
      name
      description
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No ingredients yet.{" "}
      <Link to={routes.newIngredient()} className="rw-link">
        Create one?
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps<FindIngredients>) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  ingredients,
}: CellSuccessProps<FindIngredients, FindIngredientsVariables>) => {
  return <Ingredients ingredients={ingredients} />;
};
