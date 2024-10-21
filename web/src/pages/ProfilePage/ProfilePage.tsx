import { useAuth } from 'src/auth'
import ProfileCell from 'src/components/ProfileCell'

type ProfilePageProps = {
  id: string
}

const ProfilePage = ({ id }: ProfilePageProps) => {
  const { currentUser } = useAuth()

  return <ProfileCell id={currentUser.id} />
}

export default ProfilePage
