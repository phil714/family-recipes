import type { FindTags, FindTagsVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import MultiSelectFormField from 'src/components/MultiSelect/MultiSelect'
import { t } from 'i18next'

export const QUERY: TypedDocumentNode<FindTags, FindTagsVariables> = gql`
  query FindTags {
    tags {
      id
      name
      color
    }
  }
`
export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return <div className="rw-text-center">Empty</div>
}

export const Failure = ({ error }: CellFailureProps<FindTags>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

interface InputProps {
  onChange: (value: string[]) => void
  value: string[]
}

export const Success = ({
  tags,
  onChange,
  value,
}: CellSuccessProps<FindTags, FindTagsVariables> & InputProps) => {
  return (
    <MultiSelectFormField
      name="tags"
      options={tags.map((tag) => ({ value: tag.id, label: tag.name, color: tag.color }))}
      defaultValue={value}
      onValueChange={onChange}
      placeholder={t("common:select")}
      variant="inverted"
    />
  )
}
