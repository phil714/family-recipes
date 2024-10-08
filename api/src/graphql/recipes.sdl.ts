export const schema = gql`
  type Recipe {
    id: String!
    name: String!
    description: String!
    instructions: String!
    preparationTimeMinutes: Int!
    cookingTimeMinutes: Int!
    familyId: String!
    family: Family!
    public: Boolean!
    tags: [Tag]!
    ingredients: [Ingredient]!
  }

  input AllRecipesSearchParams {
    searchText: String
    ingredientIds: [String!]
    tagIds: [String!]
  }

  type Query {
    recipes: [Recipe!]! @requireAuth
    recipe(id: String!): Recipe @skipAuth
    allRecipes(searchParams: AllRecipesSearchParams): [Recipe!]! @skipAuth
  }

  input CreateRecipeInput {
    name: String!
    description: String!
    ingredientIds: [String!]!
    instructions: String!
    preparationTimeMinutes: Int!
    cookingTimeMinutes: Int!
    public: Boolean!
    familyId: String!
    tagIds: [String!]!
  }

  input UpdateRecipeInput {
    name: String
    description: String
    ingredientIds: [String!]!
    instructions: String
    preparationTimeMinutes: Int
    cookingTimeMinutes: Int
    public: Boolean!
    familyId: String
    tagIds: [String!]!
  }

  type Mutation {
    createRecipe(input: CreateRecipeInput!): Recipe! @requireAuth
    updateRecipe(id: String!, input: UpdateRecipeInput!): Recipe! @requireAuth
    deleteRecipe(id: String!): Recipe! @requireAuth
  }
`
