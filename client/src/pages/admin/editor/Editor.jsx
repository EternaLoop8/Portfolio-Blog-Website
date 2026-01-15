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

/* ---------------------------------- */
/* EDITOR COMPONENT */
/* ---------------------------------- */
const Editor = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isBlog = location.pathname.includes("blog");
  const API_URL = isBlog ? "/blog" : "/project";

  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // disable default to use custom
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
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CustomCodeBlock, // Your custom code block with Shiki
    ],
    content: "<p>Start writing your content here...</p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-invert prose-lg max-w-none focus:outline-none min-h-[400px]",
      },
    },
  });

  if (!editor) return null;

  /* ---------------------------------- */
  /* SAVE / PUBLISH WITH ERROR HANDLING */
  /* ---------------------------------- */
  const saveDraft = async () => {
    // Validation
    if (!title.trim()) {
      setError("Please enter a title");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        title: title.trim(),
        content: editor.getHTML(),
        status: "draft",
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save draft");
      }

      const data = await response.json();
      console.log("Draft saved:", data);
      
      alert("✅ Draft saved successfully!");
    } catch (err) {
      console.error("Save error:", err);
      setError(err.message || "Failed to save draft. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const publish = async () => {
    // Validation
    if (!title.trim()) {
      setError("Please enter a title");
      return;
    }

    const textContent = editor.getText().trim();
    if (!textContent || textContent === "Start writing your content here...") {
      setError("Please add some content before publishing");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        title: title.trim(),
        content: editor.getHTML(),
        status: "published",
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to publish");
      }

      const data = await response.json();
      console.log("Published:", data);
      
      alert("✅ Published successfully!");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Publish error:", err);
      setError(err.message || "Failed to publish. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------------- */
  /* TOOLBAR BUTTON */
  /* ---------------------------------- */
  const Btn = ({ onClick, active, children, disabled }) => (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`px-3 py-1.5 text-xs rounded-md font-semibold transition-all ${
        active
          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
          : "text-slate-300 hover:bg-slate-700 hover:text-white"
      } ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">

        {/* TOP BAR */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-6 py-4 bg-slate-800/50 border-b border-slate-700/50">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            ← Back to Dashboard
          </button>

          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={saveDraft}
              disabled={loading}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 text-sm bg-slate-700 rounded-lg text-white hover:bg-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? "⏳" : "💾"} Save Draft
            </button>
            <button
              onClick={publish}
              disabled={loading}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 text-sm bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg text-white hover:from-blue-500 hover:to-blue-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg shadow-blue-500/30"
            >
              {loading ? "⏳" : "🚀"} Publish
            </button>
          </div>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mx-6 mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* TITLE AREA */}
        <div className="p-8 border-b border-slate-700/50">
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError("");
            }}
            placeholder={isBlog ? "Blog Title" : "Project Title"}
            className="w-full text-4xl md:text-5xl font-black bg-transparent outline-none text-white placeholder-slate-600 mb-2"
          />
          <p className="text-sm text-slate-500">
            {isBlog ? "Create a new blog post" : "Create a new project"}
          </p>
        </div>

        {/* TOOLBAR */}
        <div className="flex flex-wrap gap-2 px-6 py-4 bg-slate-800/30 border-b border-slate-700/50 sticky top-0 z-10 backdrop-blur-lg">
          
          {/* Undo/Redo */}
          <div className="flex gap-1 pr-2 border-r border-slate-700">
            <Btn 
              onClick={() => editor.chain().focus().undo().run()} 
              disabled={!editor.can().undo()}
            >
              ↺
            </Btn>
            <Btn 
              onClick={() => editor.chain().focus().redo().run()} 
              disabled={!editor.can().redo()}
            >
              ↻
            </Btn>
          </div>

          {/* Headings */}
          <Btn
            active={editor.isActive("heading", { level: 1 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          >
            H1
          </Btn>
          <Btn
            active={editor.isActive("heading", { level: 2 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            H2
          </Btn>
          <Btn
            active={editor.isActive("heading", { level: 3 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          >
            H3
          </Btn>

          <div className="w-px h-6 bg-slate-700"></div>

          {/* Text Formatting */}
          <Btn active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
            <strong>B</strong>
          </Btn>
          <Btn active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
            <em>I</em>
          </Btn>
          <Btn active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
            <u>U</u>
          </Btn>
          <Btn active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
            <s>S</s>
          </Btn>

          <div className="w-px h-6 bg-slate-700"></div>

          {/* Lists */}
          <Btn
            active={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            • List
          </Btn>
          <Btn
            active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            1. List
          </Btn>

          <div className="w-px h-6 bg-slate-700"></div>

          {/* Blockquote */}
          <Btn
            active={editor.isActive("blockquote")}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            ❝ Quote
          </Btn>

          {/* Code Block - FIXED */}
          <Btn
            active={editor.isActive("codeBlock")}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          >
            {"</>"} Code
          </Btn>

          {/* Inline Code */}
          <Btn
            active={editor.isActive("code")}
            onClick={() => editor.chain().focus().toggleCode().run()}
          >
            `code`
          </Btn>

          {/* Link */}
          <Btn
            active={editor.isActive("link")}
            onClick={() => {
              const url = prompt("Enter URL:");
              if (url) {
                editor.chain().focus().setLink({ href: url }).run();
              }
            }}
          >
            🔗 Link
          </Btn>

          {/* Horizontal Rule */}
          <Btn onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            ― Rule
          </Btn>
        </div>

        {/* CONTENT */}
        <div className="p-8 min-h-[500px]">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default Editor;