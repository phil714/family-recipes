export const schema = gql`
  type Family {
    id: String!
    name: String!
    recipes: [Recipe]!
  }

  type Query {
    families: [Family!]! @requireAuth
    family(id: String!): Family @requireAuth
  }

  input CreateFamilyInput {
    name: String!
  }

  input UpdateFamilyInput {
    name: String
  }

  type Mutation {
    createFamily(input: CreateFamilyInput!): Family! @requireAuth
    updateFamily(id: String!, input: UpdateFamilyInput!): Family! @requireAuth
    deleteFamily(id: String!): Family! @requireAuth
  }
`
