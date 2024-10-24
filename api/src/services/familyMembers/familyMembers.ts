import type {
  QueryResolvers,
  MutationResolvers,
  FamilyMemberRelationResolvers,
} from 'types/graphql'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const familyMembers: QueryResolvers['familyMembers'] = ({
  familyId,
}) => {
  return db.familyMember.findMany({ where: { familyId } })
}

export const familyMember: QueryResolvers['familyMember'] = ({ id }) => {
  return db.familyMember.findUnique({
    where: { id },
  })
}

export const updateFamilyMember: MutationResolvers['updateFamilyMember'] = ({
  id,
  input,
}) => {
  return db.familyMember.update({
    data: input,
    where: { id },
  })
}

export const deleteFamilyMember: MutationResolvers['deleteFamilyMember'] = ({
  id,
}) => {
  return db.$transaction(async (tx) => {
    const familyMember = await tx.familyMember.findFirst({
      where: { id },
    })
    requireAuth({ roles: 'ADMIN', familyId: familyMember.familyId })
    const output = await tx.familyMember.delete({
      where: { id },
    })

    const adminCount = await tx.familyMember.count({
      where: {
        accessRole: 'ADMIN',
        familyId: familyMember.familyId,
      },
    })

    if (adminCount === 0) {
      throw new Error('cannot delete last admin')
    }

    return output
  })
}

export const FamilyMember: FamilyMemberRelationResolvers = {
  family: (_obj, { root }) => {
    return db.familyMember.findUnique({ where: { id: root?.id } }).family()
  },
  user: (_obj, { root }) => {
    return db.familyMember.findUnique({ where: { id: root?.id } }).user()
  },
  recipes: (_obj, { root }) => {
    return db.familyMember.findUnique({ where: { id: root?.id } }).recipes()
  },
}
