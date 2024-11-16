import { AccessRole, type Prisma, type Recipe } from '@prisma/client'
import { Ingredient, Tag } from 'types/graphql'

import { hashPassword } from '@redwoodjs/auth-dbauth-api'
import type { ScenarioData } from '@redwoodjs/testing/api'

const [hashedPassword, salt] = hashPassword('AAAaaa111')

export const user = {
  id: '1',
  name: 'Michel Tremblay',
  email: 'micheltremblay@gmail.com',
  isSuperAdmin: undefined,
  hashedPassword,
  salt,
}

export const userContext = {
  ...user,
  roles: [AccessRole.ADMIN, AccessRole.ADMIN],
  familyMembers: [
    {
      id: '1',
      familyId: '1',
      accessRole: AccessRole.ADMIN,
    },
    {
      id: '2',
      familyId: '2',
      accessRole: AccessRole.ADMIN,
    },
  ],
}

export const standard = defineScenario<
  Prisma.RecipeCreateArgs | Prisma.TagCreateArgs | Prisma.IngredientCreateArgs
>({
  recipe: {
    one: {
      data: {
        name: 'String',
        mainImageUrl: 'String',
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
              },
            },
            family: {
              connectOrCreate: {
                where: { id: '1' },
                create: { id: '1', name: 'Family 1' },
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        name: 'String',
        mainImageUrl: 'String',
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
              },
            },
            family: {
              connectOrCreate: {
                where: { id: '2' },
                create: { id: '2', name: 'Family 2' },
              },
            },
          },
        },
      },
    },
  },
  tag: {
    one: {
      data: {
        id: '1',
        name: 'Chinese',
        color: '#FFFFFF',
        description:
          'A culinary tradition rich in history, known for bold flavors and a balance of sweet, sour, salty, and umami, with popular dishes like stir-fries, dumplings, and noodles.',
      },
    },
    two: {
      data: {
        id: '2',
        name: 'French',
        color: '#000000',
        description:
          'Renowned for its attention to detail and sophisticated techniques, this cuisine emphasizes sauces, pastries, and dishes like coq au vin and croissants.',
      },
    },
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
      },
    },
  },
})

export type StandardScenario = ScenarioData<Recipe, 'recipe'> &
  ScenarioData<Tag, 'tag'> &
  ScenarioData<Ingredient, 'ingredient'>
