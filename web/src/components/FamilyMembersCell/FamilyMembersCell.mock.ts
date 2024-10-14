// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  familyMembers: [
    {
      __typename: "FamilyMember" as const,
      id: "42",
    },
    {
      __typename: "FamilyMember" as const,
      id: "43",
    },
    {
      __typename: "FamilyMember" as const,
      id: "44",
    },
  ],
});
