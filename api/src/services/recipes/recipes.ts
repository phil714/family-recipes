import type {
  QueryResolvers,
  MutationResolvers,
  RecipeRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const recipes: QueryResolvers['recipes'] = () => {
  return db.recipe.findMany()
}

export const recipe: QueryResolvers['recipe'] = ({ id }) => {
  return db.recipe.findUnique({
    where: { id },
  })
}

export const createRecipe: MutationResolvers['createRecipe'] = async ({
  input,
}) => {
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
      description: input.description,
      instructions: input.instructions,
      cookingTimeMinutes: input.cookingTimeMinutes,
      preparationTimeMinutes: input.preparationTimeMinutes,
      familyMember,
      tags,
      family,
    },
  })
}

export const updateRecipe: MutationResolvers['updateRecipe'] = async ({
  id,
  input,
}) => {

  const ingredients = await db.recipe.findUnique({ where: { id } }).ingredients() ?? []
  const ingredientsToConnect = input.ingredientIds.map((id) => ({ id }))
  const ingredientsToDisconnect = ingredients.filter((ingredient) => !input.ingredientIds.includes(ingredient.id))

  const tags = await db.recipe.findUnique({ where: { id } }).tags() ?? []
  const toConnect = input.tagIds.map((id) => ({ id }))
  const toDisconnect = tags.filter((tag) => !input.tagIds.includes(tag.id))

  delete input.tagIds
  delete input.ingredientIds

  return db.recipe.update({
    data: {
      ...input,
      tags: {
        connect: toConnect,
        disconnect: toDisconnect,
      },
    },
    where: { id },
  })
}

export const deleteRecipe: MutationResolvers['deleteRecipe'] = ({ id }) => {
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
