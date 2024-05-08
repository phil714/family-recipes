import type { Prisma, Recipe } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RecipeCreateArgs>({
  recipe: {
    one: {
      data: {
        name: 'String',
        description: 'String',
        instructions: 'String',
        preparationTimeMinutes: 6569867,
        cookingTimeMinutes: 4758020,
        family: { create: { name: 'String' } },
      },
    },
    two: {
      data: {
        name: 'String',
        description: 'String',
        instructions: 'String',
        preparationTimeMinutes: 53524,
        cookingTimeMinutes: 1237400,
        family: { create: { name: 'String' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Recipe, 'recipe'>
