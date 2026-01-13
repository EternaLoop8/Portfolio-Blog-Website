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
    <div className="max-w-5xl mx-auto px-6 py-5">
      <h1 className="text-5xl md:text-6xl font-bold text-center mb-24">
        Posts
      </h1>

      <ol className="space-y-4 list-decimal pl-6">
        {paginatedBlogs.map((blog) => (
          <li key={blog._id} className="text-xl">
            {/* ✅ Wrap title in Link */}
            <Link
              to={`/blogs/${blog._id}`}
              className="text-blue-600 hover:underline"
            >
              {blog.title}
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
  );
};

export default Blogs;
