// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  familyInvitations: [
    {
      __typename: 'FamilyInvitations' as const,
      id: 42,
    },
    {
      __typename: 'FamilyInvitations' as const,
      id: 43,
    },
    {
      __typename: 'FamilyInvitations' as const,
      id: 44,
    },
  ],
})
