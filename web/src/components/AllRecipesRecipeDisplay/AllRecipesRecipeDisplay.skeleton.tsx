import { Skeleton } from "src/components/Skeleton"
import { Card } from "../Card"

export function AllRecipesRecipeDisplaySkeleton() {
  return (
    <Card className="h-80 w-80 flex flex-col shadow-md p-4">
      <Skeleton className="w-full h-40" />
      <Skeleton className="w-full h-8 my-2" />
      <Skeleton className="w-full h-20" />
      <div className="flex gap-2 mt-2 justify-evenly">{Array.from({ length: 4 }).map(() => <Skeleton className="w-16 h-5 p-1 rounded-full"/>)}</div>
      <div className="flex gap-2 mt-2 justify-evenly">{Array.from({ length: 4 }).map(() => <Skeleton className="w-16 h-5 p-1 rounded-full" />)}</div>
    </Card>
  )
}
