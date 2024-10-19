import type { Decoded } from '@redwoodjs/api'
import { AuthenticationError, ForbiddenError } from '@redwoodjs/graphql-server'

import { db } from './db'
import { AccessRole } from 'types/graphql'
import { logger } from './logger'

const APP_ADMIN_EMAILS = process.env.APP_ADMIN_EMAILS.split(';')

/**
 * The name of the cookie that dbAuth sets
 *
 * %port% will be replaced with the port the api server is running on.
 * If you have multiple RW apps running on the same host, you'll need to
 * make sure they all use unique cookie names
 */
export const cookieName = 'session_%port%'

/**
 * The session object sent in as the first argument to getCurrentUser() will
 * have a single key `id` containing the unique ID of the logged in user
 * (whatever field you set as `authFields.id` in your auth function config).
 * You'll need to update the call to `db` below if you use a different model
 * name or unique field name, for example:
 *
 *   return await db.profile.findUnique({ where: { email: session.id } })
 *                   ───┬───                       ──┬──
 *      model accessor ─┘      unique id field name ─┘
 *
 * !! BEWARE !! Anything returned from this function will be available to the
 * client--it becomes the content of `currentUser` on the web side (as well as
 * `context.currentUser` on the api side). You should carefully add additional
 * fields to the `select` object below once you've decided they are safe to be
 * seen if someone were to open the Web Inspector in their browser.
 */
export const getCurrentUser = async (
  session: Decoded
) => {
  console.log('session', session)
  if (!session || typeof session.id !== 'string') {
    throw new Error('Invalid session')
  }

  const user = await db.user.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      email: true,
      name: true,
      familyMembers: {
        select: {
          id: true,
          familyId: true,
          accessRole: true
        }
      }
    },
  })
  const roles = user.familyMembers.map((fM) => fM.accessRole)
  const isSuperAdmin: boolean | undefined = APP_ADMIN_EMAILS.includes(user.email) || undefined

  return { ...user, roles, isSuperAdmin: isSuperAdmin }
}

/**
 * The user is authenticated if there is a currentUser in the context
 *
 * @returns {boolean} - If the currentUser is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!context.currentUser
}

/**
 * When checking role membership, roles can be a single value, a list, or none.
 * You can use Prisma enums too (if you're using them for roles), just import your enum type from `@prisma/client`
 */
type AllowedRoles = AccessRole | AccessRole[] | undefined

/**
 * Checks if the currentUser is authenticated (and assigned one of the given roles)
 *
 * @param roles: {@link AllowedRoles} - Checks if the currentUser is assigned one of these roles
 *
 * @returns {boolean} - Returns true if the currentUser is logged in and assigned one of the given roles,
 * or when no roles are provided to check against. Otherwise returns false.
 */

export const hasRole = (roles: AllowedRoles, familyId?: string): boolean => {
  if (!isAuthenticated()) {
    return false
  }

  if (context.currentUser?.isSuperAdmin) {
    return true;
  }

  const currentUserRoles = context.currentUser?.familyMembers.reduce((acc, curr) => acc.set(curr.familyId, curr.accessRole), new Map<string, AccessRole>())

  if (typeof roles === 'string') {
    if (familyId) {
      const familyRole = currentUserRoles.get(familyId)
      return familyRole === roles
    } else {
      const allRoles = [...currentUserRoles.values()]
      logger.info(allRoles)
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

/**
 * Use requireAuth in your services to check that a user is logged in,
 * whether or not they are assigned a role, and optionally raise an
 * error if they're not.
 *
 * @param roles: {@link AllowedRoles} - When checking role membership, these roles grant access.
 *
 * @returns - If the currentUser is authenticated (and assigned one of the given roles)
 *
 * @throws {@link AuthenticationError} - If the currentUser is not authenticated
 * @throws {@link ForbiddenError} If the currentUser is not allowed due to role permissions
 *
 * @see https://github.com/redwoodjs/redwood/tree/main/packages/auth for examples
 */
export const requireAuth = ({ roles, familyId }: { roles?: AllowedRoles, familyId?: string } = {}) => {
  if (!isAuthenticated()) {
    throw new AuthenticationError("You don't have permission to do that.")
  }

  if (roles && !hasRole(roles, familyId)) {
    throw new ForbiddenError("You don't have access to do that.")
  }
}
