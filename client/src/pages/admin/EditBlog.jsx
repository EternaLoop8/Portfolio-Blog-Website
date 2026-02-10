import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import CustomCodeBlock from "./editor/CustomCodeBlock.js" // your custom block
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api.js";

export default function EditBlog() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState(""); // HTML content
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Initialize TipTap editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      FontFamily,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-blue-400 underline hover:text-blue-300" },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      CustomCodeBlock,
    ],
    content: "",
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose prose-invert prose-lg max-w-none focus:outline-none min-h-[400px] p-8",
      },
    },
  });

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blog/${id}`);
        setTitle(res.data.title || "");
        setSubtitle(res.data.subtitle || "");
        setContent(res.data.content || "");
        if (editor) editor.commands.setContent(res.data.content || "");
      } catch (err) {
        console.error(err);
        setError("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, editor]);

  const saveContent = async (status) => {
    if (!title.trim()) return setError("Title is required");
    if (editor.getText().trim().length === 0) return setError("Content is required");

    setLoading(true);
    setError("");

    const payload = {
      title: title.trim(),
      subtitle: subtitle.trim(),
      content,
    };

    try {
      await API.put(`/blog/${id}`, payload);
      if (status === "published") {
        await API.patch(`/blog/${id}/publish`);
        alert("🚀 Blog Published");
        navigate("/admin/dashboard");
      } else {
        alert("✅ Draft saved");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center py-10">Loading blog...</p>;
  if (!editor) return null;

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
        {/* Top Bar */}
        <div className="flex justify-between items-center px-6 py-4 bg-slate-800 border-b border-slate-700">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            ← Back
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => saveContent("draft")}
              disabled={loading}
              className="px-4 py-2 bg-slate-700 rounded-lg text-white hover:bg-slate-600 disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              onClick={() => saveContent("published")}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-500 disabled:opacity-50 font-bold"
            >
              Publish Blog
            </button>
          </div>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-md">
            ⚠️ {error}
          </div>
        )}

        {/* Inputs */}
        <div className="p-8 pb-0 space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title..."
            className="w-full text-4xl font-bold bg-transparent outline-none text-white placeholder:text-slate-700"
          />
          <input
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Add a short subtitle..."
            className="w-full text-xl font-medium text-slate-400 bg-transparent outline-none placeholder:text-slate-800"
          />
        </div>

        {/* Editor */}
        <div className="bg-slate-900 min-h-125">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
