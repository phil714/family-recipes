export const schema = gql`
  type User {
    id: String!
    email: String!
    name: String!
    language: String
    # familyMembers: [FamilyMember]!
  }

  input UpdateUserInput {
    email: String
    name: String
    language: String
  }

  type Query {
    user(id: String!): User @requireAuth
  }

  type Mutation {
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
  }
`
