import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Login from "./Login";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react"; // Import icons

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State for Hamburger

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
            {/* HAMBURGER ICON - Visible only on mobile */}
            <li
              className="sm:hidden text-white cursor-pointer p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </li>

            <li className={itemStyle("/")} onClick={() => navigate("/")}>
              Home
            </li>

            <li
              className={itemStyle("/blog")}
              onClick={() => navigate("/blog")}
            >
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
                  <div
                    className="
                      bg-slate-900
                      border border-white/10
                      shadow-2xl
                      rounded-md sm:rounded-xl
                      min-w-30
                      sm:min-w-45 "
                  >
                    {/* GitHub */}
                    <a
                      href="https://github.com/EternaLoop8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-slate-400 group-hover:text-sky-400 transition"
                      >
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-slate-400 group-hover:text-sky-400 transition"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                      <span className="text-sm text-slate-300 group-hover:text-sky-400 transition">
                        LinkedIn
                      </span>
                    </a>
                  </div>
                </div>
              )}
            </li>
          </ul>
          {/* MOBILE DRAWER (The Toggle & Login inside Hamburger) */}
          {mobileMenuOpen && (
            <div className="absolute top-full left-0 mt--0.5 w-48 bg-slate-900 border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col gap-4 items-center sm:hidden animate-in fade-in zoom-in duration-200">
              <div className="grid gap-4 w-full">
                {" "}
                {/* Changed grid to full width with gap */}
                <span className="flex items-center justify-between w-full text-sm">
                  Change theme
                  <ThemeToggle />
                </span>
                <span className="flex items-center justify-between w-full text-sm">
                  Login
                  <Login />
                </span>
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
