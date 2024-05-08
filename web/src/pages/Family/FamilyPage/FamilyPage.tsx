import FamilyCell from 'src/components/Family/FamilyCell'

type FamilyPageProps = {
  id: string
}

const FamilyPage = ({ id }: FamilyPageProps) => {
  return <FamilyCell id={id} />
}

export default FamilyPage
