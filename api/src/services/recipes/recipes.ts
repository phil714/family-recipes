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
  return db.recipe.create({
    data: {
      ...input,
      tags: {
        connect: input.tags.map((tag) => ({ id: tag })),
      },
    },
  })
}

export const updateRecipe: MutationResolvers['updateRecipe'] = ({
  id,
  input,
}) => {
  return db.recipe.update({
    data: {
      ...input,
      tags: {
        connect: input.tags.map((tag) => ({ id: tag })),
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
