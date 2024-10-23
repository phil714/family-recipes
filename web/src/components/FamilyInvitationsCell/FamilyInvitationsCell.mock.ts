// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  familyInvitations: [
    {
      __typename: 'FamilyMember' as const,
      id: '42',
      accessRole: 'ADMIN',
      email: 'test@test.com',
    },
    {
      __typename: 'FamilyMember' as const,
      id: '43',
      accessRole: 'ADMIN',
      email: 'test@test.com',
    },
    {
      __typename: 'FamilyMember' as const,
      id: '44',
      accessRole: 'ADMIN',
      email: 'test@test.com',
    },
  ],
})
