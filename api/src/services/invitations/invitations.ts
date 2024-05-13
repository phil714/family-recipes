import type {
  QueryResolvers,
  MutationResolvers,
  InvitationRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/email'

export const invitations: QueryResolvers['invitations'] = () => {
  return db.invitation.findMany()
}

export const invitation: QueryResolvers['invitation'] = ({ id }) => {
  return db.invitation.findUnique({
    where: { id },
  })
}

// dead code, need find user by id
export const invitationById: QueryResolvers['invitationByCode'] = async ({
  id,
}) => {
  const invitation = await db.invitation.findUnique({
    where: { id },
  })

  const user = await db.user.findUnique({
    where: {
      email: invitation.email,
    },
  })

  if (user) {
    // if user exist, add to family directly or do another mutation ?
  }

  return { ...invitation, userId: user?.id }
}

export const createInvitation: MutationResolvers['createInvitation'] = async ({
  input,
}) => {
  const invitation = await db.invitation.create({
    data: input,
  })

  await sendEmail({
    to: invitation.email,
    subject: 'You got invited into a family',
    html: '<div>Allo</div>',
    text: 'Allo',
  })

  return invitation
}

// TODO: add invitation by "private" id + no auth on this
// export const invitationById: MutationResolvers['createInvitation'] = ({
//   id,
// }) => {
//   return db.invitation.findUnique({
//     where: { id },
//   })
// }

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
