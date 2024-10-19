import { Layout } from "./FamilyMembersCell"
import { UserSkeleton } from "../User/User.skeleton"

export const FamilyMembersCellSkeleton = () => {
  return (
    <Layout>{Array.from({ length: 3 }).map(() => <UserSkeleton />)}</Layout>
  )
}
