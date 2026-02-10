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
    <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950 shadow-xl my-6">
      {/* Header: Zinc-900 with a subtle bottom border */}
      <div className="flex justify-between items-center px-4 py-2 bg-zinc-900/50 border-b border-zinc-800 text-xs font-medium text-zinc-400">
        <span className="uppercase tracking-wider">{lang}</span>
        <button
          onClick={copyCode}
          className="flex items-center gap-1.5 cursor-pointer hover:text-zinc-100 transition-colors"
        >
          {copied ? (
            <Check size={14} className="text-green-500" />
          ) : (
            <Copy size={14} />
          )}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      {/* Code Area: w-fit ensures the background follows the code width on scroll */}
      <div className="overflow-x-auto">
        <div
          className="text-sm p-5 font-mono leading-relaxed w-fit min-w-full"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
};

export default CodeBlock;
