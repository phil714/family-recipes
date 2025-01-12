import type { Invitation } from '@prisma/client'

import {
  createInvitation,
  deleteInvitation,
  invitation,
  invitations,
  updateInvitation,
} from './invitations'
import { userContext, type StandardScenario } from './invitations.scenarios'

jest.mock('@sendgrid/mail')

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

  scenario('creates an invitation', async (scenario: StandardScenario) => {
    mockCurrentUser(userContext)
    const result = await createInvitation({
      input: {
        email: 'test@test.com',
        familyId: scenario.invitation.one.familyId,
        accessRole: 'USER',
        redirectUrl: 'localhost:8910/invitations/2/accept',
      },
    })

    expect(result.email).toEqual('test@test.com')
    expect(result.familyId).toEqual(scenario.invitation.one.familyId)
    expect(result.accessRole).toEqual('USER')

    // TODO: fix later
    // Mail
    // const testHandler = mailer.getTestHandler() as InMemoryMailHandler
    // expect(testHandler.inbox.length).toBe(1)
    // const sentMail = testHandler.inbox[0]
    // expect({
    //   ...sentMail,
    //   htmlContent: undefined,
    //   textContent: undefined,
    // }).toMatchInlineSnapshot(`
    //       {
    //         "attachments": [],
    //         "bcc": [],
    //         "cc": [],
    //         "from": "${mailer.defaults.from}",
    //         "handler": "resend",
    //         "handlerOptions": undefined,
    //         "headers": {},
    //         "htmlContent": undefined,
    //         "renderer": "reactEmail",
    //         "rendererOptions": {},
    //         "replyTo": "${mailer.defaults.replyTo}",
    //         "subject": "You got invited into a family",
    //         "textContent": undefined,
    //         "to": [
    //           "String",
    //         ],
    //       }
    //     `)
    // expect(sentMail.htmlContent).toMatchSnapshot()
    // expect(sentMail.textContent).toMatchSnapshot()
  })

  scenario('updates a invitation', async (scenario: StandardScenario) => {
    mockCurrentUser(userContext)
    const original = (await invitation({
      id: scenario.invitation.one.id,
    })) as Invitation
    const result = await updateInvitation({
      id: original.id,
      input: { accessRole: 'ADMIN' },
    })

    expect(result.accessRole).toEqual('ADMIN')
  })

  scenario('deletes a invitation', async (scenario: StandardScenario) => {
    mockCurrentUser(userContext)
    const original = (await deleteInvitation({
      id: scenario.invitation.one.id,
    })) as Invitation
    const result = await invitation({ id: original.id })

    expect(result).toEqual(null)
  })
})
