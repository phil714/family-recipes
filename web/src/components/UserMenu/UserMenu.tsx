import { useTranslation } from 'react-i18next'

import { useAuth } from 'src/auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/components/DropdownMenu/DropdownMenu'
import { User } from 'src/components/User/User'

export const UserMenu = () => {
  const { currentUser, logOut } = useAuth()
  const { t } = useTranslation('common')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <User user={currentUser} options={{ email: false }} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white">
        <DropdownMenuLabel>{t('components.myAccount')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>{t('profile')}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => logOut()}>
          {t('logOut')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
