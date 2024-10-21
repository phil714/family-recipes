// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  allRecipes: [
    {
      __typename: 'AllRecipes' as const,
      id: 42,
    },
    {
      __typename: 'AllRecipes' as const,
      id: 43,
    },
    {
      __typename: 'AllRecipes' as const,
      id: 44,
    },
  ],
})
