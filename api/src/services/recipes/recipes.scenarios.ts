import type { Prisma, Recipe } from '@prisma/client'
import { hashPassword } from '@redwoodjs/auth-dbauth-api'
import type { ScenarioData } from '@redwoodjs/testing/api'
import { Ingredient, Tag } from 'types/graphql'


const [hashedPassword, salt] = hashPassword('AAAaaa111')
export const user = {
  id: '1',
  name: 'Michel Tremblay',
  email: 'micheltremblay@gmail.com',
  hashedPassword,
  salt,
}

export const standard = defineScenario<Prisma.RecipeCreateArgs | Prisma.TagCreateArgs | Prisma.IngredientCreateArgs>({
  recipe: {
    one: {
      data: {
        name: 'String',
        description: 'String',
        instructions: 'String',
        preparationTimeMinutes: 6569867,
        cookingTimeMinutes: 4758020,
        family: {
          connectOrCreate: {
            where: { id: '1' },
            create: { id: '1', name: 'Family 1' },
          },
        },
        status: 'PRIVATE',
        familyMember: {
          create: {
            accessRole: 'ADMIN',
            user: {
              connectOrCreate: {
                where: { id: user.id },
                create: user,
              }
            },
            family: {
              connectOrCreate: {
                where: { id: '1' },
                create: { id: '1', name: 'Family 1' },
              },
            },
          },
        }
      },
    },
    two: {
      data: {
        name: 'String',
        description: 'String',
        instructions: 'String',
        preparationTimeMinutes: 53524,
        cookingTimeMinutes: 1237400,
        family: {
          connectOrCreate: {
            where: { id: '2' },
            create: { id: '2', name: 'Family 2' },
          },
        },
        status: 'PUBLIC',
        familyMember: {
          create: {
            accessRole: 'ADMIN',
            user: {
              connectOrCreate: {
                where: { id: user.id },
                create: user,
              }
            },
            family: {
              connectOrCreate: {
                where: { id: '2' },
                create: { id: '2', name: 'Family 2' },
              },
            },
          },
        }
      },
    },
  },
  tag: {
    one: {
      data: {
        id: '1',
        name: 'Chinese',
        color: '#FFFFFF',
      }
    },
    two: {
      data: {
        id: '2',
        name: 'America',
        color: '#000000',
      }
    }
  },
  ingredient: {
    one: {
      data: {
        id: '1',
        name: 'Minced Beef',
        description: 'Finely cut beef',
      },
    },
    two: {
      data: {
        id: '2',
        name: 'Brocoli',
        description: 'A leefy green',
      }
    }
  }
})

export type StandardScenario = ScenarioData<Recipe, 'recipe'> & ScenarioData<Tag, 'tag'> & ScenarioData<Ingredient, 'ingredient'>
