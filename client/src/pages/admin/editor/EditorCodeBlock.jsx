import { NodeViewWrapper } from "@tiptap/react";
import { useEffect, useState } from "react";
import { getShikiHighlighter } from "./Highlighter";
import { Copy, Check, Trash } from "lucide-react";

const EditorCodeBlock = ({ node, updateAttributes, deleteNode }) => {
  const [html, setHtml] = useState("");
  const [copied, setCopied] = useState(false);

  const code = node.attrs.code || "";
  const lang = node.attrs.lang || "cpp";

  useEffect(() => {
    let mounted = true;

    getShikiHighlighter().then((highlighter) => {
      if (!mounted) return;

      const result = highlighter.codeToHtml(code || "// write code", {
        lang,
        theme: "github-dark",
      });

      setHtml(result);
    });

    return () => {
      mounted = false;
    };
  }, [code, lang]);

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <NodeViewWrapper className="my-4">
      <div className="border border-slate-700 rounded-lg bg-slate-900 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-3 py-2 bg-slate-800 border-b border-slate-700">
          <select
            value={lang}
            onChange={(e) => updateAttributes({ lang: e.target.value })}
            className="bg-slate-700 text-xs text-white px-2 py-1 rounded"
          >
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
          </select>

          <div className="flex gap-2">
            <button onClick={copyCode} className="text-xs text-gray-300">
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
            <button onClick={deleteNode} className="text-red-400">
              <Trash size={14} />
            </button>
          </div>
        </div>

        {/* Editor */}
        <textarea
          value={code}
          onChange={(e) => updateAttributes({ code: e.target.value })}
          className="w-full min-h-[120px] p-3 bg-slate-900 text-white font-mono text-sm outline-none"
          spellCheck={false}
        />

        {/* Preview */}
        {code && (
          <div
            className="border-t border-slate-700 text-sm overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </div>
    </NodeViewWrapper>
  );
};

export default EditorCodeBlock;
