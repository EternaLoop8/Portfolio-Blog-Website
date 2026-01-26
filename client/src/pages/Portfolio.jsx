import React from "react";
import DP from "../assets/Profile_pic.jpeg";
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
  const navigate = useNavigate();
  const skills = [
    "React", "JavaScript", "Node.js", "MongoDB", 
    "HTML5", "CSS3", "C", "C++"
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 md:p-20">
      <h1 className="text-4xl font-extrabold text-center mb-12 tracking-tight">
        My Portfolio
      </h1>

      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100">
        <div className="flex flex-col md:flex-row items-center md:items-start p-8 md:p-12 gap-10">
          
          <div className="w-full md:w-1/3 flex flex-col items-center shrink-0">
            <div className="relative">
              <img 
                src={DP} 
                alt="Soumya Mishra" 
                className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full md:rounded-2xl shadow-lg border-4 border-white"
              />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-slate-800 md:hidden">
              Soumya Mishra
            </h2>
          </div>

          <div className="w-full md:w-2/3 flex flex-col justify-center">
            <h2 className="hidden md:block text-3xl font-bold text-slate-800 mb-4">
              Soumya Mishra
            </h2>
            
            <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
              <p>
                Soumya Mishra is a <span className="text-indigo-600 font-medium">Computer Science student</span> who is passionate about coding, technology, and sharing the journey of learning. 
              </p>
              
              <p>
                When not coding, Soumya enjoys exploring new tools and solving logic problems. This blog is a space to grow, connect, and inspire others.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
                Tech Stack & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-4 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-full border border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-100 flex flex-wrap gap-4">
              <button 
                onClick={() => navigate("https://www.linkedin.com/in/eternaloop/")}
                className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95">
                Get In Touch
              </button>
              <button 
                className="px-8 py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all active:scale-95"
                onClick={() => navigate("/projects")}
                >
                View Projects
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Portfolio;