import React from 'react';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Portfolio from './pages/Portfolio.jsx';
import Contact from './pages/Contact.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsConditions from './pages/TermsConditions.jsx';
import Blogs from './pages/Blogs.jsx';
import BlogContent from './pages/BlogContent.jsx';
import Projects from './pages/Projects.jsx';
import ProjectContent from './pages/ProjectContent.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import Editor from './pages/admin/editor/Editor.jsx';
import BlogEdit from './pages/admin/BlogEdit.jsx';
import ProjectEdit from './pages/admin/ProjectEdit.jsx';


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsConditions />} />

      <Route path="/blog" element={<Blogs />} />
      <Route path="/blogs/:id" element={<BlogContent />} />

      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id" element={<ProjectContent />} />
      
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/blog/new" element={<Editor />} />
      <Route path="/admin/project/new" element={<Editor />} />
      <Route path="/admin/edit/blog/:id" element={<BlogEdit />} />
      <Route path="/admin/project/:id" element={<ProjectEdit />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App