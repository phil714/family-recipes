import { RecipeStatus } from "types/graphql";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../Select/Select";

interface Props {
  id?: string;
  value: RecipeStatus;
  onChange: (status: RecipeStatus) => void;
}

const RecipeStatusSelect = ({ id, value, onChange }: Props) => {
  return (
    <Select value={value} onValueChange={onChange} defaultValue="DRAFT">
      <SelectTrigger id={id}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectItem value="DRAFT">Draft</SelectItem>
        <SelectItem value="PUBLIC">Public</SelectItem>
        <SelectItem value="PRIVATE">Private</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default RecipeStatusSelect;
