import type {
  EditFamilyById,
  UpdateFamilyInput,
  UpdateFamilyMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FamilyForm from 'src/components/Family/FamilyForm'
import FamilyInvitationsCell from 'src/components/FamilyInvitationsCell'
import FamilyMembersCell from 'src/components/FamilyMembersCell'

export const QUERY: TypedDocumentNode<EditFamilyById> = gql`
  query EditFamilyById($id: String!) {
    family: family(id: $id) {
      id
      name
    }
  }
`

const UPDATE_FAMILY_MUTATION: TypedDocumentNode<
  EditFamilyById,
  UpdateFamilyMutationVariables
> = gql`
  mutation UpdateFamilyMutation($id: String!, $input: UpdateFamilyInput!) {
    updateFamily(id: $id, input: $input) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ family }: CellSuccessProps<EditFamilyById>) => {
  const [updateFamily, { loading, error }] = useMutation(
    UPDATE_FAMILY_MUTATION,
    {
      onCompleted: () => {
        toast.success('Family updated')
        navigate(routes.families())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateFamilyInput,
    id: EditFamilyById['family']['id']
  ) => {
    updateFamily({ variables: { id, input } })
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      {/* <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Family {family?.id}
        </h2>
      </header> */}
      <div className="flex w-full flex-col lg:w-1/2">
        <FamilyForm
          family={family}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
      {family?.id && (
        <div className="flex w-full flex-col gap-4 lg:w-1/2">
          <FamilyInvitationsCell familyId={family.id} />
          <FamilyMembersCell familyId={family.id} />
        </div>
      )}
    </div>
  )
}
