import type {
  FindIngredientById,
  FindIngredientByIdVariables,
} from "types/graphql";

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from "@redwoodjs/web";

import Ingredient from "src/components/Ingredient/Ingredient";

export const QUERY: TypedDocumentNode<
  FindIngredientById,
  FindIngredientByIdVariables
> = gql`
  query FindIngredientById($id: String!) {
    ingredient: ingredient(id: $id) {
      id
      name
      description
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Ingredient not found</div>;

export const Failure = ({
  error,
}: CellFailureProps<FindIngredientByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  ingredient,
}: CellSuccessProps<FindIngredientById, FindIngredientByIdVariables>) => {
  return <Ingredient ingredient={ingredient} />;
};
