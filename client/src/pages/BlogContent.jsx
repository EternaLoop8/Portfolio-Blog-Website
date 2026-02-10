import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import parse from "html-react-parser";
import API from "../api";
import CodeBlock from "./admin/editor/CodeBlock";

const BlogContent = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blog/${id}`);
        setBlog(res.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog)
    return (
      <p className="bg-slate-950 text-slate-400 text-center min-h-screen flex items-center justify-center text-lg font-medium tracking-wide">
        Loading...
      </p>
    );

  const renderContent = (html) =>
    parse(html, {
      replace(domNode) {
        /* TipTap custom code-block */
        if (domNode.name === "code-block") {
          return (
            <CodeBlock
              code={domNode.attribs.code || ""}
              lang={domNode.attribs.lang || "cpp"}
            />
          );
        }

        /* <pre><code> fallback */
        if (domNode.name === "pre" && domNode.children?.[0]?.name === "code") {
          const code = domNode.children[0].children[0]?.data || "";
          const lang =
            domNode.children[0].attribs?.class?.replace("language-", "") ||
            "cpp";

          return <CodeBlock code={code} lang={lang} />;
        }
      },
    });

  return (
    /* Wrapper to ensure full-page dark background */
    <div className="bg-[#0f0f0f] min-h-screen w-full py-12 px-6">
      <div className="bg-[#1a1a1a] max-w-4xl mx-auto p-8 md:p-12 rounded-2xl border border-zinc-800 shadow-2xl">
        <Link
          to="/blog"
          className="text-zinc-500 hover:text-blue-400 transition-colors text-sm font-medium mb-10 inline-block"
        >
          ← Back to Posts
        </Link>

        <h1 className="text-zinc-100 text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
          {blog.title}
        </h1>

        <p className="text-zinc-500 text-lg mb-12 border-b border-zinc-800 pb-8 italic">
          {blog.subtitle}
        </p>

        <div
          className="text-zinc-300 prose prose-invert prose-zinc max-w-none 
        prose-headings:text-zinc-100 
        prose-p:leading-relaxed 
        prose-a:text-blue-400 hover:prose-a:text-blue-300
        prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-zinc-800"
        >
          {renderContent(blog.content)}
        </div>
      </div>
    </div>
  );
};

export default BlogContent;
