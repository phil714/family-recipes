import type { User } from '@prisma/client'

import { user, updateUser, deleteUser } from './users'
import { userContext, type StandardScenario } from './users.scenarios'

describe('users', () => {
  // scenario('returns all users', async (scenario: StandardScenario) => {
  //   const result = await users()

  //   expect(result.length).toEqual(Object.keys(scenario.user).length)
  // })

  // scenario('returns a single user', async (scenario: StandardScenario) => {
  //   const result = await user({ id: scenario.user.one.id })

  //   expect(result).toEqual(scenario.user.one)
  // })

  // scenario('creates a user', async () => {
  //   const result = await createUser({
  //     input: {
  //       email: 'String6267565',
  //       name: 'String',
  //       hashedPassword: 'String',
  //       salt: 'String',
  //     },
  //   })

  //   expect(result.email).toEqual('String6267565')
  //   expect(result.name).toEqual('String')
  //   expect(result.hashedPassword).toEqual('String')
  //   expect(result.salt).toEqual('String')
  // })

  scenario('updates a user', async (scenario: StandardScenario) => {
    mockCurrentUser(userContext)
    const original = (await user({ id: scenario.user.one.id })) as User
    const result = await updateUser({
      id: original.id,
      input: { email: 'String10251602' },
    })

    expect(result.email).toEqual('String10251602')
  })

  scenario('deletes a user', async (scenario: StandardScenario) => {
    mockCurrentUser(userContext)
    const original = (await deleteUser({ id: scenario.user.one.id })) as User
    const result = await user({ id: original.id })

    expect(result).toEqual(null)
  })
})
