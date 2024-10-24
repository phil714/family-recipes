import React from 'react'

import { User, IUser } from '../User'

interface UserGroupProps {
  users: IUser[]
}

const DISPLAYED_USER_COUNT = 5

export const UserGroup: React.FC<UserGroupProps> = ({ users }) => {
  // Limit the number of avatars to display to a maximum of 5
  const displayedUsers = users.slice(0, DISPLAYED_USER_COUNT)
  const extraUsersCount = users.length - displayedUsers.length

  return (
    <div className="flex">
      {displayedUsers.map((user, index) => (
        <div
          key={index}
          className="relative -ml-8 first:ml-0"
          style={{ zIndex: DISPLAYED_USER_COUNT - index }}
        >
          <User
            user={user}
            options={{ name: false, email: false, avatar: true }}
          />
        </div>
      ))}

      {/* If there are more users than displayed, show a "+X" avatar */}
      {extraUsersCount > 0 && (
        <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-gray-600">
          <span className="text-xs font-medium">+{extraUsersCount}</span>
        </div>
      )}
    </div>
  )
}
