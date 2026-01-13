import React, { useState } from "react";
import { User, X, Mail, LogOut, LayoutDashboard } from "lucide-react";

const Login = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  /* LOGIN */
  const login = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("email", data.user.email);

      setOpen(false);
    } catch (err) {
      alert(err.message);
    }
  };

  /* LOGOUT */
  const logout = () => {
    localStorage.clear();
    setProfileOpen(false);
  };

  return (
    <div className="relative flex justify-end top-6 right-3">
      {/* PROFILE / LOGIN BUTTON */}
      <button
        onClick={() =>
          token ? setProfileOpen(!profileOpen) : setOpen(true)
        }
        className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 transition"
      >
        <User className="text-white" size={20} />
      </button>

      {/* PROFILE DROPDOWN */}
      {profileOpen && token && (
        <div className="absolute right-0 top-12 w-56 bg-neutral-900 text-white rounded-xl shadow-lg border border-neutral-800">
          <div className="px-4 py-3 border-b border-neutral-800 text-sm">
            {localStorage.getItem("email")}
          </div>

          {role === "admin" && (
            <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-neutral-800">
              <LayoutDashboard size={16} />
              Admin Dashboard
            </button>
          )}

          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-neutral-800"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}

      {/* LOGIN MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-neutral-900 text-white w-[380px] rounded-2xl p-6 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-neutral-400 hover:text-white"
            >
              <X />
            </button>

            <h2 className="text-xl font-semibold text-center mb-5">
              Login to your account
            </h2>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-3 px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600"
            />

            <button
              onClick={login}
              className="w-full bg-white text-black py-2 rounded-lg font-medium hover:bg-gray-200"
            >
              Login
            </button>

            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-neutral-700" />
              <span className="px-2 text-neutral-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-neutral-700" />
            </div>

            <button className="w-full border border-neutral-700 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-neutral-800">
              <Mail size={18} />
              Continue with Google
            </button>

            <button className="w-full mt-2 border border-neutral-700 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-neutral-800">
              <Mail size={18} />
              Continue with Microsoft
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
