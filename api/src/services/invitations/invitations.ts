import type {
  QueryResolvers,
  MutationResolvers,
  InvitationRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { mailer } from 'src/lib/mailer'
import { FamilyInvitation } from 'src/mail/FamilyInvitation/FamilyInvitation'
import { requireAuth } from 'src/lib/auth'

export const invitations: QueryResolvers['invitations'] = () => {
  return db.invitation.findMany()
}

export const invitationsByFamilyId: QueryResolvers['invitationsByFamilyId'] = ({ familyId }) => {
  requireAuth({ roles: 'ADMIN', familyId })
  return db.invitation.findMany({
    where: {
      familyId,
    }
  })
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
  requireAuth({ roles: 'ADMIN', familyId: input.familyId })

  const { redirectUrl } = input
  delete input.redirectUrl
  const invitation = await db.invitation.create({
    data: input,
  })

  await sendInvitation({ email: invitation.email, redirectUrl, code: invitation.code })

  return invitation
}

export const resendInvitation: MutationResolvers['resendInvitation'] = async ({
  id,
  input,
}) => {
  const invitation = await db.invitation.findFirst({
    where: { id },
  })
  requireAuth({ roles: 'ADMIN', familyId: invitation.familyId })

  const { redirectUrl } = input
  delete input.redirectUrl

  await sendInvitation({ email: invitation.email, redirectUrl, code: invitation.code })

  return invitation
}

export const updateInvitation: MutationResolvers['updateInvitation'] = async ({
  id,
  input,
}) => {
  const invitation = await db.invitation.findFirst({
    where: { id }
  })
  requireAuth({ roles: 'ADMIN', familyId: invitation.familyId })

  return db.invitation.update({
    data: input,
    where: { id },
  })
}

export const deleteInvitation: MutationResolvers['deleteInvitation'] = async ({
  id,
}) => {
  const invitation = await db.invitation.findFirst({
    where: { id }
  })
  requireAuth({ roles: 'ADMIN', familyId: invitation.familyId })

  return db.invitation.delete({
    where: { id },
  })
}

export const Invitation: InvitationRelationResolvers = {
  family: (_obj, { root }) => {
    return db.invitation.findUnique({ where: { id: root?.id } }).family()
  },
}

async function sendInvitation(invitation: { email: string, redirectUrl: string, code: string }) {
  const url = invitation.redirectUrl.replace(':code', invitation.code)

  await mailer.send(
    FamilyInvitation({
      name: invitation.email,
      url: url,
    }),
    {
      to: invitation.email,
      subject: 'You got invited into a family',
    }
  )
}
