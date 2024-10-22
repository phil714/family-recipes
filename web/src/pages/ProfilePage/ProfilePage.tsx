import { useAuth } from 'src/auth'
import ProfileCell from 'src/components/ProfileCell'

const ProfilePage = () => {
  const { currentUser } = useAuth()

  return <ProfileCell id={currentUser.id} />
}

export default ProfilePage
