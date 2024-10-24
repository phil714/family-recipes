import { RecipeStatus } from 'types/graphql'

import RecipeStatusDisplay from '../RecipeStatusDisplay/RecipeStatusDisplay'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../Select/Select'

interface Props {
  id?: string
  value: RecipeStatus
  onChange: (status: RecipeStatus) => void
}

const RecipeStatusSelect = ({ id, value, onChange }: Props) => {
  return (
    <Select value={value} onValueChange={onChange} defaultValue="DRAFT">
      <SelectTrigger id={id}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectItem value="DRAFT">
          <RecipeStatusDisplay status={'DRAFT'} />
        </SelectItem>
        <SelectItem value="PUBLIC">
          <RecipeStatusDisplay status={'PUBLIC'} />
        </SelectItem>
        <SelectItem value="PRIVATE">
          <RecipeStatusDisplay status={'PRIVATE'} />
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

export default RecipeStatusSelect
