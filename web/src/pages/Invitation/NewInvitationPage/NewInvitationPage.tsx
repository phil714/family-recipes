import NewInvitation from 'src/components/Invitation/NewInvitation'

type NewInvitationPageProps = {
  familyId: string
}

const NewInvitationPage = ({ familyId }: NewInvitationPageProps) => {
  return <NewInvitation familyId={familyId} />
}
export default NewInvitationPage
