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

  if (!blog) return <p className="text-center py-20">Loading...</p>;

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
        if (
          domNode.name === "pre" &&
          domNode.children?.[0]?.name === "code"
        ) {
          const code = domNode.children[0].children[0]?.data || "";
          const lang =
            domNode.children[0].attribs?.class
              ?.replace("language-", "") || "cpp";

          return <CodeBlock code={code} lang={lang} />;
        }
      },
    });

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Link to="/blog" className="text-blue-600 hover:underline mb-5 inline-block">
        ← Back to Posts
      </Link>

      <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
      <p className="text-gray-600 mb-10">{blog.subtitle}</p>

      <div className="space-y-6">
        {renderContent(blog.content)}
      </div>
    </div>
  );
};

export default BlogContent;
