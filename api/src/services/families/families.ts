import type {
  QueryResolvers,
  MutationResolvers,
  FamilyRelationResolvers,
} from 'types/graphql'

import { hasRole } from 'src/lib/auth'
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

export const createFamily: MutationResolvers['createFamily'] = async ({
  input,
}) => {
  const family = await db.family.create({
    data: input,
  })

  await db.familyMember.create({
    data: {
      accessRole: 'ADMIN',
      familyId: family.id,
      userId: context.currentUser?.id,
    },
  })

  return family
}

export const updateFamily: MutationResolvers['updateFamily'] = ({
  id,
  input,
}) => {
  hasRole('ADMIN', id)
  return db.family.update({
    data: input,
    where: { id },
  })
}

export const deleteFamily: MutationResolvers['deleteFamily'] = ({ id }) => {
  hasRole('ADMIN', id)
  return db.family.delete({
    where: { id },
  })
}

export const leaveFamily: MutationResolvers['leaveFamily'] = async ({ id }) => {
  await db.familyMember.delete({
    where: {
      userId_familyId: {
        familyId: id,
        userId: context.currentUser.id,
      },
    },
  })
  return db.family.findUnique({
    where: { id },
  })
}

export const Family: FamilyRelationResolvers = {
  recipes: (_obj, { root }) => {
    return db.family.findUnique({ where: { id: root?.id } }).recipes()
  },
  familyMembers: (_obj, { root }) => {
    return db.family.findUnique({ where: { id: root?.id } }).familyMembers()
  },
}
