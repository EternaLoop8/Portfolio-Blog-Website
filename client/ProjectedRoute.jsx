import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    // Not logged in → redirect to home or login
    return <Navigate to="/" replace />;
  }

  if (role !== "admin") {
    // Logged in but not admin → redirect to home
    return <Navigate to="/" replace />;
  }

  // Logged in as admin → allow access
  return children;
};

export default ProtectedRoute;
