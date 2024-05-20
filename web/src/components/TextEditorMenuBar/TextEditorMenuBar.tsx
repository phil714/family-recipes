import React from 'react'

import {
  CodeIcon,
  FontBoldIcon,
  FontItalicIcon,
  ListBulletIcon,
  StrikethroughIcon,
} from '@radix-ui/react-icons'
import { Editor } from '@tiptap/react'

import { cn } from 'src/lib/utils'

import { Button, ButtonProps } from '../Button/Button'

interface Props {
  editor: Editor
}

export const TextEditorMenuBar: React.FC<Props> = (props) => {
  const { editor } = props

  if (!editor) {
    return null
  }

  return (
    <div className="flex items-center gap-1">
      <MenuItem
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
      >
        <FontBoldIcon />
      </MenuItem>
      <MenuItem
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
      >
        <FontItalicIcon />
      </MenuItem>
      <MenuItem
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        isActive={editor.isActive('strike')}
      >
        <StrikethroughIcon />
      </MenuItem>
      <MenuItem
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        isActive={editor.isActive('strike')}
      >
        <CodeIcon />
      </MenuItem>
      <MenuItem
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive('heading', { level: 1 })}
      >
        H1
      </MenuItem>
      <MenuItem
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive('heading', { level: 2 })}
      >
        H2
      </MenuItem>
      <MenuItem
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive('heading', { level: 3 })}
      >
        H3
      </MenuItem>
      <MenuItem
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
      >
        <ListBulletIcon />
      </MenuItem>
      {/* <MenuItem
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
      >
        <ListIc />
      </MenuItem>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        redo
      </button> */}
    </div>
  )
}

const MenuItem: React.FC<ButtonProps & { isActive: boolean }> = ({
  children,
  isActive,
  ...otherProps
}) => {
  return (
    <Button
      {...otherProps}
      variant="secondary"
      size="icon"
      className={cn(isActive && 'bg-blue-200')}
    >
      {children}
    </Button>
  )
}
