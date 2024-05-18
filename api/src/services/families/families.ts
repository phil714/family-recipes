import type {
  QueryResolvers,
  MutationResolvers,
  FamilyRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const families: QueryResolvers['families'] = () => {
  return db.family.findMany({
    where: {
      familyMembers: {
        some: {
          userId: context.currentUser?.id,
        },
      },
    },
  })
}

export const family: QueryResolvers['family'] = ({ id }) => {
  return db.family.findUnique({
    where: {
      id,
      familyMembers: {
        some: {
          userId: context.currentUser?.id,
        },
      },
    },
  })
}

export const createFamily: MutationResolvers['createFamily'] = ({ input }) => {
  return db.family.create({
    data: input,
  })
}

export const updateFamily: MutationResolvers['updateFamily'] = ({
  id,
  input,
}) => {
  return db.family.update({
    data: input,
    where: { id },
  })
}

export const deleteFamily: MutationResolvers['deleteFamily'] = ({ id }) => {
  return db.family.delete({
    where: { id },
  })
}

export const Family: FamilyRelationResolvers = {
  recipes: (_obj, { root }) => {
    return db.family.findUnique({ where: { id: root?.id } }).recipes()
  },
}
