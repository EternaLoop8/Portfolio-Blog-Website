import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);

  const BLOGS_PER_PAGE = 10;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get("/blog");
        setBlogs(res.data.data); // { count, data }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const totalPages = Math.ceil(blogs.length / BLOGS_PER_PAGE);
  const startIndex = (page - 1) * BLOGS_PER_PAGE;
  const paginatedBlogs = blogs.slice(startIndex, startIndex + BLOGS_PER_PAGE);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 bg-slate-950 text-slate-100 min-h-screen">
      <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-24 tracking-tight text-white">
        Posts
      </h1>

      <ol
        className="space-y-6 list-decimal pl-8 text-slate-500 font-medium"
        start={startIndex + 1}
      >
        {paginatedBlogs.map((blog) => (
          <li key={blog._id} className="text-xl pl-2 group">
            <Link
              to={`/blogs/${blog._id}`}
              className="text-slate-200 group-hover:text-blue-400 transition-colors duration-200 decoration-slate-700 underline-offset-4 hover:underline"
            >
              {blog.title}
            </Link>
          </li>
        ))}
      </ol>

      <div className="flex justify-center items-center gap-3 py-16 px-3">
        <button
          className="border border-slate-700 px-5 py-2 rounded-md hover:bg-slate-800 transition-colors disabled:opacity-30 disabled:hover:bg-transparent text-sm font-medium text-slate-300"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <button className="border border-slate-700 bg-slate-800 px-5 py-2 rounded-md text-sm font-semibold text-white">
          {page}
        </button>

        <span className="text-slate-600 px-2 font-bold">...</span>

        <button
          className="border border-slate-700 px-5 py-2 rounded-md hover:bg-slate-800 transition-colors disabled:opacity-30 disabled:hover:bg-transparent text-sm font-medium text-slate-300"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Blogs;
