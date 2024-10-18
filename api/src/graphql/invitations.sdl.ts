export const schema = gql`
  type Invitation {
    id: String!
    email: String!
    familyId: String!
    family: Family!
    accessRole: AccessRole!
  }

  type InvitationByCode {
    id: String!
    email: String!
    familyId: String!
    accessRole: AccessRole!
    userId: String
  }

  type Query {
    invitations: [Invitation!]! @requireAuth(roles: "ADMIN")
    invitation(id: String!): Invitation @requireAuth(roles: "ADMIN")
    invitationByCode(code: String!): InvitationByCode @skipAuth
  }

  input CreateInvitationInput {
    email: String!
    familyId: String!
    accessRole: AccessRole!
    redirectUrl: String!
  }

  input UpdateInvitationInput {
    email: String
    familyId: String
    accessRole: AccessRole
  }

  type Mutation {
    createInvitation(input: CreateInvitationInput!): Invitation! @requireAuth(roles: "ADMIN")
    updateInvitation(id: String!, input: UpdateInvitationInput!): Invitation!
      @requireAuth(roles: "ADMIN")
    deleteInvitation(id: String!): Invitation! @requireAuth(roles: "ADMIN")
    acceptInvitation(id: String!, input: UpdateInvitationInput!): Invitation!
      @skipAuth
  }
`
