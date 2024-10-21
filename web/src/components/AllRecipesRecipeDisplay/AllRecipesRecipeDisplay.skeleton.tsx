import { Skeleton } from 'src/components/Skeleton'

import { Card } from '../Card'

export function AllRecipesRecipeDisplaySkeleton() {
  return (
    <Card className="flex h-80 w-80 flex-col p-4 shadow-md">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="my-2 h-8 w-full" />
      <Skeleton className="h-20 w-full" />
      <div className="mt-2 flex justify-evenly gap-2">
        {Array.from({ length: 4 }).map(() => (
          <Skeleton className="h-5 w-16 rounded-full p-1" />
        ))}
      </div>
      <div className="mt-2 flex justify-evenly gap-2">
        {Array.from({ length: 4 }).map(() => (
          <Skeleton className="h-5 w-16 rounded-full p-1" />
        ))}
      </div>
    </Card>
  )
}
