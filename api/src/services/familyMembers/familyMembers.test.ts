import type { FamilyMember } from '@prisma/client'

import {
  deleteFamilyMember,
  familyMember,
  familyMembers,
  updateFamilyMember,
} from './familyMembers'
import { userContext, type StandardScenario } from './familyMembers.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('familyMembers', () => {
  scenario('returns all familyMembers', async (scenario: StandardScenario) => {
    mockCurrentUser(userContext)
    const result = await familyMembers({
      familyId: scenario.familyMember.one.familyId,
    })

    expect(result.length).toEqual(1)
  })

  scenario(
    'returns a single familyMember',
    async (scenario: StandardScenario) => {
      mockCurrentUser(userContext)
      const result = await familyMember({ id: scenario.familyMember.one.id })

      expect(result).toEqual(scenario.familyMember.one)
    }
  )

  scenario('updates a familyMember', async (scenario: StandardScenario) => {
    mockCurrentUser(userContext)
    const original = (await familyMember({
      id: scenario.familyMember.one.id,
    })) as FamilyMember
    const result = await updateFamilyMember({
      id: original.id,
      input: { accessRole: 'ADMIN' },
    })

    expect(result.accessRole).toEqual('ADMIN')
  })

  scenario(
    'not delete a family member when is last admin',
    async (scenario: StandardScenario) => {
      mockCurrentUser(userContext)
      await expect(
        deleteFamilyMember({
          id: scenario.familyMember.one.id,
        })
      ).rejects.toThrow('cannot delete last admin')
    }
  )
  scenario(
    'not delete a family member when unauthorized',
    async (scenario: StandardScenario) => {
      mockCurrentUser(userContext)
      await expect(
        deleteFamilyMember({
          id: scenario.familyMember.two.id,
        })
      ).rejects.toThrow(`You don't have access to do that.`)
    }
  )
  scenario('deletes a familyMember', async (scenario: StandardScenario) => {
    mockCurrentUser(userContext)
    const original = (await deleteFamilyMember({
      id: scenario.familyMember.four.id,
    })) as FamilyMember
    const result = await familyMember({ id: original.id })

    expect(result).toEqual(null)
  })
})
