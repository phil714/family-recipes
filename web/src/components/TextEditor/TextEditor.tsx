import {
  FloatingMenu,
  BubbleMenu,
  useEditor,
  EditorContent,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { TextEditorMenuBar } from '../TextEditorMenuBar/TextEditorMenuBar'

// define your extension array
const extensions = [StarterKit.configure()]

interface Props {
  value: string
  onChange: (value: string) => void
}

const TextEditor: React.FC<Props> = (props) => {
  const { value: content, onChange } = props

  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: 'h-64 p-2',
        name: 'description',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  return (
    <>
      <TextEditorMenuBar editor={editor} />
      <EditorContent editor={editor} />
      {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
      {/* {JSON.stringify(editor?.getHTML(), null, 2)} */}
    </>
  )
}

export default TextEditor
