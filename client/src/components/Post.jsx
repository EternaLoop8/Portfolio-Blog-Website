import React from "react";
import { htmlToText } from "../pages/admin/editor/utils.js"; // adjust path

const Post = ({ post }) => {
  if (!post) return null;

  return (
    <div className="max-w-4xl mx-auto my-6 p-6 bg-slate-900 rounded-lg shadow-lg text-white">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      {post.subtitle && <h3 className="text-xl text-slate-400 mb-4">{post.subtitle}</h3>}

      {!post.isBlog && post.techStack && (
        <div className="mb-4 text-sm text-blue-400">
          Tech Stack: {post.techStack.join(", ")}
        </div>
      )}

      <div className="whitespace-pre-line text-slate-300">
        {htmlToText(post.content)}
      </div>
    </div>
  );
};

export default Post;
