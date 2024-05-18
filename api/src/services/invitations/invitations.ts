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
export const invitationByCode: QueryResolvers['invitationByCode'] = async ({
  code,
}) => {
  const invitation = await db.invitation.findFirst({
    where: { code, expiresAt: { gte: new Date() } },
  })

  if (!invitation) {
    throw new Error('invitation not found or expired')
  }

  const user = await db.user.findUnique({
    where: {
      email: invitation.email,
    },
  })

  if (user) {
    // if user exist, add to family directly
    await db.familyMember.create({
      data: {
        accessRole: invitation.accessRole,
        familyId: invitation.familyId,
        userId: user.id,
      },
    })

    await db.invitation.delete({ where: { id: invitation.id } })
  }

  return { ...invitation, userId: user?.id }
}

export const createInvitation: MutationResolvers['createInvitation'] = async ({
  input,
}) => {
  const { redirectUrl } = input
  delete input.redirectUrl
  const invitation = await db.invitation.create({
    data: input,
  })

  const url = redirectUrl.replace(':code', invitation.code)

  await sendEmail({
    to: invitation.email,
    subject: 'You got invited into a family',
    html: `<div>Allo<div>${url}</div></div>`,
    text: `Allo`,
  })

  return invitation
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
