// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  recipeIngredientsInput: {
    __typename: "RecipeIngredientsInput" as const,
    id: 42,
  },
});
