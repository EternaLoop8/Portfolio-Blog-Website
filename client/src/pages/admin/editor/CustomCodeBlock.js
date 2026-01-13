import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import EditorCodeBlock from "./EditorCodeBlock";

const CustomCodeBlock = Node.create({
  name: "codeBlock",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      code: {
        default: "",
      },
      lang: {
        default: "cpp",
      },
    };
  },

  parseHTML() {
    return [{ tag: "code-block" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["code-block", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(EditorCodeBlock);
  },
});

export default CustomCodeBlock;
