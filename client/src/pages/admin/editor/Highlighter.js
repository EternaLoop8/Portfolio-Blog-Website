import { createHighlighter } from "shiki";

let highlighterPromise = null;

export function getShikiHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-dark"],
      langs: [
        "javascript",
        "typescript",
        "cpp",
        "c",
        "java",
        "python",
        "html",
        "css",
        "json",
        "bash",
      ],
    });
  }

  return highlighterPromise;
}
