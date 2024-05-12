import EditInvitationCell from 'src/components/Invitation/EditInvitationCell'

type InvitationPageProps = {
  id: string
}

const EditInvitationPage = ({ id }: InvitationPageProps) => {
  return <EditInvitationCell id={id} />
}

export default EditInvitationPage
