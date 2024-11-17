import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from 'src/components/Avatar/Avatar'

export interface IUser {
  name: string
  email: string
  avatarUrl?: string | null
}

export interface Props {
  user: IUser
  options?: {
    name?: boolean
    email?: boolean
    avatar?: boolean
  }
}

export const defaultOptions = { name: true, email: true, avatar: true }

export const User: React.FC<Props> = (props) => {
  const { user } = props
  const options = { ...defaultOptions, ...props.options }
  const fallback = user.name.split(' ').map((str) => str[0]?.toUpperCase())

  return (
    <div className="flex items-center gap-4">
      {options.avatar && (
        <Avatar className="hidden h-9 w-9 sm:flex">
          <AvatarImage src={user.avatarUrl} alt="Avatar" />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      )}
      <div className="grid gap-1">
        {options.name && (
          <p className="text-sm font-medium leading-none">{user.name}</p>
        )}
        {options.email && (
          <p className="text-xs text-muted-foreground">{user.email}</p>
        )}
      </div>
    </div>
  )
}
