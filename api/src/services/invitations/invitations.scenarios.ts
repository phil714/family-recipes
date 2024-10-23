import { type Prisma, type Invitation, AccessRole } from '@prisma/client'

import { hashPassword } from '@redwoodjs/auth-dbauth-api'
import type { ScenarioData } from '@redwoodjs/testing/api'

const [hashedPassword, salt] = hashPassword('AAAaaa111')

export const user = {
  id: '1',
  name: 'Michel Tremblay',
  email: 'micheltremblay@gmail.com',
  isSuperAdmin: undefined,
  hashedPassword,
  salt,
}

export const userContext = {
  ...user,
  roles: [AccessRole.ADMIN, AccessRole.USER, AccessRole.ADMIN],
  familyMembers: [
    {
      id: '1',
      familyId: '1',
      accessRole: AccessRole.ADMIN,
    },
    {
      id: '2',
      familyId: '2',
      accessRole: AccessRole.USER,
    },
    {
      id: '3',
      familyId: '3',
      accessRole: AccessRole.ADMIN,
    },
  ],
}

export const standard = defineScenario<Prisma.InvitationCreateArgs>({
  invitation: {
    one: {
      data: {
        email: 'String',
        accessRole: 'USER',
        family: { create: { id: '1', name: 'String' } },
      },
    },
    two: {
      data: {
        email: 'String',
        accessRole: 'USER',
        family: { create: { id: '2', name: 'String' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Invitation, 'invitation'>
