import { createDbAuthClient, createAuth } from '@redwoodjs/auth-dbauth-web'
import WebAuthnClient from '@redwoodjs/auth-dbauth-web/webAuthn'
import { AccessRole } from 'types/graphql'
import type { CurrentUser } from '@redwoodjs/auth';

const dbAuthClient = createDbAuthClient({ webAuthn: new WebAuthnClient() })

export const { AuthProvider, useAuth } = createAuth(dbAuthClient)


type AllowedRoles = AccessRole | AccessRole[] | undefined

export const hasRole = (roles: AllowedRoles, currentUser?: CurrentUser, familyId?: string): boolean => {
  if (!currentUser) {
    return false
  }

  if (currentUser?.isSuperAdmin) {
    return true;
  }

  const currentUserRoles = currentUser.familyMembers.reduce((acc, curr) => acc.set(curr.familyId, curr.accessRole), new Map<string, AccessRole>())

  if (typeof roles === 'string') {
    if (familyId) {
      const familyRole = currentUserRoles.get(familyId)
      return familyRole === roles
    } else {
      const allRoles = [...currentUserRoles.values()]
      return allRoles.some((allowedRole) => roles === allowedRole)
    }
  }

  if (Array.isArray(roles)) {
    if (familyId) {
      const familyRole = currentUserRoles.get(familyId)
      return roles.some((allowedRole) => allowedRole === familyRole)
    } else {
      const allRoles = [...currentUserRoles.values()]
      return allRoles.some((allowedRole) =>
        roles.includes(allowedRole)
      )
    }
  }

  // roles not found
  return false
}
