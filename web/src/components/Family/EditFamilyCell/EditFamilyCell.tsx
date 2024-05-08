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
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Family {family?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <FamilyForm
          family={family}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
