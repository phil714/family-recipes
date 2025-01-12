import { type FamilyMember, type Prisma, AccessRole } from '@prisma/client'

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
  avatarUrl: 'https://picsum.photos/id/237/50',
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

const user2 = {
  id: '2',
  name: 'Mathieu Pépin',
  email: 'mathieupépin@gmail.com',
  isSuperAdmin: undefined,
  hashedPassword,
  salt,
  avatarUrl: 'https://picsum.photos/id/237/50',
}

export const standard = defineScenario<Prisma.FamilyMemberCreateArgs>({
  familyMember: {
    one: {
      data: {
        id: '1',
        accessRole: 'ADMIN',
        family: { create: { id: '1', name: 'String' } },
        user: {
          connectOrCreate: {
            where: { id: user.id },
            create: user,
          },
        },
      },
    },
    two: {
      data: {
        id: '2',
        accessRole: 'USER',
        family: { create: { id: '2', name: 'String' } },
        user: {
          connectOrCreate: {
            where: { id: user.id },
            create: user,
          },
        },
      },
    },
    three: {
      data: {
        id: '3',
        accessRole: 'ADMIN',
        family: {
          connectOrCreate: {
            where: { id: '3' },
            create: { id: '3', name: 'Family 3' },
          },
        },
        user: {
          connectOrCreate: {
            where: { id: user.id },
            create: user,
          },
        },
      },
    },
    four: {
      data: {
        id: '4',
        accessRole: 'ADMIN',
        family: {
          connectOrCreate: {
            where: { id: '3' },
            create: { id: '3', name: 'Family 3' },
          },
        },
        user: {
          connectOrCreate: {
            where: { id: user2.id },
            create: user2,
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<FamilyMember, 'familyMember'>
