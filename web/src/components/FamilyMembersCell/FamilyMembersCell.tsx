import type {
  AccessRole,
  FamilyMembersQuery,
  FamilyMembersQueryVariables,
  MutationupdateFamilyMemberArgs,
  UpdateFamilyMemberInput,
} from "types/graphql";

import {
  type CellSuccessProps,
  type CellFailureProps,
  type TypedDocumentNode,
  useMutation,
} from "@redwoodjs/web";
import AccessRoleSelect from "../AccessRoleSelect/AccessRoleSelect";
import { User } from "../User/User";
import { toast } from "@redwoodjs/web/toast";

export const QUERY: TypedDocumentNode<
  FamilyMembersQuery,
  FamilyMembersQueryVariables
> = gql`
  query FamilyMembersQuery($familyId: String!) {
    familyMembers(familyId: $familyId) {
      id
      accessRole
      user {
        email
        name
      }
    }
  }
`;

const UPDATE_FAMILY_MEMBER_MUTATION: TypedDocumentNode<
  FamilyMembersQuery,
  MutationupdateFamilyMemberArgs
> = gql`
  mutation UpdateFamilyMemberMutation($id: String!, $input: UpdateFamilyMemberInput!) {
    updateFamilyMember(id: $id, input: $input) {
      id
      accessRole
    }
  }
`


export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: "red" }}>Error: {error?.message}</div>
);

export const Success = ({
  familyMembers,
}: CellSuccessProps<FamilyMembersQuery>) => {
  const [updateFamilyMember, { loading, error }] = useMutation(
    UPDATE_FAMILY_MEMBER_MUTATION,
    {
      onCompleted: () => {
        toast.success('Family member updated')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateFamilyMemberInput,
    id: FamilyMembersQuery['familyMembers'][0]['id']
  ) => {
    updateFamilyMember({ variables: { id, input } })
  }

  return (
    <ul className="flex flex-col gap-4">
      {familyMembers.map((item) => {
        return <li key={item.id} className="flex justify-center">
          <User user={item.user} />
          <AccessRoleSelect value={item.accessRole} onChange={(accessRole) => onSave({ accessRole }, item.id)} />
        </li>;
      })}
    </ul>
  );
};
