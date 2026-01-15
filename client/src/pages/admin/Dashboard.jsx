import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  /* ---------------- FETCH BLOGS ---------------- */
  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/blog");
      setBlogs(res.data.data || []);
    } catch (err) {
      console.error("FETCH BLOGS ERROR:", err);
      setError("Failed to fetch blogs");
    }
  };

  /* ---------------- FETCH PROJECTS ---------------- */
  const fetchProjects = async () => {
    try {
      const res = await axios.get("/project");
      setProjects(res.data.data || []);
    } catch (err) {
      console.error("FETCH PROJECTS ERROR:", err);
      setError("Failed to fetch projects");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchBlogs(), fetchProjects()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  /* ---------------- DELETE BLOG ---------------- */
  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Delete this blog? This action cannot be undone.")) return;
    try {
      await axios.delete(`/blog/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      alert("✅ Blog deleted successfully");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete blog");
    }
  };

  /* ---------------- DELETE PROJECT ---------------- */
  const handleDeleteProject = async (id) => {
    if (!window.confirm("Delete this project? This action cannot be undone.")) return;
    try {
      await axios.delete(`/project/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      alert("✅ Project deleted successfully");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete project");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-slate-400">Manage your blogs and projects</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
            ⚠️ {error}
          </div>
        )}

        {/* ================= BLOGS ================= */}
        <section className="mb-14">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Blogs</h2>
              <p className="text-sm text-slate-500">{blogs.length} total</p>
            </div>
            <button
              onClick={() => navigate("/admin/blog/new")}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg shadow-orange-500/30"
            >
              + New Blog
            </button>
          </div>

          {blogs.length === 0 && (
            <div className="text-center py-16 bg-slate-900/30 rounded-xl border border-slate-800">
              <p className="text-slate-400 mb-4">No blogs yet</p>
              <button
                onClick={() => navigate("/admin/blog/new")}
                className="text-orange-400 hover:text-orange-300 underline"
              >
                Create your first blog
              </button>
            </div>
          )}

          <div className="grid gap-4">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{blog.title}</h3>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        blog.status === "published"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {blog.status || "draft"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">
                    Created: {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/admin/edit/blog/${blog._id}`)}
                    className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-500 transition-colors font-medium"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBlog(blog._id)}
                    className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-500 transition-colors font-medium"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= PROJECTS ================= */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Projects</h2>
              <p className="text-sm text-slate-500">{projects.length} total</p>
            </div>
            <button
              onClick={() => navigate("/admin/project/new")}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg shadow-green-500/30"
            >
              + New Project
            </button>
          </div>

          {projects.length === 0 && (
            <div className="text-center py-16 bg-slate-900/30 rounded-xl border border-slate-800">
              <p className="text-slate-400 mb-4">No projects yet</p>
              <button
                onClick={() => navigate("/admin/project/new")}
                className="text-green-400 hover:text-green-300 underline"
              >
                Create your first project
              </button>
            </div>
          )}

          <div className="grid gap-4">
            {projects.map((project) => (
              <div
                key={project._id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        project.status === "published"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {project.status || "draft"}
                    </span>
                  </div>
                  {project.content && (
                    <p className="text-sm text-slate-400 line-clamp-2">
                      {project.content.replace(/<[^>]*>/g, "").slice(0, 100)}...
                    </p>
                  )}
                  <p className="text-xs text-slate-500 mt-2">
                    Created: {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/admin/project/${project._id}`)}
                    className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-500 transition-colors font-medium"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project._id)}
                    className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-500 transition-colors font-medium"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}