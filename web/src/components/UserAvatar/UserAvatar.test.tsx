import { render } from '@redwoodjs/testing/web'

import UserAvatar from './UserAvatar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UserAvatar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <UserAvatar
          user={{
            name: 'Michel Tremblay',
            avatarUrl: 'https://picsum.photos/id/237/50',
          }}
        />
      )
    }).not.toThrow()
  })
})
