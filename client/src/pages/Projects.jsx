import React,{useEffect, useState}from 'react';
import { Link } from "react-router-dom";
import API from "../api";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);

  const PROJECTS_PER_PAGE = 10;

  useEffect(() => {
    const fetchProjects = async () => {
      try{
        const res = await API.get("/project");
        setProjects(res.data.data);
      }catch (error){
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const startIndex = (page - 1) * PROJECTS_PER_PAGE;
  const paginatedProjects = projects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

  return (
    <div className="max-w-5xl mx-auto px-6 py-5">
      <h1 className="text-5xl md:text-6xl font-bold text-center mb-24">
        Projects
      </h1>

      <ol 
        className="space-y-4 list-decimal pl-6"
        start = {startIndex + 1}
      >
        {paginatedProjects.map((project) => (
          <li key={project._id} className="text-xl">
            <Link
              to = {`/projects/${project._id}`}
              className='text-blue-900'
            >
              <p className='leading-tight'>
               <span className='hover:underline'>{project.title}</span> 
                <br />
                <span 
                  className='text-gray-600 font-light text-sm'>
                    {project.techStack}
                </span> 
              </p>
            </Link>
          </li>
          
        ))}
      </ol>

      <div className="flex justify-center gap-4 py-10 px-3">
        <button
          className="border px-4 py-1 disabled:opacity-40"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <button className="border px-4 py-1">{page}</button>

        <button className="border px-4 py-1">...</button>

        <button
          className="border px-4 py-1 disabled:opacity-40"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Projects