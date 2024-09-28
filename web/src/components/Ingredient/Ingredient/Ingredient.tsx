import type {
  DeleteIngredientMutation,
  DeleteIngredientMutationVariables,
  FindIngredientById,
} from "types/graphql";

import { Link, routes, navigate } from "@redwoodjs/router";
import { useMutation } from "@redwoodjs/web";
import type { TypedDocumentNode } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/toast";

import {} from "src/lib/formatters";

const DELETE_INGREDIENT_MUTATION: TypedDocumentNode<
  DeleteIngredientMutation,
  DeleteIngredientMutationVariables
> = gql`
  mutation DeleteIngredientMutation($id: String!) {
    deleteIngredient(id: $id) {
      id
    }
  }
`;

interface Props {
  ingredient: NonNullable<FindIngredientById["ingredient"]>;
}

const Ingredient = ({ ingredient }: Props) => {
  const [deleteIngredient] = useMutation(DELETE_INGREDIENT_MUTATION, {
    onCompleted: () => {
      toast.success("Ingredient deleted");
      navigate(routes.ingredients());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = (id: DeleteIngredientMutationVariables["id"]) => {
    if (confirm("Are you sure you want to delete ingredient " + id + "?")) {
      deleteIngredient({ variables: { id } });
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Ingredient {ingredient.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{ingredient.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{ingredient.name}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{ingredient.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editIngredient({ id: ingredient.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(ingredient.id)}
        >
          Delete
        </button>
      </nav>
    </>
  );
};

export default Ingredient;
