// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  profileFamilies: [
    {
      __typename: 'ProfileFamilies' as const,
      id: 42,
    },
    {
      __typename: 'ProfileFamilies' as const,
      id: 43,
    },
    {
      __typename: 'ProfileFamilies' as const,
      id: 44,
    },
  ],
})
