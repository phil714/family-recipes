import type { Family } from '@prisma/client'

import {
  families,
  family,
  createFamily,
  updateFamily,
  deleteFamily,
} from './families'
import { user, type StandardScenario } from './families.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('families', () => {
  scenario('returns all families', async (scenario: StandardScenario) => {
    mockCurrentUser(user)

    const result = await families()

    expect(result.length).toEqual(1)
  })

  scenario('returns a single family', async (scenario: StandardScenario) => {
    mockCurrentUser(user)

    const result = await family({ id: scenario.family.one.id })

    expect(result).toEqual(scenario.family.one)
  })

  scenario('creates a family', async () => {
    const result = await createFamily({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a family', async (scenario: StandardScenario) => {
    const original = (await family({ id: scenario.family.one.id })) as Family
    const result = await updateFamily({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a family', async (scenario: StandardScenario) => {
    const original = (await deleteFamily({
      id: scenario.family.two.id,
    })) as Family
    const result = await family({ id: original.id })

    expect(result).toEqual(null)
  })
})
