import type {
  QueryResolvers,
  MutationResolvers,
  InvitationRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const invitations: QueryResolvers['invitations'] = () => {
  return db.invitation.findMany()
}

export const invitation: QueryResolvers['invitation'] = ({ id }) => {
  return db.invitation.findUnique({
    where: { id },
  })
}

export const createInvitation: MutationResolvers['createInvitation'] = ({
  input,
}) => {
  // send email

  return db.invitation.create({
    data: input,
  })
}

export const updateInvitation: MutationResolvers['updateInvitation'] = ({
  id,
  input,
}) => {
  // probably remove this

  return db.invitation.update({
    data: input,
    where: { id },
  })
}

export const deleteInvitation: MutationResolvers['deleteInvitation'] = ({
  id,
}) => {
  return db.invitation.delete({
    where: { id },
  })
}

export const Invitation: InvitationRelationResolvers = {
  family: (_obj, { root }) => {
    return db.invitation.findUnique({ where: { id: root?.id } }).family()
  },
}
