import type {
  CreateFamilyMutation,
  CreateFamilyInput,
  CreateFamilyMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FamilyForm from 'src/components/Family/FamilyForm'

const CREATE_FAMILY_MUTATION: TypedDocumentNode<
  CreateFamilyMutation,
  CreateFamilyMutationVariables
> = gql`
  mutation CreateFamilyMutation($input: CreateFamilyInput!) {
    createFamily(input: $input) {
      id
    }
  }
`

const NewFamily = () => {
  const [createFamily, { loading, error }] = useMutation(
    CREATE_FAMILY_MUTATION,
    {
      onCompleted: () => {
        toast.success('Family created')
        navigate(routes.families())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateFamilyInput) => {
    createFamily({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Family</h2>
      </header>
      <div className="rw-segment-main">
        <FamilyForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewFamily
