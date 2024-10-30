import { useTranslation } from 'react-i18next'

import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import ProfileCell from 'src/components/ProfileCell'
import ProfileFamiliesCell from 'src/components/ProfileFamiliesCell'

const ProfilePage = () => {
  const { currentUser } = useAuth()
  const { t } = useTranslation('profile')

  return (
    <>
      <Metadata
        title={t('profile:title')}
        description={t('profile:description')}
      />
      <div className="flex flex-col gap-8 p-4 sm:flex-row sm:justify-center sm:p-8">
        <ProfileCell id={currentUser.id} />
        <ProfileFamiliesCell />
      </div>
    </>
  )
}

export default ProfilePage
