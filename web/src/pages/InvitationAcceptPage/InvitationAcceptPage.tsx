import InvitationAcceptCell from 'src/components/Invitation/InvitationAcceptCell'

type InvitationAcceptPageProps = {
  code: string
}

const InvitationAcceptPage = ({ code }: InvitationAcceptPageProps) => {
  return <InvitationAcceptCell code={code} />
}

export default InvitationAcceptPage
