import { UserSkeleton } from '../User/User.skeleton'

import { Layout } from './FamilyMembersCell'

export const FamilyMembersCellSkeleton = () => {
  return (
    <Layout>
      {Array.from({ length: 3 }).map((_, index) => (
        <UserSkeleton key={index} />
      ))}
    </Layout>
  )
}
