import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api";

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

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Link to="/projects" className="text-blue-600 hover:underline mb-5 inline-block">
        &larr; Back to Projects
      </Link>

      <h1 className="text-4xl font-bold mb-6">{project.title}</h1>

      <h6 className="text-blue mb-10">{project.techStack}</h6>

      <div className="prose max-w-none">
          <p>
            {project.description}
          </p>
      </div>
    </div>
  );
};

export default ProjectContent