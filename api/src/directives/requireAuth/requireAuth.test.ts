import { AccessRole } from '@prisma/client'

import { hashPassword } from '@redwoodjs/auth-dbauth-api'
import { getDirectiveName, mockRedwoodDirective } from '@redwoodjs/testing/api'

import requireAuth from './requireAuth'

const [hashedPassword, salt] = hashPassword('AAAaaa111')
export const user = {
  id: '1',
  name: 'Michel Tremblay',
  email: 'micheltremblay@test.com',
  isSuperAdmin: undefined,
  hashedPassword,
  salt,
  roles: [AccessRole.ADMIN],
  avatarUrl: 'https://picsum.photos/id/237/50',
  familyMembers: [
    {
      id: '1',
      familyId: '1',
      accessRole: AccessRole.ADMIN,
    },
  ],
}

describe('requireAuth directive', () => {
  it('declares the directive sdl as schema, with the correct name', () => {
    expect(requireAuth.schema).toBeTruthy()
    expect(getDirectiveName(requireAuth.schema)).toBe('requireAuth')
  })

  it('requireAuth has stub implementation. Should not throw when current user', () => {
    const mockExecution = mockRedwoodDirective(requireAuth, {
      context: {
        currentUser: user,
      },
    })

    expect(mockExecution).not.toThrow()
  })
})
