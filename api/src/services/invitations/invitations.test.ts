import type { Invitation } from '@prisma/client'

import {
  invitations,
  invitation,
  createInvitation,
  updateInvitation,
  deleteInvitation,
} from './invitations'
import type { StandardScenario } from './invitations.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('invitations', () => {
  scenario('returns all invitations', async (scenario: StandardScenario) => {
    const result = await invitations()

    expect(result.length).toEqual(Object.keys(scenario.invitation).length)
  })

  scenario(
    'returns a single invitation',
    async (scenario: StandardScenario) => {
      const result = await invitation({ id: scenario.invitation.one.id })

      expect(result).toEqual(scenario.invitation.one)
    }
  )

  scenario('creates a invitation', async (scenario: StandardScenario) => {
    const result = await createInvitation({
      input: {
        email: 'String',
        familyId: scenario.invitation.two.familyId,
        accessRole: 'USER',
        redirectUrl: 'localhost:8910/invitations/2/accept'
      },
    })

    expect(result.email).toEqual('String')
    expect(result.familyId).toEqual(scenario.invitation.two.familyId)
    expect(result.accessRole).toEqual('USER')
  })

  scenario('updates a invitation', async (scenario: StandardScenario) => {
    const original = (await invitation({
      id: scenario.invitation.one.id,
    })) as Invitation
    const result = await updateInvitation({
      id: original.id,
      input: { email: 'String2' },
    })

    expect(result.email).toEqual('String2')
  })

  scenario('deletes a invitation', async (scenario: StandardScenario) => {
    const original = (await deleteInvitation({
      id: scenario.invitation.one.id,
    })) as Invitation
    const result = await invitation({ id: original.id })

    expect(result).toEqual(null)
  })
})
