import type { Prisma, Ingredient } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.IngredientCreateArgs>({
  ingredient: {
    one: { data: { name: 'String', color: '#FFFFFF', description: 'String' } },
    two: { data: { name: 'String', color: '#000000', description: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Ingredient, 'ingredient'>
