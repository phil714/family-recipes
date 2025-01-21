import { RecipeStatus, type Recipe } from '@prisma/client'

import {
  allRecipes,
  createRecipe,
  deleteRecipe,
  recipe,
  recipes,
  updateRecipe,
} from './recipes'
import {
  userContext,
  userContext2,
  type StandardScenario,
} from './recipes.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('recipes', () => {
  scenario('returns private recipes', async (scenario: StandardScenario) => {
    mockCurrentUser(userContext)
    const result = await recipes()

    expect(result.length).toEqual(Object.keys(scenario.recipe).length)
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining(scenario.recipe.one),
        expect.objectContaining(scenario.recipe.two),
      ])
    )
  })

  scenario('returns all recipes', async (scenario: StandardScenario) => {
    const result = await allRecipes()

    expect(result.length).toEqual(1)
    expect(result).toEqual(
      expect.arrayContaining([expect.objectContaining(scenario.recipe.two)])
    )
  })

  scenario('returns a single recipe', async (scenario: StandardScenario) => {
    const result = await recipe({ id: scenario.recipe.one.id })

    expect(result).toEqual(scenario.recipe.one)
  })

  scenario('creates a recipe', async (scenario: StandardScenario) => {
    mockCurrentUser(userContext)
    const result = await createRecipe({
      input: {
        name: 'String',
        mainImageUrl: 'String',
        description: 'String',
        instructions: 'String',
        preparationTimeMinutes: 2652393,
        cookingTimeMinutes: 7232567,
        familyId: scenario.recipe.two.familyId,
        status: RecipeStatus.DRAFT,
        tagIds: [scenario.tag.one.id, scenario.tag.two.id],
        ingredientIds: [scenario.ingredient.one.id, scenario.ingredient.two.id],
      },
    })

    expect(result.name).toEqual('String')
    expect(result.description).toEqual('String')
    expect(result.instructions).toEqual('String')
    expect(result.preparationTimeMinutes).toEqual(2652393)
    expect(result.cookingTimeMinutes).toEqual(7232567)
    expect(result.familyId).toEqual(scenario.recipe.two.familyId)
  })

  scenario('updates a recipe', async (scenario: StandardScenario) => {
    mockCurrentUser(userContext)
    const original = (await recipe({ id: scenario.recipe.one.id })) as Recipe
    const result = await updateRecipe({
      id: original.id,
      input: {
        name: 'String2',
        mainImageUrl: 'String',
        description: 'String',
        instructions: 'String',
        preparationTimeMinutes: 2652393,
        cookingTimeMinutes: 7232567,
        status: RecipeStatus.DRAFT,
        familyId: scenario.recipe.two.familyId,
        tagIds: [scenario.tag.one.id, scenario.tag.two.id],
        ingredientIds: [scenario.ingredient.one.id, scenario.ingredient.two.id],
      },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a recipe', async (scenario: StandardScenario) => {
    mockCurrentUser(userContext)
    const original = (await deleteRecipe({
      id: scenario.recipe.one.id,
    })) as Recipe
    const result = await recipe({ id: original.id })

    expect(result).toEqual(null)
  })
  scenario('fails to delete a recipe', async (scenario: StandardScenario) => {
    mockCurrentUser(userContext2)
    const original = (await deleteRecipe({
      id: scenario.recipe.one.id,
    })) as Recipe
    const result = await recipe({ id: original.id })

    expect(result).toEqual(null)
  })
})
