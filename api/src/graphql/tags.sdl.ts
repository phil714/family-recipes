export const schema = gql`
  type Tag {
    id: String!
    name: String!
    color: String!
    recipes: [Recipe]!
  }

  type Query {
    tags: [Tag!]! @requireAuth
    tag(id: String!): Tag @requireAuth
  }

  input CreateTagInput {
    name: String!
    color: String!
  }

  input UpdateTagInput {
    name: String
    color: String
  }

  type Mutation {
    createTag(input: CreateTagInput!): Tag! @requireAuth
    updateTag(id: String!, input: UpdateTagInput!): Tag! @requireAuth
    deleteTag(id: String!): Tag! @requireAuth
  }
`
