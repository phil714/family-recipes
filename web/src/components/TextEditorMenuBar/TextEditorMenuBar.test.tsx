import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { render, renderHook } from '@redwoodjs/testing/web'

import { TextEditorMenuBar } from './TextEditorMenuBar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

const extensions = [StarterKit.configure()]

describe('TextEditorMenuBar', () => {
  it('renders successfully', () => {
    const hook = renderHook(() =>
      useEditor({
        extensions,
        content: 'test',
        editorProps: {
          attributes: {
            class: 'h-64 p-2',
            name: 'description',
          },
        },
      })
    )
    const editor = hook.result.current

    expect(() => {
      render(<TextEditorMenuBar editor={editor} />)
    }).not.toThrow()
  })
})
