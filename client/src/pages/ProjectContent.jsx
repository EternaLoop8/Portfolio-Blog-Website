import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import parse from "html-react-parser";
import API from "../api";
import CodeBlock from "./admin/editor/CodeBlock";

const ProjectContent = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await API.get(`/project/${id}`);
        setProject(res.data);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    fetchProject();
  }, [id]);

  if (!project)
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
    /* This outer div ensures the entire page background is black */
    /* Main wrapper: Deepest background */
    <div className="bg-[#0f0f0f] min-h-screen w-full py-12 px-6">
      /* Content Card: Slightly lighter background with a subtle border for
      depth */
      <div className="bg-[#1a1a1a] max-w-4xl mx-auto p-8 md:p-12 rounded-2xl border border-zinc-800 shadow-2xl">
        {/* Muted link with hover transition */}
        <Link
          to="/projects"
          className="text-zinc-500 hover:text-blue-400 transition-colors text-sm font-medium mb-10 inline-block"
        >
          &larr; Back to Projects
        </Link>

        {/* Modern tight tracking for headings */}
        <h1 className="text-zinc-100 text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          {project.title}
        </h1>

        {/* Tech stack as a subtle secondary element */}
        <h6 className="text-blue-400/80 text-sm font-mono tracking-wider uppercase mb-12 border-b border-zinc-800 pb-8">
          {project.techStack}
        </h6>

        {/* Refined prose: Zinc-300 is softer on eyes than pure white */}
        <div
          className="text-zinc-300 prose prose-invert prose-zinc max-w-none 
        prose-headings:text-zinc-100 
        prose-p:leading-relaxed 
        prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-zinc-800"
        >
          {renderContent(project.content)}
        </div>
      </div>
    </div>
  );
};

export default ProjectContent;
