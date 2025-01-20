import { type Prisma, type User } from '@prisma/client'

import { hashPassword } from '@redwoodjs/auth-dbauth-api'
import type { ScenarioData } from '@redwoodjs/testing/api'

const [hashedPassword, salt] = hashPassword('AAAaaa111')

export const user = {
  id: '1',
  name: 'Michel Tremblay',
  email: 'micheltremblay@gmail.com',
  hashedPassword,
  salt,
  avatarUrl: 'https://picsum.photos/id/237/50',
}

export const userContext = {
  ...user,
  roles: [],
  isSuperAdmin: undefined,
  familyMembers: [],
}

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: user,
    },
    two: {
      data: {
        email: 'String3977722',
        name: 'String',
        hashedPassword: 'String',
        salt: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
