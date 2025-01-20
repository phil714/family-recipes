import UserAvatar from 'src/components/UserAvatar/UserAvatar'

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

  return (
    <div className="flex items-center gap-4">
      {options.avatar && <UserAvatar user={user} />}
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
