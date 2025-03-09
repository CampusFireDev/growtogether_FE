import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

interface TiptapEditorProps {
  content: string;  // 부모에서 받은 content 상태
  onChange: (content: string) => void;  // 부모에게 내용을 전달하는 함수
}

const TiptapEditor = ({ content, onChange }: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [
        StarterKit,
        Placeholder.configure({
            placeholder: "내용을 입력해주세요." 
        }),
    ],
    content: content,  // 부모에서 전달된 content
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());  // 에디터 내용 변경 시 부모로 전달
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full h-100 border border-[#e5e5e5] rounded-[5px] text-[13px]">
      {/* 툴바 */}
      <div className="flex gap-2 mb-2">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className="px-3 py-1 border rounded">
          Bold
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className="px-3 py-1 border rounded">
          Italic
        </button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} className="px-3 py-1 border rounded">
          Strike
        </button>
      </div>

      {/* 에디터 UI */}
      <EditorContent editor={editor} className="p-2" />
    </div>
  );
};

export default TiptapEditor;
