import React from 'react'

import { Editor } from '@tiptap/react'
import {
  BoldIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  RedoIcon,
  StrikethroughIcon,
  UndoIcon,
} from 'lucide-react'

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
        <BoldIcon />
      </MenuItem>
      <MenuItem
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
      >
        <ItalicIcon />
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
        isActive={editor.isActive('code')}
      >
        <CodeIcon />
      </MenuItem>
      <MenuItem
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive('heading', { level: 1 })}
      >
        <Heading1Icon />
      </MenuItem>
      <MenuItem
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive('heading', { level: 2 })}
      >
        <Heading2Icon />
      </MenuItem>
      <MenuItem
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive('heading', { level: 3 })}
      >
        <Heading3Icon />
      </MenuItem>
      <MenuItem
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
      >
        <ListIcon />
      </MenuItem>
      <MenuItem
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
      >
        <ListOrderedIcon />
      </MenuItem>
      {/* <button
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
      </button> */}
      <MenuItem
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        isActive={false}
      >
        <UndoIcon />
      </MenuItem>
      <MenuItem
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        isActive={false}
      >
        <RedoIcon />
      </MenuItem>
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
      type="button"
      className={cn(isActive && 'bg-blue-200')}
    >
      {children}
    </Button>
  )
}
