export const schema = gql`
  type Recipe {
    id: String!
    name: String!
    mainImageUrl: String!
    description: String!
    instructions: String!
    preparationTimeMinutes: Int!
    cookingTimeMinutes: Int!
    familyId: String!
    family: Family!
    status: RecipeStatus!
    tags: [Tag]!
    ingredients: [Ingredient]!
  }

  input AllRecipesSearchParams {
    searchText: String
    ingredientIds: [String!]
    tagIds: [String!]
  }

  input RecipesSearchParams {
    familyId: String
  }

  type Query {
    recipes(searchParams: RecipesSearchParams): [Recipe!]! @requireAuth
    recipe(id: String!): Recipe @skipAuth
    allRecipes(searchParams: AllRecipesSearchParams): [Recipe!]! @skipAuth
  }

  input CreateRecipeInput {
    name: String!
    mainImageUrl: String!
    description: String!
    ingredientIds: [String!]!
    instructions: String!
    preparationTimeMinutes: Int!
    cookingTimeMinutes: Int!
    status: RecipeStatus!
    familyId: String!
    tagIds: [String!]!
  }

  input UpdateRecipeInput {
    name: String
    mainImageUrl: String
    description: String
    ingredientIds: [String!]!
    instructions: String
    preparationTimeMinutes: Int
    cookingTimeMinutes: Int
    status: RecipeStatus!
    familyId: String
    tagIds: [String!]!
  }

  enum RecipeStatus {
    DRAFT
    PRIVATE
    PUBLIC
  }

  type Mutation {
    createRecipe(input: CreateRecipeInput!): Recipe!
      @requireAuth(roles: ["ADMIN", "USER"])
    updateRecipe(id: String!, input: UpdateRecipeInput!): Recipe!
      @requireAuth(roles: ["ADMIN", "USER"])
    deleteRecipe(id: String!): Recipe! @requireAuth(roles: ["ADMIN", "USER"])
  }
`
