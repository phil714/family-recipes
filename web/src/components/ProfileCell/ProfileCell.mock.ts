// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  profile: {
    __typename: 'User' as const,
    id: '1',
    name: 'Michel Tremblay',
    language: 'fr',
  },
})
