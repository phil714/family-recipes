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
    family: Family!
    accessRole: AccessRole!
    userId: String
  }

  enum AccessRole {
    USER
    ADMIN
  }

  type Query {
    invitations: [Invitation!]! @requireAuth
    invitation(id: String!): Invitation @requireAuth
    invitationByCode(id: String!): InvitationByCode #TODO: refactor to code
  }

  input CreateInvitationInput {
    email: String!
    familyId: String!
    accessRole: AccessRole!
  }

  input UpdateInvitationInput {
    email: String
    familyId: String
    accessRole: AccessRole
  }

  type Mutation {
    createInvitation(input: CreateInvitationInput!): Invitation! @requireAuth
    updateInvitation(id: String!, input: UpdateInvitationInput!): Invitation!
      @requireAuth
    deleteInvitation(id: String!): Invitation! @requireAuth
    acceptInvitation(id: String!, input: UpdateInvitationInput!): Invitation!
  }
`
