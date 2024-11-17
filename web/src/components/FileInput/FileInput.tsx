import { Input } from 'src/components/Input/Input'
import { upload } from 'src/lib/file-upload'

interface Props {
  onChange: (value: string) => void
}

export function FileInput(props: Props) {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    const { files } = e.target
    const { url } = await upload(files[0])

    props.onChange(url)
  }

  return (
    <Input id="picture" type="file" onChange={handleChange} accept="image/*" />
  )
}
