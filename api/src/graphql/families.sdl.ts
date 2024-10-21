export const schema = gql`
  type Family {
    id: String!
    name: String!
    description: String!
    recipes: [Recipe]!
    familyMembers: [FamilyMember]!
  }

  type Query {
    families: [Family!]! @requireAuth
    family(id: String!): Family @requireAuth
  }

  input CreateFamilyInput {
    name: String!
    description: String
  }

  input UpdateFamilyInput {
    name: String
    description: String
  }

  type Mutation {
    createFamily(input: CreateFamilyInput!): Family! @requireAuth
    updateFamily(id: String!, input: UpdateFamilyInput!): Family!
      @requireAuth(roles: ["ADMIN"])
    deleteFamily(id: String!): Family! @requireAuth(roles: ["ADMIN"])
  }
`
