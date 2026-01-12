import React, { useEffect, useState } from "react";
import API from "../api"; // <-- adjust path if needed

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get("/get-all-blogs");
        setBlogs(res.data.data); // { count, data }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-5">
      <h1 className="text-5xl md:text-6xl font-bold text-center mb-24">
        Posts
      </h1>

      <ol className="space-y-4 list-decimal pl-6">
        {blogs.map((blog) => (
          <li key={blog._id} className="text-xl">
            {blog.title}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Blogs;
