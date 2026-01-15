import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";
import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { Copy, Check } from "lucide-react";

/* ---------------------------------- */
/* EDITOR CODE BLOCK COMPONENT */
/* ---------------------------------- */
const EditorCodeBlock = ({ node, updateAttributes, deleteNode }) => {
  const [html, setHtml] = useState("");
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState(node.attrs.lang || "javascript");

  useEffect(() => {
    const code = node.attrs.code || "// Enter your code here...";
    codeToHtml(code, {
      lang: lang,
      theme: "github-dark",
    })
      .then(setHtml)
      .catch((err) => {
        console.error("Shiki error:", err);
        setHtml(`<pre><code>${code}</code></pre>`);
      });
  }, [node.attrs.code, lang]);

  const copyCode = async () => {
    await navigator.clipboard.writeText(node.attrs.code || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <NodeViewWrapper className="my-4">
      <div className="border border-slate-700 rounded-lg overflow-hidden bg-slate-900">
        {/* Language Selector & Controls */}
        <div className="flex justify-between items-center px-4 py-2 bg-slate-800 border-b border-slate-700">
          <select
            value={lang}
            onChange={(e) => {
              const newLang = e.target.value;
              setLang(newLang);
              updateAttributes({ lang: newLang });
            }}
            className="bg-slate-700 text-white text-xs px-2 py-1 rounded outline-none cursor-pointer"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="json">JSON</option>
            <option value="jsx">JSX</option>
            <option value="tsx">TSX</option>
            <option value="bash">Bash</option>
            <option value="sql">SQL</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
            <option value="php">PHP</option>
            <option value="ruby">Ruby</option>
          </select>

          <div className="flex gap-2">
            <button
              onClick={copyCode}
              className="flex items-center gap-1 text-xs text-slate-300 hover:text-white transition-colors"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              onClick={deleteNode}
              className="text-xs text-red-400 hover:text-red-300 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Code Input */}
        <textarea
          value={node.attrs.code}
          onChange={(e) => updateAttributes({ code: e.target.value })}
          placeholder="Enter your code here..."
          className="w-full p-4 bg-slate-900 text-white font-mono text-sm outline-none resize-none min-h-[120px]"
          spellCheck="false"
        />

        {/* Rendered Preview */}
        {node.attrs.code && (
          <div className="border-t border-slate-700">
            <div className="px-4 py-2 bg-slate-800/50 text-xs text-slate-400">
              Preview:
            </div>
            <div
              className="text-sm overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
};

/* ---------------------------------- */
/* CUSTOM CODE BLOCK NODE */
/* ---------------------------------- */
const CustomCodeBlock = Node.create({
  name: "codeBlock",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      code: {
        default: "",
      },
      lang: {
        default: "javascript",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "code-block",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["code-block", mergeAttributes(HTMLAttributes)];
  },

  addCommands() {
    return {
      toggleCodeBlock:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              code: "// Start coding...",
              lang: "javascript",
            },
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(EditorCodeBlock);
  },
});

export default CustomCodeBlock;