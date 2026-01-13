import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api";

const BlogContent = () => {
  const { id } = useParams(); // get blog id from URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blog/${id}`); // API should support fetching single blog by id
        setBlog(res.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Link to="/blogs" className="text-blue-600 hover:underline mb-5 inline-block">
        &larr; Back to Posts
      </Link>

      <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
      <p className="text-gray-600 mb-10">By {blog.author || "Admin"}</p>

      <div className="prose max-w-none">
        <p>{blog.description}</p>
      </div>
    </div>
  );
};

export default BlogContent;
