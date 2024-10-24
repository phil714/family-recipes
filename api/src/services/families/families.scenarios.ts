import { type Prisma, type Family, AccessRole } from '@prisma/client'

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
  roles: [AccessRole.ADMIN],
  familyMembers: [
    {
      id: '1',
      familyId: '1',
      accessRole: AccessRole.ADMIN,
    },
  ],
}

export const standard = defineScenario<Prisma.FamilyCreateArgs>({
  family: {
    one: {
      data: {
        id: '1',
        name: 'Family 1',
        familyMembers: {
          create: [
            {
              accessRole: 'ADMIN',
              user: { create: user },
            },
          ],
        },
      },
    },
    two: {
      data: {
        id: '2',
        name: 'Family 2',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Family, 'family'>
