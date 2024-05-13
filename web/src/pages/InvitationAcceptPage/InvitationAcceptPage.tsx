import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const InvitationAcceptPage = () => {
  return (
    <>
      <Metadata title="InvitationAccept" description="InvitationAccept page" />
      <h1>InvitationAcceptPage</h1>
      <p>
        Find me in{' '}
        <code>
          ./web/src/pages/InvitationAcceptPage/InvitationAcceptPage.tsx
        </code>
      </p>
      <p>
        My default route is named <code>invitationAccept</code>, link to me with
        `<Link to={routes.invitationAccept()}>InvitationAccept</Link>`
      </p>
    </>
  )
}

export default InvitationAcceptPage
