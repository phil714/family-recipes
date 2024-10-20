export const schema = gql`
  type Tag {
    id: String!
    name: String!
    color: String!
    description: String!
    recipes: [Recipe]!
  }

  type Query {
    tags: [Tag!]! @requireAuth
    tag(id: String!): Tag @requireAuth
  }

  input CreateTagInput {
    name: String!
    color: String!
    description: String!
  }

  input UpdateTagInput {
    name: String
    color: String
    description: String
  }

  type Mutation {
    createTag(input: CreateTagInput!): Tag! @requireAuth
    updateTag(id: String!, input: UpdateTagInput!): Tag! @requireAuth
    deleteTag(id: String!): Tag! @requireAuth
  }
`
