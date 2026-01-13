const EditorCodeBlock = ({ node, updateAttributes }) => {
  return (
    <div className="my-6 border border-slate-700 rounded-lg bg-slate-900 overflow-hidden">
      
      {/* HEADER */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-800 text-xs text-gray-300">
        <span className="uppercase tracking-wide">
          {node.attrs.lang}
        </span>
      </div>

      {/* EDITABLE CODE */}
      <textarea
        value={node.attrs.code}
        onChange={(e) =>
          updateAttributes({ code: e.target.value })
        }
        placeholder="Write your code here..."
        className="w-full bg-transparent p-3 text-sm font-mono text-white outline-none resize-none min-h-[140px]"
      />
    </div>
  );
};

export default EditorCodeBlock;
