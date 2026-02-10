import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);

  const PROJECTS_PER_PAGE = 10;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get("/project");
        setProjects(res.data.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const startIndex = (page - 1) * PROJECTS_PER_PAGE;
  const paginatedProjects = projects.slice(
    startIndex,
    startIndex + PROJECTS_PER_PAGE,
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 bg-slate-950 text-slate-100 min-h-screen">
      <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-24 tracking-tight text-white">
        Projects
      </h1>

      <ol
        className="space-y-6 list-decimal pl-8 text-slate-400"
        start={startIndex + 1}
      >
        {paginatedProjects.map((project) => (
          <li key={project._id} className="text-xl pl-2 group">
            <Link to={`/projects/${project._id}`} className="block">
              <div className="leading-tight">
                <span className="text-slate-100 group-hover:text-blue-400 transition-colors duration-200 font-medium">
                  {project.title}
                </span>
                <br />
                <span className="text-slate-500 font-normal text-sm mt-1 block">
                  {project.techStack}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ol>

      <div className="flex justify-center items-center gap-3 py-16 px-3">
        <button
          className="border border-slate-700 px-5 py-2 rounded-md hover:bg-slate-800 transition-colors disabled:opacity-30 disabled:hover:bg-transparent text-sm font-medium"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <button className="border border-slate-700 bg-slate-800 px-5 py-2 rounded-md text-sm font-semibold text-white">
          {page}
        </button>

        <span className="text-slate-600 px-2">...</span>

        <button
          className="border border-slate-700 px-5 py-2 rounded-md hover:bg-slate-800 transition-colors disabled:opacity-30 disabled:hover:bg-transparent text-sm font-medium"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Projects;
