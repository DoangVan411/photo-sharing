import React from "react";
import { Link, Navigate } from "react-router-dom";

export default function PrivateRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login-register" replace />;
  }
  return children;
}
