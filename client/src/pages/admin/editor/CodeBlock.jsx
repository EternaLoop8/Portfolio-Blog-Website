import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { Copy, Check } from "lucide-react";

const CodeBlock = ({ code, lang = "cpp" }) => {
  const [html, setHtml] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;

    codeToHtml(code, {
      lang,
      theme: "github-dark",
    }).then((result) => {
      if (!cancelled) setHtml(result);
    });

    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="my-6 max-w-full">

      <div className="relative inline-block min-w-0 max-w-full rounded-lg border border-slate-700 bg-slate-900">

        {/* HEADER */}
        <div className="flex items-center justify-between px-3 py-2 bg-slate-800 text-xs text-gray-300">
          <span className="uppercase tracking-wide">{lang}</span>

          <button
            onClick={copyCode}
            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-700 transition"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        {/* CODE */}
        <div
          className="text-sm overflow-x-auto whitespace-pre max-w-full"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
};

export default CodeBlock;
