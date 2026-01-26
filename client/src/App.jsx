import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProtectedRoute from "../ProjectedRoute.jsx";
import Home from "./pages/Home.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Contact from "./pages/Contact.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsConditions from "./pages/TermsConditions.jsx";
import Blogs from "./pages/Blogs.jsx";
import BlogContent from "./pages/BlogContent.jsx";
import Projects from "./pages/Projects.jsx";
import ProjectContent from "./pages/ProjectContent.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Editor from "./pages/admin/editor/Editor.jsx";
import EditBlog from "./pages/admin/EditBlog.jsx";
import EditProject from "./pages/admin/EditProject.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsConditions />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogContent />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectContent />} />

        {/* Admin protected routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blog/new"
          element={
            <ProtectedRoute>
              <Editor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/project/new"
          element={
            <ProtectedRoute>
              <Editor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs/edit/:id"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/edit/:id"
          element={
            <ProtectedRoute>
              <EditProject />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
