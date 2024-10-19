import {
  FloatingMenu,
  BubbleMenu,
  useEditor,
  EditorContent,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { TextEditorMenuBar } from '../TextEditorMenuBar/TextEditorMenuBar'
import { cn } from 'src/lib/utils'

// define your extension array
const extensions = [StarterKit.configure()]

interface Props {
  value: string
  onChange: (value: string) => void
  editable?: boolean;
  className?: string;
}

export const TextEditor: React.FC<Props> = (props) => {
  const { value: content, onChange, className, editable = true } = props

  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: cn('h-64 p-2', className),
        name: 'description',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
    editable,
  })

  return (
    <>
      {editable && <TextEditorMenuBar editor={editor} />}
      <EditorContent editor={editor} />
      {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
      {/* {JSON.stringify(editor?.getHTML(), null, 2)} */}
    </>
  )
}

export default TextEditor
