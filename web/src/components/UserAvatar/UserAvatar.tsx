import { cva, type VariantProps } from 'class-variance-authority'

import { transform, TransformOptions } from 'src/lib/file-upload'
import { cn } from 'src/lib/utils'

import { Avatar, AvatarFallback, AvatarImage } from '../Avatar/Avatar'

const userAvatarVariants = cva('', {
  variants: {
    size: {
      md: 'h-9 w-9',
      lg: 'h-20 w-20',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

interface UserProps {
  user: {
    name: string
    avatarUrl?: string | null
  }
}

export type UserAvatarProps = UserProps &
  VariantProps<typeof userAvatarVariants>

const transformMap: Record<UserAvatarProps['size'], TransformOptions> = {
  md: { quality: { value: 10 }, resize: { height: 36, width: 36 } },
  lg: { quality: { value: 20 }, resize: { height: 80, width: 80 } },
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  size = 'md',
}) => {
  const transformedUrl = user.avatarUrl
    ? transform(user.avatarUrl, transformMap[size])
    : null

  return (
    <Avatar className={cn(userAvatarVariants({ size }))}>
      <AvatarImage alt={user.name} src={transformedUrl} />
      <AvatarFallback>
        {user.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .substring(0, 2)}
      </AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
