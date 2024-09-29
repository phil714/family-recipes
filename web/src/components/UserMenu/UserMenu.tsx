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
  const { t } = useTranslation()

  console.log(t('user-menu:logout'))

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <User user={currentUser} options={{ email: false }} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white">
        <DropdownMenuLabel>{t('user-menu:my-account')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>{t('user-menu:profile')}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => logOut()}>
          {t('user-menu:logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
