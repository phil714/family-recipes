import InvitationCell from 'src/components/Invitation/InvitationCell'

type InvitationPageProps = {
  id: string
}

const InvitationPage = ({ id }: InvitationPageProps) => {
  return <InvitationCell id={id} />
}

export default InvitationPage
