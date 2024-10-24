import { Skeleton } from '../Skeleton'

import { defaultOptions, Props } from './User'

export const UserSkeleton = (props: Pick<Props, 'options'>) => {
  const options = { ...defaultOptions, ...props.options }

  return (
    <div className="flex items-center gap-4">
      {options.avatar && <Skeleton className="hidden h-9 w-9 rounded-full" />}
      <div className="grid gap-1">
        {options.name && <Skeleton className="h-5 w-full" />}
        {options.email && <Skeleton className="h-4 w-full" />}
      </div>
    </div>
  )
}
