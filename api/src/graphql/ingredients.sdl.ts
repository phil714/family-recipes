export const schema = gql`
  type Ingredient {
    id: String!
    name: String!
    color: String!
    description: String!
    tags: [Tag]!
  }

  type Query {
    ingredients: [Ingredient!]! @requireAuth
    ingredient(id: String!): Ingredient @requireAuth
  }

  input CreateIngredientInput {
    name: String!
    description: String!
  }

  input UpdateIngredientInput {
    name: String
    description: String
  }

  type Mutation {
    createIngredient(input: CreateIngredientInput!): Ingredient! @requireAuth
    updateIngredient(id: String!, input: UpdateIngredientInput!): Ingredient!
      @requireAuth
    deleteIngredient(id: String!): Ingredient! @requireAuth
  }
`
