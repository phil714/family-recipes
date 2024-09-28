import { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

import { hashPassword } from '@redwoodjs/auth-dbauth-api'

export default async () => {
  try {
    // If using dbAuth and seeding users, you'll need to add a `hashedPassword`
    // and associated `salt` to their record. Here's how to create them using
    // the same algorithm that dbAuth uses internally:

    const users = [
      {
        id: '1',
        name: 'Philippe Deschesnes',
        email: 'philippe.deschesnes@hotmail.com',
        password: 'AAAaaa111',
      },
      {
        id: '2',
        name: 'Laurence Amyotte',
        email: 'philippe.deschesnes+1@hotmail.com',
        password: 'AAAaaa111',
      },
    ]

    for (const user of users) {
      const [hashedPassword, salt] = hashPassword(user.password)
      await db.user.create({
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          hashedPassword,
          salt,
        },
      })
    }

    const families: Prisma.FamilyCreateManyInput[] = [
      {
        id: '1',
        name: 'Deschesnes',
      },
      {
        id: '2',
        name: 'Amyotte',
      },
      {
        id: '3',
        name: 'Roy',
      },
    ]

    await db.family.createMany({ data: families })

    const familyMembers: Prisma.FamilyMemberCreateManyInput[] = [
      {
        id: '1',
        userId: '1',
        familyId: '1',
        accessRole: 'ADMIN',
      },
      {
        id: '2',
        userId: '1',
        familyId: '2',
        accessRole: 'USER',
      },
      {
        id: '3',
        userId: '1',
        familyId: '3',
        accessRole: 'ADMIN',
      },
      {
        id: '4',
        userId: '2',
        familyId: '2',
        accessRole: 'ADMIN',
      },
    ]

    await db.familyMember.createMany({ data: familyMembers })

    const tags: Prisma.TagCreateManyInput[] = [
      {
        id: '1',
        name: 'Chinese',
        color: '#FF0000',
      },
      {
        id: '2',
        name: 'French',
        color: '#0000FF',
      },
      {
        id: '3',
        name: 'Canadian',
        color: '#00EE00',
      },
      {
        id: '4',
        name: 'Mexican',
        color: '#00FF00',
      },
    ]

    await db.tag.createMany({ data: tags })

    const ingredients: Prisma.IngredientCreateManyInput[] = [
      {
        id: '1',
        name: 'Minced Beef',
        description: 'Finely cut beef'
      },
      {
        id: '2',
        name: 'Brocoli',
        description: 'A leefy green'
      },
    ]

    await db.ingredient.createMany({ data: ingredients })

  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
