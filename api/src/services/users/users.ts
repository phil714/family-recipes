import type { MutationResolvers, QueryResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  if (context.currentUser?.id !== id) {
    throw new Error('not authorized')
  }

  // TODO: add locale validation

  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  if (context.currentUser?.id !== id) {
    throw new Error('not authorized')
  }

  return db.user.delete({
    where: { id },
  })
}

// export const User: UserRelationResolvers = {
//   familyMembers: (_obj, { root }) => {
//     return db.user.findUnique({ where: { id: root?.id } }).familyMembers();
//   },
// };
