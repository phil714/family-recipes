import type { Prisma, Invitation } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.InvitationCreateArgs>({
  invitation: {
    one: {
      data: {
        email: 'String',
        accessRole: 'USER',
        family: { create: { name: 'String' } },
      },
    },
    two: {
      data: {
        email: 'String',
        accessRole: 'USER',
        family: { create: { name: 'String' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Invitation, 'invitation'>
