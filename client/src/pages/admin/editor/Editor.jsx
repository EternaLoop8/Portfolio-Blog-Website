import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import {TextStyle}from "@tiptap/extension-text-style";

import CustomCodeBlock from "./CustomCodeBlock";

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Underline,
      TextStyle,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CustomCodeBlock,
    ],
    content: "",
  });

  if (!editor) return null;

  /* ---------- ACTIONS ---------- */

  const addCodeBlock = () => {
    editor
      .chain()
      .focus()
      .insertContent({
        type: "codeBlock",
        attrs: {
          lang: "cpp",
          code: "",
        },
      })
      .run();
  };

  const setLink = () => {
    const url = prompt("Enter URL");
    if (!url) return;
    editor.chain().focus().setLink({ href: url }).run();
  };

  const setFontSize = (size) => {
    if (!size) return;
    editor
      .chain()
      .focus()
      .setMark("textStyle", { fontSize: size })
      .run();
  };

  const saveDraft = () => {
    const data = editor.getJSON();
    console.log("DRAFT:", data);
    alert("Draft saved (check console)");
  };

  const publish = () => {
    const data = editor.getJSON();
    console.log("PUBLISHED:", data);
    alert("Published (check console)");
  };

  /* ---------- UI ---------- */

  return (
    <div className="min-h-screen bg-black text-white">

      {/* TOP BAR */}
      <div className="flex items-center gap-3 px-4 py-2 border-b border-slate-700">
        <button className="font-bold mr-auto">← Go back</button>

        <button
          onClick={saveDraft}
          className="bg-blue-200 text-black px-4 py-2 rounded"
        >
          Save as Draft
        </button>

        <button
          onClick={publish}
          className="bg-blue-400 text-black px-4 py-2 rounded"
        >
          Publish
        </button>
      </div>

      {/* TITLE */}
      <div className="max-w-3xl mx-auto px-4 mt-10">
        <input
          placeholder="Title"
          className="w-full text-4xl font-bold bg-transparent outline-none placeholder-gray-500"
        />
      </div>

      {/* SUBTITLE */}
      <div className="max-w-3xl mx-auto px-4 mt-4">
        <input
          placeholder="Subtitle"
          className="w-full text-2xl bg-transparent outline-none placeholder-gray-500"
        />
      </div>

      {/* TOOLBAR */}
      <div className="max-w-3xl mx-auto px-4 mt-6 flex flex-wrap gap-2 border-b border-slate-700 pb-2">

        <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} label="B" />
        <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} label="I" />
        <ToolbarBtn onClick={() => editor.chain().focus().toggleUnderline().run()} label="U" />

        <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} label="• List" />
        <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} label="1. List" />

        <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign("left").run()} label="Left" />
        <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign("center").run()} label="Center" />
        <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign("right").run()} label="Right" />

        <ToolbarBtn onClick={setLink} label="Link" />
        <ToolbarBtn onClick={addCodeBlock} label="Code" />

        {/* FONT SIZE */}
        <select
          onChange={(e) => setFontSize(e.target.value)}
          className="bg-black border border-slate-600 px-2 py-1 text-sm"
        >
          <option value="">Font size</option>
          <option value="14px">Small</option>
          <option value="16px">Normal</option>
          <option value="20px">Large</option>
          <option value="24px">XL</option>
        </select>
      </div>

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto px-4 mt-6">
        <EditorContent
          editor={editor}
          className="
            prose prose-invert max-w-none
            min-h-[250px]
            cursor-text
            p-4
            border border-slate-700 rounded-lg
            focus:outline-none
          "
        />
      </div>
    </div>
  );
};

/* ---------- TOOLBAR BUTTON ---------- */

const ToolbarBtn = ({ onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    className="px-3 py-1 text-sm rounded border border-slate-600 hover:bg-slate-700"
  >
    {label}
  </button>
);

export default Editor;
