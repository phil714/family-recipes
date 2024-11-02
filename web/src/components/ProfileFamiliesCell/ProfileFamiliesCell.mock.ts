// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  profileFamilies: [
    {
      __typename: 'ProfileFamilies' as const,
      id: 42,
      recipes: [
        {
          id: '1',
        },
      ],
      familyMembers: [
        {
          id: '1',
        },
      ],
    },
    {
      __typename: 'ProfileFamilies' as const,
      id: 43,
      recipes: [
        {
          id: '1',
        },
      ],
      familyMembers: [
        {
          id: '1',
        },
      ],
    },
    {
      __typename: 'ProfileFamilies' as const,
      id: 44,
      recipes: [
        {
          id: '1',
        },
      ],
      familyMembers: [
        {
          id: '1',
        },
      ],
    },
  ],
})
