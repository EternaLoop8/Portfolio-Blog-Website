import { useEffect, useState } from "react";
import { getShikiHighlighter } from "./Highlighter";
import { Copy, Check } from "lucide-react";

const CodeBlock = ({ code = "", lang = "cpp" }) => {
  const [html, setHtml] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let mounted = true;

    getShikiHighlighter().then((highlighter) => {
      if (!mounted) return;

      const result = highlighter.codeToHtml(code, {
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
    <div className="border border-slate-700 rounded-lg overflow-hidden bg-slate-900">
      <div className="flex justify-between px-3 py-2 bg-slate-800 text-xs text-gray-300">
        <span>{lang}</span>
        <button onClick={copyCode} className="flex gap-1">
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <div
        className="text-sm overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default CodeBlock;
