import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import CustomCodeBlock from "./CustomCodeBlock";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../../api.js";

const Editor = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isBlog = location.pathname.includes("blog");
  const API_ENDPOINT = isBlog ? "/blog" : "/project";

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [techStack, setTechStack] = useState("");
  const [content, setContent] = useState(""); // This will hold the HTML string
  const [docId, setDocId] = useState(null); // ✅ MUST BE HERE
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
        codeBlock: false,
      }),
      Underline,
      TextStyle,
      FontFamily,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-400 underline hover:text-blue-300",
        },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      CustomCodeBlock,
    ],
    content: "", // Initial content
    // FIX: Update the 'content' state whenever the user types
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-invert prose-slate max-w-none focus:outline-none min-h-[500px] p-8 md:p-12 lg:p-16 selection:bg-blue-500/30",
      },
    },
  });

  if (!editor) return null;

  const saveContent = async (status) => {
    if (!title.trim()) return setError("Please enter a title");
    if (editor.getText().trim().length === 0)
      return setError("Content is required");

    setLoading(true);
    setError("");

    const payload = {
      title: title.trim(),
      subtitle: subtitle.trim(),
      content,
      techStack: !isBlog
        ? techStack
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : undefined,
    };

    try {
      let currentDocId = docId;

      // 1️⃣ CREATE if not exists
      if (!currentDocId) {
        const res = await API.post(API_ENDPOINT, payload);
        currentDocId = res.data._id;
        setDocId(currentDocId); // keep state in sync
      }

      // 2️⃣ SAVE DRAFT
      if (status === "draft") {
        await API.put(`${API_ENDPOINT}/${currentDocId}`, payload);
        alert("✅ Draft saved");
        return;
      }

      // 3️⃣ PUBLISH
      if (status === "published") {
        await API.put(`${API_ENDPOINT}/${currentDocId}`, payload);
        await API.patch(`${API_ENDPOINT}/${currentDocId}/publish`);
        alert("🚀 Published");
        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  const Btn = ({ onClick, active, children, title }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-3 py-1.5 text-xs rounded-md font-semibold transition-all ${
        active
          ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_10px_rgba(37,99,235,0.4)]"
          : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200 disabled:opacity-30"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-blue-500/30">
      <div className="sticky top-0 z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-800/50 px-4 py-3">
        {/* TOP BAR */}
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="group flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              ←
            </span>
            Dashboard
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => saveContent("draft")}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg border border-zinc-700 transition-all disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              onClick={() => saveContent("published")}
              disabled={loading}
              className="px-5 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-lg shadow-blue-900/20 transition-all disabled:opacity-50 active:scale-95"
            >
              Publish {isBlog ? "Blog" : "Project"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-md">
            ⚠️ {error}
          </div>
        )}

        <div className="space-y-6">
          {/* INPUTS */}
          <div className="space-y-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title..."
              className="w-full text-5xl font-black bg-transparent outline-none placeholder:text-zinc-800 tracking-tight"
            />

            <input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Add a short subtitle..."
              className="w-full text-xl font-medium text-zinc-500 bg-transparent outline-none placeholder:text-zinc-800/60"
            />

            {!isBlog && (
              <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl space-y-2">
                <label className="text-[10px] font-bold uppercase text-blue-400 tracking-[0.2em]">
                  Technologies (Comma separated)
                </label>
                <input
                  value={techStack}
                  onChange={(e) => setTechStack(e.target.value)}
                  placeholder="React, Tailwind, Express..."
                  className="w-full bg-transparent text-zinc-300 outline-none placeholder:text-zinc-700 text-sm"
                />
              </div>
            )}
          </div>

          {/* TOOLBAR */}
          <div className="sticky top-18.25 z-40 flex flex-wrap gap-1.5 p-2 bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 rounded-xl shadow-xl">
            <Btn
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
            >
              Undo
            </Btn>
            <Btn
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
            >
              Redo
            </Btn>
            <Btn
              onClick={() => editor.chain().focus().toggleStrike().run()}
              active={editor.isActive("strike")}
            >
              S
            </Btn>
            <Btn
              onClick={() =>
                editor.chain().focus().unsetAllMarks().clearNodes().run()
              }
            >
              Clear
            </Btn>
            <Btn
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              active={editor.isActive("blockquote")}
            >
              Quote
            </Btn>

            <Btn
              onClick={() => editor.chain().focus().toggleBold().run()}
              active={editor.isActive("bold")}
            >
              B
            </Btn>
            <Btn
              onClick={() => editor.chain().focus().toggleItalic().run()}
              active={editor.isActive("italic")}
            >
              I
            </Btn>
            <Btn
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              active={editor.isActive("underline")}
            >
              U
            </Btn>
            <Btn
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              active={editor.isActive("heading", { level: 1 })}
            >
              H1
            </Btn>
            <Btn
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              active={editor.isActive("heading", { level: 2 })}
            >
              H2
            </Btn>
            <Btn
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              active={editor.isActive("heading", { level: 3 })}
            >
              H3
            </Btn>
            <div className="w-px h-6 bg-slate-700 mx-1"></div>
            <Btn
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              active={editor.isActive("bulletList")}
            >
              • List
            </Btn>
            <Btn
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              active={editor.isActive("orderedList")}
            >
              1. List
            </Btn>
            <Btn
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              active={editor.isActive("horizontalRule")}
            >
              separator
            </Btn>
            <Btn
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              active={editor.isActive({ textAlign: "left" })}
            >
              left
            </Btn>
            <Btn
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              active={editor.isActive({ textAlign: "center" })}
            >
              center
            </Btn>
            <Btn
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              active={editor.isActive({ textAlign: "right" })}
            >
              right
            </Btn>
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className="px-3 py-1 bg-zinc-900 rounded text-white"
            >
              {"</>"}
            </button>
          </div>

          {/* EDITOR */}
          <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl min-h-150 shadow-inner">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
