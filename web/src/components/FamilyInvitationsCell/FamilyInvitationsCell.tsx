import type {
  FamilyInvitationsQuery,
  FamilyInvitationsQueryVariables,
  MutationupdateInvitationArgs,
  UpdateFamilyMemberInput,
} from "types/graphql";

import React from 'react'

import {
  type CellSuccessProps,
  type CellFailureProps,
  type TypedDocumentNode,
  useMutation,
} from "@redwoodjs/web";
import AccessRoleSelect from "../AccessRoleSelect/AccessRoleSelect";
import { User } from "../User/User";
import { toast } from "@redwoodjs/web/toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Card";
import { FamilyMembersCellSkeleton } from "../FamilyMembersCell/FamilyMembersCell.skeleton";
import { UserSkeleton } from "../User/User.skeleton";

export const QUERY: TypedDocumentNode<
  FamilyInvitationsQuery,
  FamilyInvitationsQueryVariables
> = gql`
  query FamilyInvitationsQuery($familyId: String!) {
    familyInvitations: invitationsByFamilyId(familyId: $familyId) {
      id
      accessRole
      email
    }
  }
`;

const UPDATE_INVITATION_MUTATION: TypedDocumentNode<
  FamilyInvitationsQuery,
  MutationupdateInvitationArgs
> = gql`
  mutation UpdateInvitationMutation($id: String!, $input: UpdateInvitationInput!) {
    updateInvitation(id: $id, input: $input) {
      id
      accessRole
    }
  }
`


export const Loading = () => <Layout>{Array.from({ length: 3 }).map(() => <UserSkeleton />)}</Layout>;

export const Empty = () => <Layout><p className="text-gray-500">No pending invitations</p></Layout>;

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: "red" }}>Error: {error?.message}</div>
);

export const Success = ({
  familyInvitations,
}: CellSuccessProps<FamilyInvitationsQuery>) => {
  const [updateInvitation, { loading, error }] = useMutation(
    UPDATE_INVITATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Invitation updated')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateFamilyMemberInput,
    id: FamilyInvitationsQuery['familyInvitations'][0]['id']
  ) => {
    updateInvitation({ variables: { id, input } })
  }

  return (
    <Layout>
      {familyInvitations.map((item) => {
        return <li key={item.id} className="flex justify-center">
          <User user={{ name: item.email, email: item.email }} />
          <AccessRoleSelect value={item.accessRole} onChange={(accessRole) => onSave({ accessRole }, item.id)} />
        </li>;
      })}
    </Layout>
  );
};

export const Layout = ({ children }) => (
  <Card>
    <CardHeader>
      <CardTitle>
        Invitations
      </CardTitle>
      <CardDescription>
        Pending invitations to your family members.
      </CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col gap-4">
      {children}
    </CardContent>
  </Card>
)

