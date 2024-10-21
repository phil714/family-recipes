import type { Prisma, FamilyMember } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.FamilyMemberCreateArgs>({
  familyMember: {
    one: {
      data: {
        accessRole: 'USER',
        family: { create: { name: 'String' } },
        user: {
          create: {
            email: 'String7341642',
            name: 'String',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        accessRole: 'USER',
        family: { create: { name: 'String' } },
        user: {
          create: {
            email: 'String8216130',
            name: 'String',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<FamilyMember, 'familyMember'>
