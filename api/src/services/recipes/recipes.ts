import { RecipeStatus } from '@prisma/client'
import type {
  MutationResolvers,
  QueryResolvers,
  RecipeRelationResolvers,
} from 'types/graphql'

import { ForbiddenError } from '@redwoodjs/graphql-server'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const recipes: QueryResolvers['recipes'] = (input) => {
  return db.recipe.findMany({
    where: {
      family: {
        familyMembers: {
          some: {
            userId: context.currentUser?.id,
          },
        },
        id: input?.searchParams?.familyId,
      },
    },
  })
}

export const allRecipes: QueryResolvers['allRecipes'] = (input) => {
  const tagIds = input?.searchParams?.tagIds ?? []
  const ingredientIds = input?.searchParams?.ingredientIds ?? []
  const searchText = input?.searchParams?.searchText.trim() ?? ''

  return db.recipe.findMany({
    where: {
      OR: [
        { status: RecipeStatus.PUBLIC },
        ...(context.currentUser
          ? [
              {
                status: RecipeStatus.PRIVATE,
                family: {
                  familyMembers: {
                    some: {
                      userId: context.currentUser.id,
                    },
                  },
                },
              },
            ]
          : []),
      ],
      name:
        searchText.length > 0
          ? {
              contains: searchText, // TODO: find a better search engine later
              mode: 'insensitive',
            }
          : undefined,
      tags:
        tagIds.length > 0
          ? {
              some: {
                id: { in: tagIds },
              },
            }
          : undefined,
      ingredients:
        ingredientIds.length > 0
          ? {
              some: {
                id: { in: ingredientIds },
              },
            }
          : undefined,
    },
    orderBy: {
      _relevance: {
        fields: ['name'],
        search: searchText,
        sort: 'asc',
      },
    },
  })
}

export const recipe: QueryResolvers['recipe'] = ({ id }) => {
  return db.recipe.findUnique({
    where: {
      id,
      OR: [
        {
          family: {
            familyMembers: {
              some: {
                userId: context.currentUser?.id,
              },
            },
          },
        },
        { status: RecipeStatus.PUBLIC },
      ],
    },
  })
}

export const createRecipe: MutationResolvers['createRecipe'] = async ({
  input,
}) => {
  requireAuth({ roles: ['ADMIN', 'USER'], familyId: input.familyId })
  const tags = {
    connect: input.tagIds.map((tag) => ({ id: tag })),
  }
  const ingredients = {
    connect: input.ingredientIds.map((ingredient) => ({ id: ingredient })),
  }
  const family = {
    connect: { id: input.familyId },
  }

  const familyMember = {
    connect: {
      id: (
        await db.familyMember.findFirstOrThrow({
          where: { userId: context.currentUser?.id },
        })
      ).id,
    },
  }

  return db.recipe.create({
    data: {
      name: input.name,
      mainImageUrl: input.mainImageUrl,
      description: input.description,
      instructions: input.instructions,
      cookingTimeMinutes: input.cookingTimeMinutes,
      preparationTimeMinutes: input.preparationTimeMinutes,
      familyMember,
      status: input.status,
      tags,
      ingredients,
      family,
    },
  })
}

export const updateRecipe: MutationResolvers['updateRecipe'] = async ({
  id,
  input,
}) => {
  const recipe = await db.recipe.findUnique({
    where: { id },
  })
  requireAuth({ roles: ['ADMIN', 'USER'], familyId: recipe?.familyId })
  const familyMember = context.currentUser?.familyMembers.find(
    (fM) => fM.familyId === recipe?.familyId
  )

  // if you are a USER but now creator of the recipe
  if (
    familyMember.accessRole === 'USER' &&
    familyMember.id !== recipe?.familyMemberId
  ) {
    throw new ForbiddenError("You don't have access to do that.")
  }

  const ingredients =
    (await db.recipe.findUnique({ where: { id } }).ingredients()) ?? []
  const ingredientsToConnect = input.ingredientIds.map((id) => ({ id }))
  const ingredientsToDisconnect = ingredients.filter(
    (ingredient) => !input.ingredientIds.includes(ingredient.id)
  )

  const tags = (await db.recipe.findUnique({ where: { id } }).tags()) ?? []
  const tagsToConnect = input.tagIds.map((id) => ({ id }))
  const tagsToDisconnect = tags.filter((tag) => !input.tagIds.includes(tag.id))

  delete input.tagIds
  delete input.ingredientIds

  return db.recipe.update({
    data: {
      ...input,
      tags: {
        connect: tagsToConnect,
        disconnect: tagsToDisconnect,
      },
      ingredients: {
        connect: ingredientsToConnect,
        disconnect: ingredientsToDisconnect,
      },
    },
    where: { id },
  })
}

export const deleteRecipe: MutationResolvers['deleteRecipe'] = async ({
  id,
}) => {
  const recipe = await db.recipe.findUnique({
    where: { id },
  })
  requireAuth({ roles: ['ADMIN', 'USER'], familyId: recipe?.familyId })
  const familyMember = context.currentUser?.familyMembers.find(
    (fM) => fM.familyId === recipe?.familyId
  )

  console.log('recipe', recipe)
  console.log('familyMember', familyMember)
  // if you are a USER but now creator of the recipe
  if (
    familyMember.accessRole === 'USER' &&
    familyMember.id !== recipe?.familyMemberId
  ) {
    throw new ForbiddenError("You don't have access to do that.")
  }

  return db.recipe.delete({
    where: { id },
  })
}

export const Recipe: RecipeRelationResolvers = {
  family: (_obj, { root }) => {
    return db.recipe.findUnique({ where: { id: root?.id } }).family()
  },
  tags: (_obj, { root }) => {
    return db.recipe.findUnique({ where: { id: root?.id } }).tags()
  },
  ingredients: (_obj, { root }) => {
    return db.recipe.findUnique({ where: { id: root?.id } }).ingredients()
  },
}
