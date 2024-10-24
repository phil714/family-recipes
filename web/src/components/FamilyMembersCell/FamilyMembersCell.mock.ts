// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  familyMembers: [
    {
      __typename: 'FamilyMember' as const,
      id: '42',
      accessRole: 'ADMIN',
      familyId: '1',
      user: {
        email: 'test@test.com',
        name: 'Michel Tremblay',
      },
    },
    {
      __typename: 'FamilyMember' as const,
      id: '43',
      accessRole: 'VIEWER',
      familyId: '1',
      user: {
        email: 'test@test.com',
        name: 'Michel Tremblay',
      },
    },
    {
      __typename: 'FamilyMember' as const,
      id: '44',
      accessRole: 'USER',
      familyId: '1',
      user: {
        email: 'test@test.com',
        name: 'Michel Tremblay',
      },
    },
  ],
})
