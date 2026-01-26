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
      try{
        const res = await API.get(`/project/${id}`);
        setProject(res.data);
      }catch(error){
        console.error("Error fetching project:", error);
      }
    };
    fetchProject();
  }, [id]);

  if (!project) return <p className="text-center py-20">Loading...</p>;

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
      <Link to="/projects" className="text-blue-600 hover:underline mb-5 inline-block">
        &larr; Back to Projects
      </Link>

      <h1 className="text-4xl font-bold mb-6">{project.title}</h1>

      <h6 className="text-blue mb-10">{project.techStack}</h6>

      <div className="prose max-w-none">
          <p>
            {renderContent(project.content)}
          </p>
      </div>
    </div>
  );
};

export default ProjectContent