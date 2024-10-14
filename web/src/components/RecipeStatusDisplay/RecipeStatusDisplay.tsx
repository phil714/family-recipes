import { t } from "i18next";
import { cn } from "src/lib/utils";
import { RecipeStatus } from "types/graphql";

interface Props {
  status: RecipeStatus;
  size?: 'md' | 'lg'
}

const labelMap: Record<RecipeStatus, string> = {
  DRAFT: t("recipe:status-draft"),
  PRIVATE: t("recipe:status-private"),
  PUBLIC: t("recipe:status-public")
}

const RecipeStatusDisplay = ({ status }: Props) => {
  return (
    <div className={cn('p-1 rounded-md bg-slate-200', status === 'DRAFT' && 'bg-yellow-100', status === 'PUBLIC' && 'bg-green-200')}>
      {labelMap[status]}
    </div>
  );
};

export default RecipeStatusDisplay;
