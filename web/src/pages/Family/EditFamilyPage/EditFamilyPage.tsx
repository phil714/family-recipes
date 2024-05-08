import EditFamilyCell from 'src/components/Family/EditFamilyCell'

type FamilyPageProps = {
  id: string
}

const EditFamilyPage = ({ id }: FamilyPageProps) => {
  return <EditFamilyCell id={id} />
}

export default EditFamilyPage
