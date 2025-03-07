import type {
  FamilyMembersQuery,
  FamilyMembersQueryVariables,
  MutationupdateFamilyMemberArgs,
  UpdateFamilyMemberInput,
} from 'types/graphql'

import {
  type CellSuccessProps,
  type CellFailureProps,
  type TypedDocumentNode,
  useMutation,
} from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { hasRole, useAuth } from 'src/auth'

import AccessRoleSelect from '../AccessRoleSelect/AccessRoleSelect'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../Card'
import { FamilyMemberMenu } from '../FamilyMemberMenu/FamilyMemberMenu'
import { User } from '../User/User'

import { FamilyMembersCellSkeleton } from './FamilyMembersCell.skeleton'

export const QUERY: TypedDocumentNode<
  FamilyMembersQuery,
  FamilyMembersQueryVariables
> = gql`
  query FamilyMembersQuery($familyId: String!) {
    familyMembers(familyId: $familyId) {
      id
      accessRole
      familyId
      user {
        email
        name
      }
    }
  }
`

const UPDATE_FAMILY_MEMBER_MUTATION: TypedDocumentNode<
  FamilyMembersQuery,
  MutationupdateFamilyMemberArgs
> = gql`
  mutation UpdateFamilyMemberMutation(
    $id: String!
    $input: UpdateFamilyMemberInput!
  ) {
    updateFamilyMember(id: $id, input: $input) {
      id
      accessRole
    }
  }
`

export const Loading = () => <FamilyMembersCellSkeleton />

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  familyMembers,
}: CellSuccessProps<FamilyMembersQuery>) => {
  const { currentUser } = useAuth()

  const [updateFamilyMember] = useMutation(UPDATE_FAMILY_MEMBER_MUTATION, {
    onCompleted: () => {
      toast.success('Family member updated')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (
    input: UpdateFamilyMemberInput,
    id: FamilyMembersQuery['familyMembers'][0]['id']
  ) => {
    updateFamilyMember({ variables: { id, input } })
  }

  return (
    <Layout>
      {familyMembers.map((item) => {
        return (
          <li key={item.id} className="flex justify-between">
            <User user={item.user} />
            <div className="flex gap-2">
              <AccessRoleSelect
                value={item.accessRole}
                onChange={(accessRole) => onSave({ accessRole }, item.id)}
                disabled={!hasRole('ADMIN', currentUser, item.familyId)}
              />
              <FamilyMemberMenu familyMember={item} />
            </div>
          </li>
        )
      })}
    </Layout>
  )
}

export const Layout = ({ children }) => (
  <Card>
    <CardHeader>
      <CardTitle>Members</CardTitle>
      <CardDescription>
        Invite your family members to collaborate.
      </CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col gap-4">{children}</CardContent>
  </Card>
)
