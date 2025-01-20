import { useTranslation } from 'react-i18next'

import { Link, routes } from '@redwoodjs/router'

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
  const { t, i18n } = useTranslation('user-menu')

  console.log('i18n.language', i18n.language)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <User user={currentUser} options={{ email: false }} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white">
        <DropdownMenuLabel>{t('user-menu:my-account')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to={routes.profile()}>
          <DropdownMenuItem>{t('user-menu:profile')}</DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={() => logOut()}>
          {t('user-menu:logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
