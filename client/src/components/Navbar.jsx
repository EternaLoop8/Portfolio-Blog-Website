import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const itemStyle = (path) => `
    relative cursor-pointer transition-all duration-200
    font-medium hover:text-orange-400 hover:underline
    px-1 sm:px-2 py-1
    ${isActive(path) ? "text-orange-400" : "text-white"}
  `;

  return (
    <div className="fixed top-4 inset-x-0 z-50 px-2">
      <div className="mx-auto w-fit max-w-full">
        <nav className="bg-slate-900/95 backdrop-blur-md rounded-full border border-white/10 shadow-2xl overflow-visible">
          <ul
            className="
              flex items-center
              gap-1 sm:gap-4
              px-3 sm:px-6
              py-2 sm:py-3
              text-sm sm:text-base
              flex-nowrap
            "
          >
            <li className={itemStyle("/")} onClick={() => navigate("/")}>
              Home
            </li>

            <li className={itemStyle("/blog")} onClick={() => navigate("/blog")}>
              Blogs
            </li>

            <li
              className={itemStyle("/projects")}
              onClick={() => navigate("/projects")}
            >
              Projects
            </li>

            <li
              className={itemStyle("/portfolio")}
              onClick={() => navigate("/portfolio")}
            >
              Portfolio
            </li>

            {/* CONTACT */}
            <li
              className={`${itemStyle("/contact")} relative`}
              onMouseEnter={() => window.innerWidth >= 640 && setIsOpen(true)}
              onMouseLeave={() => window.innerWidth >= 640 && setIsOpen(false)}
              onClick={() =>
                window.innerWidth < 640 && setIsOpen((prev) => !prev)
              }
            >
              Contact

              {isOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                  <div className="bg-slate-900 border border-white/10 rounded-xl shadow-2xl min-w-[180px]">
                    {/* GitHub */}
                    <a
                      href="https://github.com/EternaLoop8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition"
                    >
                      <span className="text-sm text-slate-300 group-hover:text-sky-400 transition">
                        GitHub
                      </span>
                    </a>

                    {/* LinkedIn */}
                    <a
                      href="https://www.linkedin.com/in/eternaloop/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition"
                    >
                      <span className="text-sm text-slate-300 group-hover:text-sky-400 transition">
                        LinkedIn
                      </span>
                    </a>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
