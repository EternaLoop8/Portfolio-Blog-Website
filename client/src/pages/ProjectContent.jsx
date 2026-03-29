import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import parse from "html-react-parser";
import API from "../api";
import CodeBlock from "./admin/editor/CodeBlock";

const ProjectContent = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Your backend sends the object directly: res.send(response)
        const res = await API.get(`/project/${id}`);
        setProject(res.data);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Project not found or server error.");
      }
    };
    fetchProject();
  }, [id]);

  if (error) {
    return (
      <div className="bg-[#0f0f0f] min-h-screen flex flex-col items-center justify-center text-zinc-400">
        <p className="text-xl mb-4">{error}</p>
        <Link to="/projects" className="text-blue-400 hover:underline">← Back to Projects</Link>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="bg-[#0f0f0f] min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  const renderContent = (html) =>
    parse(html || "", {
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
    <div className="bg-[#0f0f0f] min-h-screen w-full py-12 px-6">
      <div className="bg-[#1a1a1a] max-w-4xl mx-auto p-8 md:p-12 rounded-2xl border border-zinc-800 shadow-2xl">
        
        <Link
          to="/projects"
          className="text-zinc-500 hover:text-blue-400 transition-colors text-sm font-medium mb-10 inline-block"
        >
          &larr; Back to Projects
        </Link>

        <h1 className="text-zinc-100 text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          {project.title}
        </h1>

        {/* TECH STACK FIX: Converts the Array into a readable bulleted string */}
        <h6 className="text-blue-400/80 text-sm font-mono tracking-wider uppercase mb-12 border-b border-zinc-800 pb-8">
          {Array.isArray(project.techStack) 
            ? project.techStack.join(" • ") 
            : project.techStack || "No tech stack listed"}
        </h6>

        <div
          className="text-zinc-300 prose prose-invert prose-zinc max-w-none 
          prose-headings:text-zinc-100 
          prose-p:leading-relaxed 
          prose-a:text-blue-400 hover:prose-a:text-blue-300
          prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-zinc-800"
        >
          {renderContent(project.content)}
        </div>
      </div>
    </div>
  );
};

export default ProjectContent;
