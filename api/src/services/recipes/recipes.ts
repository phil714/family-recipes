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

export const createRecipe: MutationResolvers['createRecipe'] = ({ input }) => {
  const tags = {
    connect: input.tagIds.map((tag) => ({ id: tag })),
  }
  delete input.tagIds
  return db.recipe.create({
    data: {
      ...input,
      tags,
    },
  })
}

export const updateRecipe: MutationResolvers['updateRecipe'] = async ({
  id,
  input,
}) => {
  const tags = await db.recipe.findUnique({ where: { id } }).tags()
  const toConnect = input.tagIds.map((id) => ({ id }))
  const toDisconnect = tags.filter((tag) => !input.tagIds.includes(tag.id))

  delete input.tagIds

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
}
