import type {
  EditIngredientById,
  UpdateIngredientInput,
  UpdateIngredientMutationVariables,
} from "types/graphql";

import { navigate, routes } from "@redwoodjs/router";
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from "@redwoodjs/web";
import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/toast";

import IngredientForm from "src/components/Ingredient/IngredientForm";

export const QUERY: TypedDocumentNode<EditIngredientById> = gql`
  query EditIngredientById($id: String!) {
    ingredient: ingredient(id: $id) {
      id
      name
      description
    }
  }
`;

const UPDATE_INGREDIENT_MUTATION: TypedDocumentNode<
  EditIngredientById,
  UpdateIngredientMutationVariables
> = gql`
  mutation UpdateIngredientMutation(
    $id: String!
    $input: UpdateIngredientInput!
  ) {
    updateIngredient(id: $id, input: $input) {
      id
      name
      description
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  ingredient,
}: CellSuccessProps<EditIngredientById>) => {
  const [updateIngredient, { loading, error }] = useMutation(
    UPDATE_INGREDIENT_MUTATION,
    {
      onCompleted: () => {
        toast.success("Ingredient updated");
        navigate(routes.ingredients());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );

  const onSave = (
    input: UpdateIngredientInput,
    id: EditIngredientById["ingredient"]["id"],
  ) => {
    updateIngredient({ variables: { id, input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Ingredient {ingredient?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <IngredientForm
          ingredient={ingredient}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  );
};
