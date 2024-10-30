// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  familyInvitations: [
    {
      __typename: 'Invitation' as const,
      id: '42',
      accessRole: 'ADMIN' as const,
      email: 'test@test.com',
    },
    {
      __typename: 'Invitation' as const,
      id: '43',
      accessRole: 'ADMIN' as const,
      email: 'test@test.com',
    },
    {
      __typename: 'Invitation' as const,
      id: '44',
      accessRole: 'ADMIN' as const,
      email: 'test@test.com',
    },
  ],
})
