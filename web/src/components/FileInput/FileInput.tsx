import { useTranslation } from 'react-i18next'

import { Input } from 'src/components/Input/Input'
import { upload } from 'src/lib/file-upload'

interface Props {
  onChange: (value: string) => void
  options?: {
    maximumImageDimensions?: {
      height: number
      width: number
    }
    maximumImageSize?: number
  }
  tag: 'avatar' | 'mainImageUrl'
}

const DEFAULT_FILE_SIZE_LIMIT = 1024 * 1024 * 5 // 5 MB

export function FileInput(props: Props) {
  const { i18n } = useTranslation()

  const maximumImageSize =
    props.options?.maximumImageSize ?? DEFAULT_FILE_SIZE_LIMIT

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    const { files } = e.target
    const params = await upload(files[0], {
      tags: {
        location: props.tag,
      },
    })
    // const imageSize = getImageSize(params.url)

    if (params.size > maximumImageSize) {
      throw new Error('image too big')
    }

    props.onChange(params.url)
  }

  return (
    <Input
      id="picture"
      type="file"
      onChange={handleChange}
      accept="image/*"
      lang={i18n.language}
    />
  )
}
