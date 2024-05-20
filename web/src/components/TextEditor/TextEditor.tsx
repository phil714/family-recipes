import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
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

const content = '<p>Hello World!</p>'

interface Props {
  content: string
}

const TextEditor = () => {
  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: 'h-64',
      },
    },
  })

  return (
    <>
      <TextEditorMenuBar editor={editor} />
      <EditorContent editor={editor} />
      {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
      {JSON.stringify(editor?.getHTML(), null, 2)}
    </>
  )
}

export default TextEditor
