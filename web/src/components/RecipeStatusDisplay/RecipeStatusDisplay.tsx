import { t } from 'i18next'
import { RecipeStatus } from 'types/graphql'

import { cn } from 'src/lib/utils'

interface Props {
  status: RecipeStatus
  size?: 'md' | 'lg'
}

const labelMap: Record<RecipeStatus, string> = {
  DRAFT: t('recipe:status-draft'),
  PRIVATE: t('recipe:status-private'),
  PUBLIC: t('recipe:status-public'),
}

const RecipeStatusDisplay = ({ status }: Props) => {
  return (
    <div
      className={cn(
        'rounded-md bg-slate-200 p-1',
        status === 'DRAFT' && 'bg-yellow-100',
        status === 'PUBLIC' && 'bg-green-200'
      )}
    >
      {labelMap[status]}
    </div>
  )
}

export default RecipeStatusDisplay
