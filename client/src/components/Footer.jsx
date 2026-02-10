import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-black text-white py-10 px-6 overflow-x-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center min-w-0">
        <h2 className="text-4xl font-bold leading-tight min-w-0 break-words">
          Get our newsletter delivered
          <br />
          directly to your inbox
        </h2>

        <div className="min-w-0">
          <form className="flex flex-col sm:flex-row sm:flex-wrap gap-3 w-full min-w-0">
            <input
              type="email"
              required
              placeholder="Type your email..."
              className="w-full sm:flex-1 min-w-0 bg-transparent border border-slate-500 px-4 py-3 outline-none focus:border-white transition"
            />

            <button className="w-full sm:w-auto bg-white text-black hover:bg-slate-200 px-6 py-3 font-medium transition">
              Subscribe
            </button>
          </form>
        </div>

        <div className="flex flex-wrap gap-4 text-sm pt-10 min-w-0">
          <p>
            <span className="text-gray-500 font-light">© 2025</span> eternaloop
          </p>
          <p className="font-thin">All rights reserved</p>
          <p
            className="cursor-pointer font-thin hover:text-gray-400 hover:underline"
            onClick={() => navigate("/privacy-policy")}
          >
            Privacy Policy
          </p>
          <p
            className="cursor-pointer font-thin hover:text-gray-400 hover:underline"
            onClick={() => navigate("/terms-conditions")}
          >
            Terms & Conditions
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
