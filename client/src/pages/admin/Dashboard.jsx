import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api.js";

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  /* ---------------- FETCH DATA ---------------- */
  const fetchData = async () => {
    try {
      setLoading(true);
      const [blogRes, projectRes] = await Promise.all([
        API.get("/blog"),
        API.get("/project")
      ]);
      setBlogs(blogRes.data.data || []);
      setProjects(projectRes.data.data || []);
    } catch (err) {
      console.error("FETCH ERROR:", err);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ---------------- NAVIGATION HELPERS ---------------- */
  const handleOpen = (type, id) => {
    // Navigates to the public view
    navigate(`/${type}/${id}`);
  };

  const handleEdit = (e, type, id) => {
    e.stopPropagation(); // Prevents triggering the parent div's onClick
    navigate(`/admin/edit/${type}/${id}`);
  };

  /* ---------------- DELETE HANDLERS ---------------- */
  const handleDelete = async (e, type, id) => {
    e.stopPropagation(); // Prevents triggering the parent div's onClick
    if (!window.confirm(`Delete this ${type}? This action cannot be undone.`)) return;
    try {
      await API.delete(`/${type}/${id}`);
      if (type === "blog") setBlogs(prev => prev.filter(b => b._id !== id));
      else setProjects(prev => prev.filter(p => p._id !== id));
      alert(`✅ ${type} deleted successfully`);
    } catch (err) {
      alert(`❌ Failed to delete ${type}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-slate-400">Manage your blogs and projects</p>
        </header>

        {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">{error}</div>}

        {/* ================= BLOGS SECTION ================= */}
        <section className="mb-14">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Blogs <span className="text-sm font-normal text-slate-500">({blogs.length})</span></h2>
            <button onClick={() => navigate("/admin/blog/new")} className="bg-orange-600 hover:bg-orange-500 px-6 py-2 rounded-lg font-semibold transition-all shadow-lg shadow-orange-500/20">+ New Blog</button>
          </div>

          <div className="grid gap-4">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                onClick={() => handleOpen("blog", blog._id)}
                className="group flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-800/40 p-6 rounded-xl border border-slate-700/50 hover:border-blue-500/50 hover:bg-slate-800/60 transition-all cursor-pointer"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold group-hover:text-blue-400 transition-colors">{blog.title}</h3>
                    <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded ${blog.status === "published" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                      {blog.status || "draft"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">Click to view post • {new Date(blog.createdAt).toLocaleDateString()}</p>
                </div>

                <div className="flex gap-3">
                  <button onClick={(e) => handleEdit(e, "blog", blog._id)} className="p-2 px-4 bg-slate-700 hover:bg-blue-600 rounded-md transition-colors text-sm font-medium">✏️ Edit</button>
                  <button onClick={(e) => handleDelete(e, "blog", blog._id)} className="p-2 px-4 bg-slate-700 hover:bg-red-600 rounded-md transition-colors text-sm font-medium">🗑️ Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= PROJECTS SECTION ================= */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Projects <span className="text-sm font-normal text-slate-500">({projects.length})</span></h2>
            <button onClick={() => navigate("/admin/project/new")} className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded-lg font-semibold transition-all shadow-lg shadow-green-500/20">+ New Project</button>
          </div>

          <div className="grid gap-4">
            {projects.map((project) => (
              <div
                key={project._id}
                onClick={() => handleOpen("project", project._id)}
                className="group flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-800/40 p-6 rounded-xl border border-slate-700/50 hover:border-green-500/50 hover:bg-slate-800/60 transition-all cursor-pointer"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold group-hover:text-green-400 transition-colors">{project.title}</h3>
                    <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded ${project.status === "published" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                      {project.status || "draft"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">Click to view project • {new Date(project.createdAt).toLocaleDateString()}</p>
                </div>

                <div className="flex gap-3">
                  <button onClick={(e) => handleEdit(e, "project", project._id)} className="p-2 px-4 bg-slate-700 hover:bg-blue-600 rounded-md transition-colors text-sm font-medium">✏️ Edit</button>
                  <button onClick={(e) => handleDelete(e, "project", project._id)} className="p-2 px-4 bg-slate-700 hover:bg-red-600 rounded-md transition-colors text-sm font-medium">🗑️ Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
