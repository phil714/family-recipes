export const schema = gql`
  type FamilyMember {
    id: String!
    userId: String! @requireAuth
    accessRole: AccessRole! @requireAuth
    familyId: String!
    family: Family!
    user: User! @requireAuth
    recipes: [Recipe]!
  }

  enum AccessRole {
    USER
    ADMIN
    VIEWER
  }

  type Query {
    familyMembers(familyId: String!): [FamilyMember!]! @requireAuth
    familyMember(id: String!): FamilyMember @requireAuth
  }

  input UpdateFamilyMemberInput {
    accessRole: AccessRole
  }

  type Mutation {
    updateFamilyMember(
      id: String!
      input: UpdateFamilyMemberInput!
    ): FamilyMember! @requireAuth(roles: "ADMIN")
    deleteFamilyMember(id: String!): FamilyMember! @requireAuth(roles: "ADMIN")
  }
`;
