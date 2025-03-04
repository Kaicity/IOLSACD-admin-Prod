'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';

import { BoldIcon, ItalicIcon, List, ListOrdered, Redo2, StrikethroughIcon, UnderlineIcon, Undo2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';

import { Separator } from './ui/separator';
import { UploadButton } from '@/lib/uploadthing';
import { useEffect, useState } from 'react';

const Editor = ({ value, onChange }: { value: string; onChange: (content: string) => void }) => {
  const [isSticky, setIsSticky] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Underline, Image, TextStyle, Color],
    content: value || `<h2>Tiêu đề</h2><p>Giới thiệu ngắn về bài viết</p>`,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'h-full cursor-text rounded-md border p-5 ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
      },
    },
    immediatelyRender: false,
  });

  // Cập nhật nội dung editor khi giá trị value thay đổi
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }

    const handleScroll = () => {
      if (window.scrollY > 600) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold mb-2 text-primary">Trình soạn thảo</h2>

      <div className={`p-2 flex flex-wrap ${isSticky ? 'fixed top-16 left-64 w-full bg-white shadow-lg z-50' : ''}`}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 border rounded ${editor.isActive('bold') ? 'bg-gray-300' : ''}`}
        >
          <BoldIcon size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 border rounded ${editor.isActive('italic') ? 'bg-gray-300' : ''}`}
        >
          <ItalicIcon size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-2 py-1 border rounded ${editor.isActive('underline') ? 'bg-gray-300' : ''}`}
        >
          <UnderlineIcon size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-2 py-1 border rounded ${editor.isActive('strike') ? 'bg-gray-300' : ''}`}
        >
          <StrikethroughIcon size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-2 py-1 border rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-300' : ''}`}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2 py-1 border rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-300' : ''}`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-2 py-1 border rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-300' : ''}`}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={`px-2 py-1 border rounded ${editor.isActive('heading', { level: 4 }) ? 'bg-gray-300' : ''}`}
        >
          H4
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={`px-2 py-1 border rounded ${editor.isActive('heading', { level: 5 }) ? 'bg-gray-300' : ''}`}
        >
          H5
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 border rounded ${editor.isActive('bulletList') ? 'bg-gray-300' : ''}`}
        >
          <List size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2 py-1 border rounded ${editor.isActive('orderedList') ? 'bg-gray-300' : ''}`}
        >
          <ListOrdered size={18} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().undo().run()} className="px-2 py-1 border rounded">
          <Undo2 size={18} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className="px-2 py-1 border rounded">
          <Redo2 size={18} />
        </button>

        <div className="flex items-center space-x-2">
          <input
            type="color"
            id="colorPicker"
            onInput={(event) =>
              editor &&
              editor
                .chain()
                .focus()
                .setColor((event.target as HTMLInputElement).value)
                .run()
            }
            value={editor?.getAttributes('textStyle').color || '#000000'}
            className="opacity-0 absolute w-0 h-0"
          />
          <Label
            htmlFor="colorPicker"
            className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer flex items-center justify-center"
            style={{
              backgroundColor: editor?.getAttributes('textStyle').color || '#000000',
            }}
          >
            🎨
          </Label>
          <button type="button" onClick={() => editor.chain().focus().unsetColor().run()} className="px-2 py-1 border rounded">
            Reset color
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-3">
        {/* Trình soạn thảo */}

        <EditorContent editor={editor} className="ProseMirror" />

        {/* Bố cục mẫu */}
        <div className="border rounded-lg p-4 bg-gray-100 sticky top-4">
          <h2 className="text-lg font-bold mb-2 text-primary">Bố cục mẫu</h2>
          <hr className="mb-1 border-muted-foreground" />
          <article>
            <h1 className="text-xl font-bold">Tiêu đề bài viết</h1>
            <p className="italic">Giới thiệu ngắn gọn về nội dung bài viết.</p>

            <h2 className="text-lg font-bold mt-3">Mục 1: Giới thiệu</h2>
            <p>Đây là phần giới thiệu về bài viết.</p>

            <h2 className="text-lg font-bold mt-3">Mục 2: Nội dung chính</h2>
            <p>Chi tiết nội dung bài viết.</p>
            <img src="https://placehold.co/800x400/6A00F5/white" alt="Mô tả hình ảnh" className="rounded-lg my-2" />
            <p className="text-sm text-gray-500">Chú thích ảnh: Hình minh họa.</p>

            <h2 className="text-lg font-bold mt-3">Mục 3: Kết luận</h2>
            <p>Tóm tắt nội dung chính.</p>
            <img src="https://placehold.co/800x400/6A00F5/white" alt="Hình ảnh minh họa" className="rounded-lg my-2" />
            <p className="text-sm text-gray-500">Chú thích ảnh: Hình minh họa.</p>
          </article>
        </div>
      </div>

      <Separator className=" border-gray-300" />
      {/* Upload nhiều ảnh */}
      <div className="flex flex-col gap-2 items-center py-4">
        <Label className="text-primary font-bold">Tải hình ảnh lên trình soạn thảo</Label>
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            if (res && res.length > 0) {
              res.forEach((file) => {
                editor.chain().focus().setImage({ src: file.url }).run();
              });
            }
          }}
          onUploadError={(error) => alert(`Lỗi: ${error.message}`)}
        />
      </div>
    </div>
  );
};

export default Editor;
